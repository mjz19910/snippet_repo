type G_BoxedInner=
	|["z",G_BoxedDatabaseData]
	|["n"]
	|["a1",GB_A1]
	|[1,G_BoxedDatabaseData]
	|["k:sr",DST_Key_StartRadio]
	|[2,1,Ret_W_DSS_Impl<DSS_Bigint,"bigint",bigint>]
	|[2,2,Ret_W_DSS_Impl<DSS_Boolean,"boolean",boolean>]
	|[2,3,Ret_W_DSS_Impl<DSS_Keys,"keys",number|string>]
	|[2,4,Ret_W_DSS_Impl<DSS_Number,"number",number>]
	|[2,5,Ret_W_DSS_Impl<DSS_VE,"root_visual_element",number>]
	|[2,6,Ret_W_DSS_Impl<DSS_String,"string",string>]
	|[3,Ret_w_dst,DST_Browse_MP|DST_Browse_FE]
	|["m:0",any,any]
	|["m:1",any,any]
	|[8,any]
	;
;
type U1=Ret_w_dst[2];
