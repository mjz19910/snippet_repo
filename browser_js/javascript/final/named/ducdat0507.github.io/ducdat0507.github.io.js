/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/ducdat0507.github.io/ducdat0507.github.io.js
*/
import {Runner} from "../support/Runner.js";
import {CustomInputMatcher} from "../support/CustomInputMatcher.js";

function main() {
	let cur=new Runner;
	cur.n=new CustomInputMatcher(/https:\/\/ducdat0507.github.io/,() => location.origin,"ducdat0507");
	cur.f=async function() {
		/** @arg {{}} player @returns {asserts player is {aspTime: {buyables: any[];points: {lt: (arg0: any) => any;};};}} */
		function assert_is_my_player(player) {player;}
		/** @returns {{aspTime: {buyables: any[]; points: {lt: (arg0: any) => any;};};}} */
		function get_player() {
			assert_is_my_player(player);
			return player;
		}
		let mc=new MessageChannel;
		let msg_clk='CLOCK_RUN';
		let clk_priv={
			clk_id: []
		};
		mc.port1.onmessage=function(e) {
			switch(e.data.msg_type) {
				case msg_clk:
					/** @type {any[]} */
					let ev=clk_priv.clk_id;
					let f=ev[e.data.fn];
					f();
					ev.splice(e.data.fn,1);
					break;
				default:
					console.log('unk_msg',e.data);
			}
		};
		let clk={
			t: function(/** @type {() => void} */ e) {
				setTimeout(e);
			},
			r: function(/** @type {any} */ e) {
				/** @type {any[]} */
				let ev=clk_priv.clk_id;
				let id=ev.length;
				ev.push(e);
				mc.port2.postMessage({
					msg_type: msg_clk,
					fn: id
				});
			}
		};
		let player=get_player();
		let i=0;
		for(;;) {
			// let lb=layers.aspTime.buyables[22];
			// let idx=player.aspTime.buyables[22].toNumber()+1
			// 	,sc=lb.cost(new Decimal(idx))
			// 	,ec=lb.cost(new Decimal(idx+1))
			// 	,r=ec.sub(sc);
			// let edc=Math.floor(r.toNumber()*20);
			// for(let j=0;j<edc;j++) {
				// buyBuyable('aspTime',21);
			// }
			// i+=edc;
			let d=0;
			for(;d<30;d++) {
				// let am22=player.aspTime.buyables[22];
				// let am21=player.aspTime.buyables[21];
				// let cs22=lb.cost(am22);
				// buyBuyable('aspTime',22);
				// if(am21.lt(cs22)) {
				// 	break;
				// }
			}
			await new Promise(clk.r);
			// if(player.aspTime.points.lt(layers.aspTime.buyables[21].cost(player.aspTime.buyables[21]))) {
			// 	break;
			// }
			if(i>40) break;
		}
	};
	cur.value=cur.do_cur();
	return cur.make_ret();
	//# sourceURL=snippet:///%24_2
}
window.__ret=main();
