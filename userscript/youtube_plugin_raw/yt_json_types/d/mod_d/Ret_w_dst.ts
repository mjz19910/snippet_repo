type Ret_w_dst<T extends G_Boxed_DST>=
	|[true,number,Extract<T,{j: any;}>["j"],string,T["z"][0]['z'][0],T["z"][0],T]
	|[false,number,Extract<T,{j: any;}>["l"],T["z"][0],T]
	;
;
