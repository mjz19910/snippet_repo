namespace Error_youtube_plugin_9167_TS2345 {
	type T_ErrorSplit<T extends string>=T_SplitOnce<T,":"> extends infer V extends any[]? T_SplitOnce<V[1],":"> extends infer V2 extends any[]? [V[0],V2[0],V2[1]]:never:never;
	type ERROR=T_ErrorSplit<`youtube_plugin_raw/youtube_plugin.user.js(9167,40): error TS2345: Argument of type 'Omit<RemovePrefix<Omit<T, "type" | "trackingParams" | "buttonText" | "subscribed" | "enabled" | "channelId" | "showPreferences">, "subscribed">, "buttonText">' is not assignable to parameter of type '{} extends Omit<RemovePrefix<Omit<T, "type" | "trackingParams" | "buttonText" | "subscribed" | "enabled" | "channelId" | "showPreferences">, "subscribed">, "buttonText"> ? T_DistributedKeysOf<Omit<RemovePrefix<Omit<T, "type" | "trackingParams" | "buttonText" | "subscribed" | "enabled" | "channelId" | "showPreferences">, "subscribed">, "buttonText">> extends [] ? Omit<RemovePrefix<Omit<T, "type" | "trackingParams" | "buttonText" | "subscribed" | "enabled" | "channelId" | "showPreferences">, "subscribed">, "buttonText"> : never : never`>;
	export type E1=[
		e1: ERROR[0],
		e2: ERROR[1],
		e4: T_Split<ERROR[2],"'">[1],
		e4: T_Split<ERROR[2],"'">[2],
		e4: T_Split<ERROR[2],"'">[3],
		e3: ERROR['length']
	];
	export type op=`${"{} extends Omit<RemovePrefix<Omit<T, \"type\" | \"trackingParams\" | \"buttonText\" | \"subscribed\" | \"enabled\" | \"channelId\" | \"showPreferences\">, \"subscribed\">, \"buttonText\"> ? T_DistributedKeysOf<Omit<RemovePrefix<Omit<T, \"type\" | \"trackingParams\" | \"buttonText\" | \"subscribed\" | \"enabled\" | \"channelId\" | \"showPreferences\">, \"subscribed\">, \"buttonText\">> extends [] ? Omit<RemovePrefix<Omit<T, \"type\" | \"trackingParams\" | \"buttonText\" | \"subscribed\" | \"enabled\" | \"channelId\" | \"showPreferences\">, \"subscribed\">, \"buttonText\"> : never : never"}.${number}`;
	type TT<T>=Omit<T_RemovePrefix<Omit<T,"type"|"trackingParams"|"buttonText"|"subscribed"|"enabled"|"channelId"|"showPreferences">,"subscribed">,"buttonText">;
	type T2<T>=Omit<T_RemovePrefix<Omit<T,"type"|"trackingParams"|"buttonText"|"subscribed"|"enabled"|"channelId"|"showPreferences">,"subscribed">,"buttonText">;
	export type U1=TT<D_SubscribeButton>;
	export type U2=T2<D_SubscribeButton>;
}
