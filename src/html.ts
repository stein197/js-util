import * as string from "./string";

const DEFAULT_SELECTOR_OPTIONS: SelectorOptions = {
	exclude: ["class", "id", "style"],
	spaces: true,
	quotes: true
};

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

// TODO: tests
/**
 * Makes CSS selector of the specified element.
 * @param element Elements of which selector to create.
 * @param options Additional options.
 * @returns CSS selector to the element.
 * @example
 * ```ts
 * selector($0); // "html > body:nth-child(2) > div#element.class-name[attr=\"value\"]:nth-child(1)"
 * ```
 */
export function selector(element: Element, options: Partial<SelectorOptions> = DEFAULT_SELECTOR_OPTIONS): string {
	const opts = options === DEFAULT_SELECTOR_OPTIONS ? DEFAULT_SELECTOR_OPTIONS : {...DEFAULT_SELECTOR_OPTIONS, ...options};
	const result: string[] = [];
	let curElement = element;
	while (curElement != null) {
		const typeSelector = curElement.tagName.toLowerCase();
		const idSelector = curElement.getAttribute("id") ? ("#" + curElement.getAttribute("id")) : "";
		const classSelector = curElement.classList.length ? ("." + [...curElement.classList].join(".")) : "";
		const attrSelector = curElement.getAttributeNames().filter(attr => !opts.exclude.includes(attr)).map(attr => {
			const value = curElement.getAttribute(attr);
			const needQuotes = opts.quotes || (value && value.search(/^[a-zA-Z_][a-zA-Z0-9\-_]+$/) < 0);
			return value ? `[${attr}=${needQuotes ? "\"" + string.escape(value) + "\"" : string.escape(value)}]` : `[${attr}]`;
		}).join("");
		const nthSelector = curElement.parentElement == null ? "" : `:nth-child(${Array.from(curElement.parentElement.children).indexOf(curElement) + 1})`;
		result.unshift(typeSelector + idSelector + classSelector + attrSelector + nthSelector);
		// @ts-ignore
		curElement = curElement.parentElement;
	}
	return result.join(opts.spaces ? " > " : ">");
}

type SelectorOptions = {

	/**
	 * Which attributes should not be present in selector chain. Use empty array to allow all.
	 * @defaultValue `["class", "id", "style"]`
	 */
	exclude: string[];

	/**
	 * Whether to use space around right arrow or not.
	 * @defaultValue `true`.
	 * @example
	 * ```ts
	 * selector($0, {space: true});  // "html > body:nth-child(2) > div"
	 * selector($0, {space: false}); // "html>body:nth-child(2)>div"
	 * ```
	 */
	spaces: boolean;

	/**
	 * Enclose all attribute values in double quotes. When `false`, omits where possible.
	 * @defaultValue `true`.
	 * @example
	 * ```ts
	 * selector($0, {quotes: true});  // "html > body:nth-child(2) > div[title=\"Title\"]"
	 * selector($0, {quotes: false}); // "html > body:nth-child(2) > div[title=Title]"
	 * ```
	 */
	quotes: boolean;
	// TODO: onlyID, nth, root, type
}
