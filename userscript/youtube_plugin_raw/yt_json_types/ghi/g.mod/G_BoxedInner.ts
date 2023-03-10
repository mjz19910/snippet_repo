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
	|[7,5,[X5_data,G_BoxedDatabaseData]]
	|[7,4,GUnBoxLvl4<Extract<G_BoxedDatabaseData,TShape_SuccessorX4<{}>>>]
	|[7,3,GUnBoxLvl3<Extract<G_BoxedDatabaseData,TShape_SuccessorX3<{}>>>]
	|[7,2,GUnBoxLvl2<G_BoxedDatabaseData>]
	|[7,1,GUnBoxLvl1<G_BoxedDatabaseData>]
	|[7,0,[G_BoxedDatabaseData]]
	|[8,any]
	;
;
type U1=Ret_w_dst[2];
type GUnBoxLvl1<T extends TShape_Successor<any>>=[T['z'][0],T];
type GUnBoxLvl2<T extends TShape_SuccessorX2<any>>=[T['z'][0]['z'][0],...GUnBoxLvl1<T>];
type GUnBoxLvl3<T extends TShape_SuccessorX3<any>>=[TZ_SuccessorX3<T>,...GUnBoxLvl2<T>];
type GUnBoxLvl4<T extends TShape_SuccessorX3<any>>=[TZ_SuccessorX4<T>,...GUnBoxLvl3<T>];
type X3_data=TZ_SuccessorX3<Extract<G_BoxedDatabaseData,TShape_SuccessorX3<{}>>>;
type X4_data=TZ_Successor<Extract<X3_data,TShape_Successor<any>>>;
type X4_box=Extract<X4_data,TShape_Successor<any>>;
type X5_data=X4_box["z"][0];
