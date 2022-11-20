/* spell:words
--- version_list item 1 ---
v1 (old): snippet_repo/javascript/final/items/item_01_v1.js
v2 (old): snippet_repo/javascript/final/items/item_01_v2.js
v3 (unk)
*/
class RElement {
	/** @param {any} v */
	constructor(v) {
		this.v=v;
	}
}
class Transmutation {
	/** @param {RElement} arg1 @param {number} arg1_count @param {RElement} arg2 @param {number} arg2_count */
	constructor(arg1, arg1_count, arg2, arg2_count) {
		this.data = [arg1, arg1_count, arg2, arg2_count];
	}
}
const RECIPES=[
	new Transmutation(new RElement("Copper"), 2, new RElement("Silver"), 1),
	new Transmutation(new RElement("Silver"), 5, new RElement("Gold"), 2)
];
