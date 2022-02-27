import {auto_buy_obj} from "./rebuild_the_universe_auto_typed_v0.1";

export function pace_finish_proxy_apply(func: Function, this_v: any, args: ArrayLike<[]>) {
	auto_buy_obj.init();
	window.Pace.bar.finish = func;
	if(args.length > 0) {
		throw new Error("pace apply used more than the expected arguments");
	}
	return Reflect.apply(func, this_v, args);
}
