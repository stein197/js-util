import * as string from "./string";

/**
 * Returns the highest z-index value among element's children. It also takes "position: static" into account.
 * @param window Global window object.
 * @param element Element among which children to find out a highest z-index.
 * @returns Highest z-index or -1 if there's no children with z-index.
 */
export function getHighestZIndex(window: Window, element: Element): number {
	let z = -1;
	const children = [...element.children];
	for (const child of children) {
		const childStyle = window.getComputedStyle(child);
		const childZ = !childStyle.position || childStyle.position === "static" ? getHighestZIndex(window, child) : +childStyle.zIndex;
		if (!isNaN(childZ) && childZ > z)
			z = childZ;
	}
	return z;
}

/**
 * Makes CSS selector of the specified element. Creates exact unambiguous CSS path to the element.
 * @param element Elements of which selector to create.
 * @param exclude Which attributes to exclude from attributes selector. `["class", "id", "style"]` by default.
 * @returns CSS selector to the element.
 * @example
 * ```ts
 * selector($0); // "html > body:nth-child(2) > div#element.class-name[attr=\"value\"]:nth-child(1)"
 * ```
 */
export function selector(element: Element, exclude: string[] = ["class", "id", "style"]): string {
	const result: string[] = [];
	let curElement: Element | null = element;
	while (curElement != null) {
		const typeSelector = curElement.tagName.toLowerCase();
		const idSelector = curElement.getAttribute("id") ? ("#" + curElement.getAttribute("id")) : "";
		const classSelector = curElement.classList.length ? ("." + [...curElement.classList].join(".")) : "";
		const attrSelector = curElement.getAttributeNames().filter(attr => !exclude.includes(attr)).map(attr => {
			const value = curElement!.getAttribute(attr);
			return value ? `[${attr}="${string.escape(value)}"]` : `[${attr}]`;
		}).join("");
		const nthSelector = curElement.parentElement == null ? "" : `:nth-child(${Array.from(curElement.parentElement.children).indexOf(curElement) + 1})`;
		result.unshift(typeSelector + idSelector + classSelector + attrSelector + nthSelector);
		curElement = curElement.parentElement;
	}
	return result.join(" > ");
}

/**
 * Returns input's value casted to a corresponding type. If the element is a `<select />` element and it has `multiple`
 * attribute set, then an array of selected values will be returned. If the element is an `<input />` element, then the
 * returned value will be casted as follows:
 * | `type` attribute                | Returned type     |
 * |---------------------------------|-------------------|
 * | `checkbox` `radio`              | `boolean \| null` |
 * | `color` `number` `range`        | `number`          |
 * | `date` `datetime-local` `month` | `Date \| null`    |
 * | `file`                          | `File[]`          |
 * | `image`                         | `Image \| null`   |
 * In other cases string is returned.
 * @param input Input of which value is casted.
 * @returns Casted input value.
 * @example
 * ```tsx
 * getInputValue(
 * 	<select>
 * 		<option value="a" selected>a</option>
 * 	</select>
 * ); // "a"
 * getInputValue(
 * 	<select multiple>
 * 		<option value="a" selected>a</option>
 * 		<option value="b" selected>b</option>
 * 	</select>
 * ); // ["a"]
 * getInputValue(<input type="number" value="10" />); // 10
 * getInputValue(<input type="checkbox" checked />);  // true
 * getInputValue(<textarea value="String" />);        // "String"
 * ```
 */
export function getInputValue(input: HTMLInputElement | HTMLSelectElement | HTMLButtonElement | HTMLTextAreaElement): any {
	if (is(input, "select"))
		return input.multiple ? [...input.selectedOptions].map(opt => opt.value) : input.selectedIndex < 0 ? null : input.value;
	if (is(input, "input"))
		switch (input.type) {
			case "checkbox":
			case "radio":
				return input.indeterminate ? null : input.checked;
			case "color":
				return Number.parseInt("0x" + input.value.replace(/[^\da-f]+/i, ""));
			case "date":
			case "datetime-local":
			case "month":
				return input.value ? new Date(input.value) : null;
			case "file":
				return input.multiple ? input.files ? [...input.files] : [] : input.files ? input.files[0] : null;
			case "image": {
				if (!input.value)
					return null;
				const img = new Image();
				img.src = input.value;
				return img;
			}
			case "number":
			case "range":
				return input.value ? input.valueAsNumber : NaN;
		}
	return input.value;
}

/**
 * Gets HTML table element (table, thead, tbody or tfoot) and returns an array that represents the contents of the
 * selected table row. By default it will try to cast some elements and values to corresponding types, such as casting
 * "10" to 10 and inputs according to {@link getInputValue} function. It's possible to override that behavior by
 * providing custom function that takes three arguments - row index, column index and HTMLTableCellElement itself.
 * The value function returns will be pasted in the final array.
 * @param table Table to parse.
 * @param index Row index.
 * @param handler Custom table cell handler function.
 * @returns An array that represents the selected row or `null` if there is no row with specified index.
 * @example
 * Default behavior
 * ```tsx
 * const t = (
 * 	<table>
 * 		<tbody>
 * 			<tr>
 * 				<td>String</td>
 * 				<td>10</td>
 * 				<td>
 * 					<input type="number" value="20" />
 *	 			</td>
 * 			</tr>
 * 		</tbody>
 * 	</table>
 * );
 * getTableRow(t, 0); // [["String", 10, 20]]
 * getTableRow(t, 1); // null
 * ```
 * @example
 * Overriding the handler
 * ```tsx
 * // Get previously defined t table
 * getTableRow(t, 0, (row, col, cell) => cell.textContent); // ["String", "10", ""]
 * ```
 */
export function getTableRow<T extends any[] = any[]>(table: HTMLTableElement | HTMLTableSectionElement, index: number, handler: TableCellHandler = handleTableCell): T | null {
	return getTable(table, handler)[index] as T ?? null;
}

/**
 * Gets HTML table element (table, thead, tbody or tfoot) and returns an array that represents the contents of the
 * selected table column. By default it will try to cast some elements and values to corresponding types, such as
 * casting "10" to 10 and inputs according to {@link getInputValue} function. It's possible to override that behavior by
 * providing custom function that takes three arguments - row index, column index and HTMLTableCellElement itself.
 * The value function returns will be pasted in the final array.
 * @param table Table to parse.
 * @param index Column index.
 * @param handler Custom table cell handler function.
 * @returns An array that represents the selected column or `null` if there is no column with specified index.
 * @example
 * Default behavior
 * ```tsx
 * const t = (
 * 	<table>
 * 		<tbody>
 * 			<tr>
 * 				<td>String</td>
 * 				<td>10</td>
 * 				<td>
 * 					<input type="number" value="20" />
 *	 			</td>
 * 			</tr>
 * 		</tbody>
 * 	</table>
 * );
 * getTableCol(t, 0); // ["String"]
 * getTableCol(t, 3); // null
 * ```
 * @example
 * Overriding the handler
 * ```tsx
 * // Get previously defined t table
 * getTableCol(t, 0, (row, col, cell) => cell.textContent); // ["String"]
 * ```
 */
export function getTableCol<T extends any[] = any[]>(table: HTMLTableElement | HTMLTableSectionElement, index: number, handler: TableCellHandler = handleTableCell): T | null {
	const t = getTable(table, handler);
	const result = new Array(t.length) as T;
	for (let i = 0, row = t[i]; i < t.length; i++, row = t[i])
		result[i] = row[index];
	return result.length || result.every(item => item == null) ? null : result;
}

/**
 * Gets HTML table element (table, thead, tbody or tfoot) and returns an array that represents the contents of the
 * table. By default it will try to cast some elements and values to corresponding types, such as casting "10" to 10 and
 * inputs according to {@link getInputValue} function. It's possible to override that behavior by providing custom
 * function that takes three arguments - row index, column index and HTMLTableCellElement itself. The value function
 * returns will be pasted in the final array.
 * @param table Table to parse.
 * @param handler Custom table cell handler function.
 * @returns An array that represents table.
 * @example
 * Default behavior
 * ```tsx
 * const t = (
 * 	<table>
 * 		<tbody>
 * 			<tr>
 * 				<td>String</td>
 * 				<td>10</td>
 * 				<td>
 * 					<input type="number" value="20" />
 *	 			</td>
 * 			</tr>
 * 		</tbody>
 * 	</table>
 * );
 * getTable(t); // [["String", 10, 20]]
 * ```
 * @example
 * Overriding the handler
 * ```tsx
 * // Get previously defined t table
 * getTable(t, (row, col, cell) => cell.textContent); // [["String", "10", ""]]
 * ```
 */
export function getTable(table: HTMLTableElement | HTMLTableSectionElement, handler: TableCellHandler = handleTableCell): any[][] {
	return ((is(table, "table") ? [
		...(table.tHead ? [...table.tHead.children] : []),
		...[...table.tBodies].map(tBody => [...tBody.children]).flat(Infinity),
		...(table.tFoot ? [...table.tFoot.children] : [])
	] : [...table.children]) as HTMLTableRowElement[]).map((row, rowIndex) => ([...row.children] as HTMLTableCellElement[]).map((col, colIndex) => handler(rowIndex, colIndex, col)));
}

function handleTableCell(...[, , cell]: [number, number, HTMLTableCellElement]): any {
	if (cell.childElementCount === 1 && (is(cell.firstChild, "input") || is(cell.firstChild, "select") || is(cell.firstChild, "button") || is(cell.firstChild, "textarea")))
		return getInputValue(cell.firstChild);
	const numVal = Number.parseFloat(cell.textContent!);
	return isNaN(numVal) ? cell.textContent : numVal;
}

function is<T extends keyof HTMLElementTagNameMap>(element: Node | null, tag: T): element is HTMLElementTagNameMap[T] {
	return element != null && "tagName" in element && (element.tagName as string).toLowerCase() === tag;
}

type TableCellHandler = (row: number, col: number, cell: HTMLTableCellElement) => any;
