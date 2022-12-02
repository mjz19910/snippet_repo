export function lightreset_inject() {
	window.g_auto_buy.state_history_clear_for_reset();
	window.g_auto_buy.skip_save=true;
	window.addEventListener('unload',function() {
		window.g_auto_buy.skip_save=false;
		localStorage["auto_buy_timeout_str"]="300,300,300,300";
		localStorage["long_wait"]=(6000*2);
	});
	let original=window.g_auto_buy.original_map.get('lightreset');
	if(original)
		original();
}
