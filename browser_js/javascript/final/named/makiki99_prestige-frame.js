import {CustomInputMatcher} from "../support/CustomInputMatcher.js";
import {Runner} from "../support/Runner.js";

/* spell:words makiki99
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/makiki99_prestige-frame.js
*/
function main() {
	/** @type {import("./__global.js")} */
	let holder=1;
	holder;
	let cur=new Runner;
	cur.n=new CustomInputMatcher("https://makiki99.github.io/prestige-frame/",() => location.href,"makiki99.prestige-frame");
	cur.f=function() {
		class HTMLIFrameExt extends HTMLIFrameElement {
			/** @override */
			get src() {
				return super.src;
			}
			/** @override */
			set src(e) {
				switch(e) {
					case 'https://makiki99.github.io/prestige':
						this.width=""+800;
						this.height=""+424;
						break;
					case 'https://makiki99.github.io/metaprestige/':
						this.width=""+800;
						this.height=""+472;
						break;
				}
				super.src=e;
			}
		}
		Object.defineProperty(HTMLIFrameExt.prototype,Symbol.toStringTag,{
			value: 'HTMLIFrameExtElement',
			configurable: true
		});
		window.HTMLIFrameExt=HTMLIFrameExt;
		let fr=document.getElementById('frames');
		if(!fr) throw new Error("1");
		if(!(fr instanceof HTMLTableElement)) throw new Error("1");
		let fr_table=fr;
		if(fr.rows.length==0) {
			fr.insertRow();
		}
		let frame_row=fr.rows[0];
		/** @arg {HTMLTableRowElement} c_row */
		function make_cell(c_row) {
			if(c_row.cells.length==0) {
				return c_row.insertCell();
			}
			return c_row.cells[c_row.cells.length-1];
		}
		let cd=make_cell(frame_row);
		/** @arg {{ children: any; }} cd */
		function run_for_cell(cd) {
			[...cd.children].map(e => e.remove());
		}
		run_for_cell(cd);
		if(customElements.get('iframe-ext')) {
			location.reload();
			return;
		}
		customElements.define('iframe-ext',HTMLIFrameExt,{
			extends: "iframe"
		});
		function create_iframe_cell_for_url(/** @type {string} */ url) {
			let frame_row=fr_table.insertRow();
			let cd=frame_row.insertCell();
			let rr=document.createElement('iframe',{
				is: 'iframe-ext'
			});
			rr.src=url;
			cd.append(rr);
		}
		let rr=document.createElement('iframe',{
			is: 'iframe-ext'
		});
		rr.src='https://makiki99.github.io/prestige';
		cd.append(rr);
		create_iframe_cell_for_url('https://makiki99.github.io/metaprestige/');
	};
	cur.value=cur.do_cur();
	return cur.make_ret();
	//# sourceURL=snippet:///%24_2
}
window.__ret=main();
