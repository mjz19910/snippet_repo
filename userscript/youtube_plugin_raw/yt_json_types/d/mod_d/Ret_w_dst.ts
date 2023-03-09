type Ret_w_dst<T extends G_Boxed_DST>=
	|[true,1,Extract<T,{j: any;}>["j"],string,T["z"][0]['z'][0],T["z"][0],T]
	|[true,2,Extract<T,{j: any;}>["l"],Extract<T,{m: any;}>["m"],T["z"][0],T]
	|[false,4,Extract<T,{j: any;}>["l"],T["z"][0],T]
	;
;
