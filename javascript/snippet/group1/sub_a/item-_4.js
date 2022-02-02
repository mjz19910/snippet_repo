/* spell:words
-- version_list item 4 --
v1 (old): snippet_repo_v2/javascript/final/items/item4_v1.js
v2 (old): snippet_repo_v2/javascript/final/items/item4_v2.js
v3 (cur): snippet_repo_v2/javascript/snippet/group1/sub_a/item-_4.js
*/
class AutoState {
	constructor() {
		this.cint_arr = [];
		this.current_generator_autobuy=0;
	}
	destroy_cint_item(item) {
		switch (item[0]) {
		case 0:
			clearTimeout(item[1]);
			break;
		case 1:
			clearInterval(item[1]);
			break;
		}
	}
	setTimeout() {
		let cint = setTimeout(func, delay);
		this.cint_arr.push([0, cint]);
	}
	setInterval(func, delay) {
		let cint = setInterval(func, delay);
		this.cint_arr.push([1, cint]);
	}
	start() {
		if (!player.generators_autobuyer[0][0]) {
			let t=this;
			this.setInterval(e=>tierGenerator(t.current_generator_autobuy++ % 8), 50);
			this.setInterval(e=>tierMult(), 300);
			this.setInterval(e=>buyMeta(), 300);
		}
	}
	destroy_cint() {
		for (let item of this.cint_arr) {
			this.destroy_cint_item(item);
		}
	}
	destroy() {
		this.destroy_cint();
	}
}
if (window.g_state) {
	window.g_state.destroy();
}
window.g_state = new AutoState;
window.g_state.start();
