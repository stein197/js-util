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
