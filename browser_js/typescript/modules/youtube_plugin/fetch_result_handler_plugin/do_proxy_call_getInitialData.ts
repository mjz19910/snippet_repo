import {InitialData} from "./InitialData.js";
var yt_handlers={
	on_initial_data<A extends () => InitialData>(a: [A,null,Parameters<A>]) {a;}
};
export function do_proxy_call_getInitialData<A extends () => InitialData>(args: [A,null,Parameters<A>]) {
	return yt_handlers.on_initial_data(args);
}
