/* spell:words
--- version_list item 1 ---
v1 (old): snippet_repo/javascript/final/items/item_01_v1.js
v2 (cur): snippet_repo/javascript/final/items/item_01_v2.js
*/
class RElement {
	/** @arg {any} v */
	constructor(v) {
		this.v=v;
	}
}
class Transmutation {
	/** @arg {RElement} arg1 @arg {number} arg1_count @arg {RElement} arg2 @arg {number} arg2_count */
	constructor(arg1, arg1_count, arg2, arg2_count) {
		this.data = [arg1, arg1_count, arg2, arg2_count];
	}
}
const RECIPES=[
	new Transmutation(new RElement("Copper"), 2, new RElement("Silver"), 1),
	new Transmutation(new RElement("Silver"), 5, new RElement("Gold"), 2)
];
