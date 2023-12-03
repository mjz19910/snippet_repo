if (window.__cint) {
	clearInterval(window.__cint);
}
window.__cint = setInterval(function () {
	functions.clickMineObject();
}, 0);
