if (window.__cint) {
	__message_channel_timers.clear(window.__cint);
}
window.__cint = __message_channel_timers.set(function () {
	functions.clickMineObject();
});
