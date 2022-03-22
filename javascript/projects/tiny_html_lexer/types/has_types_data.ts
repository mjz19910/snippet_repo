export function has_types_data(_v:(...a:any extends infer U ? U[]:never)=>void):_v is (()=>void)&{types:[]} {
	return true;
}

export function down_cast_func(v: ((...a:any[])=>void)|null):v is ()=>void {
	return v !== null;
}
export function drop_type(_:Function | (()=>void)):_ is ()=>void {
	return true;
}
export function has_types_arr_with(
	v:{types:typeof cx[]}|((...a:any[])=>void)|null,
	cx:any extends infer U ? U extends {} ? U[] : never: never
):v is {types:typeof cx} {
	if(v !== null) {
		if(!is_fn(v))return false;
		let s:{t:'x', v:typeof v}|{t:'y', v:Object & {types:typeof cx}}={
			t:'x',
			v,
		};
		if(0) {
			s={
				t:'y', v:{
					types:[],
				}
			};
		}
		if(!cast_to_object_and_fn(s))return false;
		if(!s.v.hasOwnProperty('types')){
			s.v.types=[];
		};
		return true;
	};
	return false;
}

export function cast_to_object_and_fn(_:{t:'x', v:()=>void}|{t:'y', v:{}}):_ is {t:'y', v:{}} {
	return true;
}

export function is_fn(v:{types:any[]}|((...a:any[])=>void)):v is ()=>void {
	return v !== null;
}
