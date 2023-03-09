type G_BoxedInner=
	|["z",G_BoxedIdObj]
	|["n"]
	|["a1",GB_A1]
	|[1,...Ret_w_dst<G_Boxed_DST>,{
		key: G_BoxedIdObj['key'];
		a: DST_PlayNext["a"]; b: "boxed_id";
		j: GB_A1_J_Shape;
		w: any;
	}|{
		key: G_BoxedIdObj['key'];
		a: DST_PlayNext["a"]; b: "boxed_id";
		j: GB_A1_J_Shape;
	}]
	|["k:sr",DST_Key_StartRadio]
	|[2,1,...Ret_W_DSS_Impl<DSS_Bigint,"bigint",bigint>]
	|[2,2,...Ret_W_DSS_Impl<DSS_Boolean,"boolean",boolean>]
	|[2,3,...Ret_W_DSS_Impl<DSS_Keys,"keys",number|string>]
	|[2,4,...Ret_W_DSS_Impl<DSS_Number,"number",number>]
	|[2,5,...Ret_W_DSS_Impl<DSS_VE,"root_visual_element",number>]
	|[2,6,...Ret_W_DSS_Impl<DSS_String,"string",string>]
	;
;
type Ret_w_dst<T extends G_Boxed_DST>=[true,number,T["j"],string,T["z"][0]['z'][0],T["z"][0],T]|[false,number,T["j"],T["z"][0],T];
