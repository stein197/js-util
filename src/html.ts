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
 * | `type` attribute                | Returned type     | Note                                   |
 * |---------------------------------|-------------------|----------------------------------------|
 * | `checkbox` `radio`              | `boolean \| null` | `null` when the value is indeterminate |
 * | `color` `number` `range`        | `number`          |                                        |
 * | `date` `datetime-local` `month` | `Date \| null`    | `null` when the value is incorrect     |
 * | `file`                          | `File[] | File`   | Array when it's multiple               |
 * | `image`                         | `Image \| null`   | `null` when the value is absent        |
 * | `url`                           | `URL \| null`     | `null` when the value is incorrect     |
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
			case "url":
				try {
					return new URL(input.value);
				} catch {
					return null;
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
 * providing custom function that takes two arguments - row index and HTMLTableCellElement itself.
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
 * getTableRow(t, 0, (row, cell) => cell.textContent); // ["String", "10", ""]
 * ```
 */
export function getTableRow<T extends any[] = any[]>(table: HTMLTableElement | HTMLTableSectionElement, index: number, handler?: (row: number, cell: HTMLTableCellElement) => void): T | null {
	const t = __getRawTable(table);
	return t[index] ? t[index].map((cell, colIndex) => handler ? handler(colIndex, cell) : __handleTableCell(index, colIndex, cell)) as T : null;
}

/**
 * Gets HTML table element (table, thead, tbody or tfoot) and returns an array that represents the contents of the
 * selected table column. By default it will try to cast some elements and values to corresponding types, such as
 * casting "10" to 10 and inputs according to {@link getInputValue} function. It's possible to override that behavior by
 * providing custom function that takes two arguments - column index and HTMLTableCellElement itself.
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
 * getTableCol(t, 0, (col, cell) => cell.textContent); // ["String"]
 * ```
 */
export function getTableCol<T extends any[] = any[]>(table: HTMLTableElement | HTMLTableSectionElement, index: number, handler?: (col: number, cell: HTMLTableCellElement) => void): T | null {
	const t = __getRawTable(table);
	const result: any[] = new Array(t.length);
	for (let i = 0; i < result.length; i++)
		result[i] = handler ? handler(i, t[i][index]) : __handleTableCell(i, index, t[i][index]);
	return !result.length || result.every(val => val == null) ? null : result as T;
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
 * 				</td>
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
export function getTable(table: HTMLTableElement | HTMLTableSectionElement, handler: (row: number, col: number, cell: HTMLTableCellElement) => any = __handleTableCell): any[][] {
	return __getRawTable(table).map((row, rowIndex) => row.map((cell, colIndex) => handler(rowIndex, colIndex, cell)));
}

/**
 * Checks if the element is an instance of the passed tag name.
 * @param element Element to check.
 * @param expected Tag name(-s) to check against.
 * @returns `true` if the element is an instance of the passed tag(-s).
 * @example
 * ```tsx
 * is(<div />, "div");        // true
 * is(<div />, ["div", "p"]); // true
 * is(<div />, "p");          // false
 * ```
 */
export function is<T extends keyof ElementTagNameMap>(element: Node | null, expected: T | T[]): element is ElementTagNameMap[T] {
	if (element == null || !("tagName" in element))
		return false;
	const name = (element as Element).tagName.toLowerCase();
	return Array.isArray(expected) ? expected.includes(name as T) : name === expected;
}

/**
 * Set a map of attributes to an element.
 * @param element Element to set attributes to.
 * @param attributes Attributes to be set. Attributes with null values will be deleted from the element.
 * @param prefix Optional prefix. If provided, all attribute names will be prefixed with `${prefix}-`.
 * @example
 * Set attributes without prefix
 * ```tsx
 * const elt = <div id="div" />;
 * setAttributes(div, {
 * 	div: null,
 * 	class: "div",
 * });
 * elt == <div class="div" />
 * ```
 * @example
 * Set attributes with prefix
 * ```tsx
 * const elt = <div id="div" />;
 * setAttributes(div, {
 * 	attr1: 1,
 * 	attr2: 2
 * }, "data");
 * elt == <div id="div" data-attr1="1" data-attr2="2" />
 * ```
 */
export function setAttributes(element: Element, attributes: object, prefix?: string): void {
	for (const key in attributes) {
		const name = prefix ? `${prefix}-key` : key;
		if (attributes[key] == null)
			element.removeAttribute(name);
		else
			element.setAttribute(name, attributes[key]);
	}
}

/**
 * Retrieve a map of attributes of an element.
 * @param element Element to get attributes from.
 * @returns A map of attributes.
 * @example
 * ```tsx
 * const elt = <div id="div" class="block" />;
 * getAttributes(elt) == {id: "div", class: "block"}
 * ```
 */
export function getAttributes(element: Element): object {
	const result = {};
	for (const name of element.getAttributeNames())
		result[name] = element.getAttribute(name);
	return result;
}

/**
 * Set a map of styles to an element.
 * @param element Element to set styles to.
 * @param style Styles to be set. Styles with null values will be deleted from the element.
 * @example
 * ```tsx
 * const elt = <div style="color: red" />;
 * setStyle(elt, {
 * 	color: null,
 * 	fontSize: "12px"
 * });
 * elt == <div style="font-size: 12px" />
 * ```
 */
export function setStyle(element: ElementCSSInlineStyle, style: Partial<CSSStyleDeclaration>): void {
	for (const key in style)
		element.style[key] = style[key]!;
}

function __getRawTable(table: HTMLTableElement | HTMLTableSectionElement): HTMLTableCellElement[][] {
	return ((is(table, "table") ? [
		...(table.tHead ? [...table.tHead.children] : []),
		...[...table.tBodies].map(tBody => [...tBody.children]).flat(Infinity),
		...(table.tFoot ? [...table.tFoot.children] : [])
	] : [...table.children]) as HTMLTableRowElement[]).map(row => ([...row.children] as HTMLTableCellElement[]));
}

function __handleTableCell(...[, , cell]: [number, number, HTMLTableCellElement]): any {
	if (cell.childElementCount === 1 && (is(cell.firstChild, ["input", "select", "button", "textarea"])))
		return getInputValue(cell.firstChild);
	const numVal = Number.parseFloat(cell.textContent!);
	return isNaN(numVal) ? cell.textContent : numVal;
}
