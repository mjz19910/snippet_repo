/* spell:words
-- version_list item 5 --
v1 (cur): snippet_repo/javascript/group1/sub_a/item-_5.js
*/
(function() {
	if(window.hasOwnProperty("cint")) {
		clearTimeout(cint)
	}
	var delay=70
	var mult=function() {
		return player.mults[0]*player.mults[1]*player.mults[2]+(player.gens[0]*1e7+player.gens[1]*1e8+player.gens[2]*1e9)*player.genpower
	}
	var mod=function(scale) {
		var gain=Math.floor(player.num/scale)
		player.num-=gain*1e9
		player.money+=gain/100
	}
	var rep=function() {
		var fac=(player.num/mult())
		var td=(1000/delay)*1.5
		var dv=70e7*td*fac
		mod(dv)
		var coal_gain=800*(td/6)+fac*2.5
		if(player.coal<coal_gain) {
			for(var i=0;i<12;i++) {
				exchange(5)
			}
		}
		var fuel_gain=800*(td/10)+fac/2
		if(player.fuel<fuel_gain) {
			for(var i=0;i<2;i++) {
				exchange(7)
			}
		}
		window.cint=setTimeout(rep,delay)
	}
	rep()
	player.fuel
}
)()
