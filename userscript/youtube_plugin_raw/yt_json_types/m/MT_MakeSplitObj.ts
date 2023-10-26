import {Nullable} from "../../../DebugApi_raw/support/types/Nullable.ts";
import {make_arr_t,make_instance_name_t,make_many_t,make_one_t,make_typeof_name_t} from "./make_item_group.ts";

export type MT_MakeSplitObj<T>=Nullable<{
	arr: make_arr_t<T>;
	instance_name: make_instance_name_t<string>;
	many: make_many_t<T>;
	one: make_one_t<T>;
	typeof_name: make_typeof_name_t<T>;
}>;
