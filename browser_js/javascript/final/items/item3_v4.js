/* spell:words
--- version_list item 3 ---
v3 (old): snippet_repo/javascript/final/items/item3_v3.js
v4 (cur): snippet_repo/javascript/final/items/item3_v4.js
v5 (new): snippet_repo/javascript/group1/sub_a/item-_3.js
*/
{
	/** @type {import("./__global.js")} */
	let holder=1;
	holder;
	let ele=document.querySelector("#getPit");
	if(!(ele instanceof HTMLElement)) throw new Error("1");
	if(!ele) throw new Error("1");
	if('cint' in ele&&typeof ele.cint==='number') clearInterval(ele.cint);
	let pr=SharkGame.PlayerResources;
	/**
	 * @arg {number} v
	 */
	function fmt(v) {
		if(v===0) return "0";
		if(v<1) {
			let sm_sz=0;
			while(v<1) {
				v*=10;
				sm_sz++;
			}
			return v.toFixed(7)+"s-"+sm_sz;
		}
		if(v<10) return v.toFixed(7);
		return v.toFixed(4);
	}
	/**
	 * @arg {string} v
	 */
	function res_get(v) {
		return pr.get(v).amount;
	}
	Object.defineProperty(ele,"cint",{
		"configurable": true,
		"enumerable": true,
		"writable": true,
		value: 0,
	});
	if(!('cint' in ele)) throw new Error("1");
	ele.cint=setInterval(() => {
		if(!ele) throw new Error("1");
		if(!(ele instanceof HTMLElement)) throw new Error("1");
		ele.click();
		let eel=["eel",fmt(res_get("eel")/1e151)];
		let pit=["pit",fmt(res_get("pit")/1e151)];
		let arcana=["arcana",fmt(res_get("arcana")/1e297/32)];
		console.log(...eel,...pit,...arcana);
	},1000);
}
