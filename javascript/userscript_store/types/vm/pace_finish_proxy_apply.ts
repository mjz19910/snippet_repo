import {auto_buy_obj} from "types/constants";

export function pace_finish_proxy_apply(func: Function, this_v: any, args: ArrayLike<any>) {
	auto_buy_obj.init();
	window.Pace.bar.finish = func;
	return Reflect.apply(func, this_v, args);
}
