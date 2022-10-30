import {auto_buy_obj} from "./rebuild_the_universe_auto_v0.2";

/**
 * @param {Function} func
 * @param {any} this_v
 * @param {ArrayLike<any>} args
 */
function pace_finish_proxy_apply(func, this_v, args) {
	auto_buy_obj.init();
	window.Pace.bar.finish = func;
	return Reflect.apply(func, this_v, args);
}
