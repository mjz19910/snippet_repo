type Ret_w_dst<T extends G_Boxed_DST>=
	|[
		true,1,
		[
			x1: Extract<T,{l: any;}>["l"],
			x2: string
		],
		GetAllZ<Extract<T,{a: "/db/key/a/b/l/z";}>>
	]
	|[
		true,2,
		[
			x1: Extract<T,{a: "/db/key/a/b/l/m/z";}>["l"],
			x2: Extract<T,{a: "/db/key/a/b/l/m/z";}>["m"]
		],
		GetAllZ<Extract<T,{a: "/db/key/a/b/l/m/z";}>>
	]
	|[false,4,[x1: Extract<T,{l: any;}>["l"]],[T["z"][0],T]]
	|[false,5,[],[T["z"][0],T]]
	|[false,6,[],[]]
	;
;
type GetAllZ<T extends TShape_SuccessorX2<any>>=[T["z"][0]['z'][0],T["z"][0],T];
