export declare class t_arr_maker_impl<T> {
	values: T[]
	set add(value: T)
	add_template(template: readonly T[],..._sep_arr: string[]): readonly T[]
	constructor(values: T[])
}
