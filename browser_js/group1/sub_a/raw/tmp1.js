// deno-lint-ignore-file
/*
https://jacorb90.me/The-Factory-Of-Automation/
*/
window.confirm = function(msg) {
	console.log(msg, new Error().stack);
	return true;
};

/** @arg {number} e */
function do_SBUpgAmt(e) {
	//@ts-ignore
	return SBUpgAmt(e);
}
/** @arg {number} e */
function do_buySBUpg(e) {
	//@ts-ignore
	buySBUpg(e);
}

/** @arg {number} e */
function buy_allSBUpg(e) {
	let prev = do_SBUpgAmt(e);
	do_buySBUpg(e);
	let ch = do_SBUpgAmt(e) - prev;
	while(ch > 0) {
		prev = do_SBUpgAmt(e);
		do_buySBUpg(e);
		ch = do_SBUpgAmt(e) - prev;
	}
}; if(window.__cint) clearInterval(window.__cint);
window.__cint = setInterval(function() {
	buy_allSBUpg(1);
	buy_allSBUpg(2);
	buy_allSBUpg(3);
}, 250);