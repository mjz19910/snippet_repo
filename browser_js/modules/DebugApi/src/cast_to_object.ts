export function is_object<T>(x: T): x is (T&null)|(T&{}) {
	return typeof x==='object';
}

export function cast_to_object<T>(x: T): {data: T&({}|null);}|null {
	if(!is_object(x))
		return null;
	if(x instanceof Object)  {
		x;
	}
	return {data: x};
}

/** @template {{}} T @template {string} U @arg {T} x @arg {U} k @returns {x is T&Record<U,unknown>} */
function is_record_with_T<T extends {}, U extends string>(x: T,k: U): x is T&Record<U,unknown> {
	return k in x;
}

/** @template {{}} U @template {string} T @arg {U} x @arg {T} k @returns {x is U&Record<T,string>} */
function is_record_with_string_type<U extends {}, T extends string>(x: U,k: T): x is U&Record<T,string> {
	return is_object(x)&&x!==null&&is_record_with_T(x,k)&&typeof x[k]==='string';
}

export function cast_to_record_with_string_type<T extends {}>(x: T): T&Record<"type",string>|null {
	if(!is_record_with_string_type(x,"type" as const)) return null;
	return x;
}
export function cast_to_record_with_key_and_string_type<T extends {},U extends string>(x:T,k:U): { [P in U]: string; }|null {
	if(!is_record_with_string_type(x,k)) return null;
	return x;
}
