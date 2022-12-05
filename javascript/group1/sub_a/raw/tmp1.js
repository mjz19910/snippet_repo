/*
https://jacorb90.me/The-Factory-Of-Automation/
*/
// @no-var
var player_nums,player={};
class ExpantaNum {}

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

window.confirm = function(msg) {
	console.log(msg, new Error().stack);
	return true;
};

/** @param {number} e */
function do_SBUpgAmt(e) {
	//@ts-ignore
	return SBUpgAmt(e);
}
/** @param {number} e */
function do_buySBUpg(e) {
	//@ts-ignore
	buySBUpg(e);
}

/** @param {number} e */
function buy_allSBUpg(e) {
	let prev = do_SBUpgAmt(e);
	do_buySBUpg(e);
	let ch = do_SBUpgAmt(e) - prev;
	while(ch > 0) {
		prev = do_SBUpgAmt(e);
		do_buySBUpg(e);
		ch = do_SBUpgAmt(e) - prev;
	}
}; if(window.cint) clearInterval(window.cint);
window.cint = setInterval(function() {
	buy_allSBUpg(1);
	buy_allSBUpg(2);
	buy_allSBUpg(3);
}, 250);