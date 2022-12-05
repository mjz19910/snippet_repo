/*
https://jacorb90.me/The-Factory-Of-Automation/
*/


player_nums = Object.fromEntries(
	Object.entries(player)
		.filter(e => e[1] instanceof ExpantaNum)
		.map(e => [e[0], e[1].clone()])
);

/*
sacrificeGen
FORMULA.sacrifice().gt('1e50')
player.money.log().toNumber()
element.onclick=function(){
	ionCoreReset()
}*/

confirm = function(msg) {
	console.log(msg, new Error().stack);
	return true;
};

function buy_allSBUpg(e) {
	let prev = SBUpgAmt(e);
	buySBUpg(e);
	let ch = SBUpgAmt(e) - prev;
	while(ch > 0) {
		prev = SBUpgAmt(e); buySBUpg(e); ch = SBUpgAmt(e) - prev;
	}
}; if(window.cint) clearInterval(window.cint);
window.cint = setInterval(function() {
	buy_allSBUpg(1);
	buy_allSBUpg(2);
	buy_allSBUpg(3);
}, 250);