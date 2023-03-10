import {attach_proxy_for_setInterval} from "../block/attach_proxy_for_setInterval.js";
import {make_proxy_for_function} from "../block/make_proxy_for_function.js";
import {make_proxy_for_function_constructor} from "../block/make_proxy_for_function_constructor.js";

make_proxy_for_function_constructor();
make_proxy_for_function();
attach_proxy_for_setInterval();
