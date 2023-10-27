// deno-lint-ignore-file
import {T_Split} from "../../yt_json_types/stu/group_T.ts";

export function __ia_excludeKeysS<T extends string,U extends {},C extends T_Split<T,",">>(target: U,ex_keys_str: T_Split<T,","> extends any[]? T:never): {[I in Exclude<keyof U,C[number]>]: U[I];} {
	let ex_keys: C=ex_keys_str.split(",") as C;
	var key: string,rest,i=0,obj: {}=Object.fromEntries(Object.entries(target));
	for(;i<ex_keys.length;i++) {
		{
			key=ex_keys[i];
			let {[key]: _,...rest_}=obj as {[x: string]: any;};
			rest=rest_;
		};
		obj=rest;
	};
	return obj as {[I in Exclude<keyof U,C[number]>]: U[I];};
}
export type __ia_excludeKeysS2={fn: __ia_excludeKeysS2;};