/* spell:words
--- version_list item 3 ---
v2 (old): snippet_repo_v2/javascript/final/items/item3_v2.js
v3 (old): snippet_repo_v2/javascript/final/items/item3_v3.js
v4 (cur): snippet_repo_v2/javascript/final/items/item3_v4.js
v5 (new): snippet_repo_v2/javascript/group1/sub_a/item-_3.js
*/
{
	let ele=document.querySelector("#getPit");
	if(ele.cint)clearInterval(ele.cint);
	let pr=SharkGame.PlayerResources;
	function fmt(v){
		if(v===0)return "0";
		if(v<1){
			let sm_sz=0;
			while(v<1){
				v*=10;
				sm_sz++
			};
			return v.toFixed(7)+"s-"+sm_sz
		};
		if(v<10)return v.toFixed(7);
		return v.toFixed(4)
	};
	function res_get(v){
		return pr.get(v).amount
	};
	ele.cint=setInterval(()=>{
		ele.click();
		let eel=["eel", fmt(res_get("eel")/1e151)];
		let pit=["pit", fmt(res_get("pit")/1e151)];
		let arcana=["arcana", fmt(res_get("arcana")/1e297/32)];
		console.log(...eel,...pit,...arcana);
	},1000);
}