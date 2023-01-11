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
