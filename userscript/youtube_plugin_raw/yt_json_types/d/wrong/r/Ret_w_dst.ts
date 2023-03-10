type Ret_w_dst=
	|[
		true,1,
		[
			x1: "",
			x2: string
		],
		[{}]
	]
	|[
		true,2,
		[
			x1: "",
			x2: ""
		],
		[{}]
	]
	|[false,4,[x1: ""],[any,any]]
	|[false,5,[],[any,any]]
	|[false,6,[],[]]
	;
;
type GetAllZ<T extends TShape_SuccessorX2<any>>=[T["z"][0]['z'][0],T["z"][0],T];
