/* spell:words
--- version_list item 1 ---
v1 (old): snippet_repo_v2/javascript/final/items/item_01_v1.js
v2 (cur): snippet_repo_v2/javascript/group2/item_01.js
*/
class Element {}
class Transmutation {
	constructor(arg1, arg1_count, arg2, arg2_count) {
		this.data = [arg1, arg1_count, arg2, arg2_count];
	}
}
const RECIPES=[
	new Transmutation(new Element("Copper"), 2, new Element("Silver"), 1),
	new Transmutation(new Element("Silver"), 5, new Element("Gold"), 2)
];
