/* spell:words
-- version_list item 5 --
v1 (cur): snippet_repo/javascript/group1/sub_a/item-_5.js
*/
(function() {
	/** @typedef {{mults:number[],num: number;gens: number[];money: number,coal: number;fuel: number;genpower: number;}} item_5_Player */
	/** @arg {{}} _player @returns {asserts _player is item_5_Player} */
	function asserts_player(_player) {}
	/** @returns {item_5_Player} */
	function get_player() {
		asserts_player(window.player);
		return window.player;
	}
	if(window.hasOwnProperty("cint")) {
		clearTimeout(window.__cint)
	}
	let player=get_player();
	var delay=70
	function mult() {
		return player.mults[0]*player.mults[1]*player.mults[2]+(player.gens[0]*1e7+player.gens[1]*1e8+player.gens[2]*1e9)*player.genpower;
	}
	/** @arg {number} scale */
	function mod(scale) {
		var gain=Math.floor(player.num/scale);
		player.num-=gain*1e9;
		player.money+=gain/100;
	}
	function rep() {
		if(!window.exchange) return;
		var fac=(player.num/mult());
		var td=(1000/delay)*1.5;
		var dv=70e7*td*fac;
		mod(dv);
		var coal_gain=800*(td/6)+fac*2.5;
		if(player.coal<coal_gain) {
			for(var i=0;i<12;i++) {
				window.exchange(5);
			}
		}
		var fuel_gain=800*(td/10)+fac/2;
		if(player.fuel<fuel_gain) {
			for(var i=0;i<2;i++) {
				window.exchange(7);
			}
		}
		window.__cint=setTimeout(rep,delay);
	}
	rep()
	player.fuel
}
)()
