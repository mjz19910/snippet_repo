if (window.__cint) {
	window.__message_channel_timers.clear(window.__cint);
	window.__cint = void 0;
}
if (window.__cint2) {
	clearInterval(window.__cint2);
	window.__cint2 = void 0;
}
window.__timer_mode = 4;
switch (window.__timer_mode) {
	case 1:
		window.__cint = window.__message_channel_timers.set(function () {
			functions.clickMineObject();
		});
		break;
	case 2:
		window.__cint = window.__message_channel_timers.set(function () {
			functions.clickMineObject();
			functions.craftPick(functions.getUsedGems());
		});
		break;
	case 3:
		window.__cint2 = setInterval(function () {
			functions.clickMineObject();
		}, 100 / 3);
		break;
	case 4:
		break;
	default:
		break;
}
