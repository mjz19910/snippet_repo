type MT_MakeSplitObj<T>=Nullable<{
	arr: make_arr_t<T>;
	instance_name: make_instance_name_t<T>|make_instance_name_t_1|make_instance_name_t_2;
	many: make_many_t<T>;
	one: make_one_t<T>;
	typeof_name: make_typeof_name_t<T>;
}>;
