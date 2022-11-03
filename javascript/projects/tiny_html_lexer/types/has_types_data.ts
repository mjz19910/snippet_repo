export function drop_type<T>(_: T|(() => void)): _ is () => void {
	return true;
}

export function has_types_arr_with<T>(
	v: {types: T[];}|((...a: any[]) => void),
	_cx: T[]
): v is {types: T[];} {
	if(!is_fn(v)) return false;
	type U={
		t: 'x',
		v: {types: T[];}|((...a: any[]) => void);
	};
	type V={
		t: 'y',
		v: {types: T[];};
	};
	function as<U,V>(x: U): U|V {
		return x;
	};
	let s=as<U,V>({t: 'x',v});
	if(!cast_to_object_and_fn<U['v']>(s)) return false;
	if(!s.v.hasOwnProperty('types'))
		s.v.types=[];
	return true;
}

export function cast_to_object_and_fn<T>(_: {t: 'x',v: T|(() => void);}|{t: 'y',v: T;}): _ is {t: 'y',v: T;} {
	return true;
}

export function is_fn<T>(v: T|((...a: any[]) => void)): v is () => void {
	return v!==null;
}
