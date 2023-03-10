type D_TrackingObj_f16={
	1: T_D32<41>;
	2: T_D32<6075>;
	3: T_D32<0>;
	4: VW_BinaryTimestamp;
};
type D_TrackingObj_f19={
	1: T_D32<16>;
	2: T_D32<3832>;
};
type T_Base64Str=string;
type H_TrackingObj_Tag=T_D32<0|330|523>;
type H_TrackingObj_Id=T_D32<13188>;
type H_TrackingObj_f6_Str=
	|"cards"
	|"endscreen"
	|"external"
	|"iv-endscreen"
	|"list_other"
	|"related-auto"
	|"related"
	|"rellist"
	|"shortswatch"
	|"watch"
	;
;
type H_TrackingObj_f6_Str_2="ni-push-u-sub";
type H_TrackingObj_f6=T_VW<never>|TV_Str<H_TrackingObj_f6_Str>|TV_Str_CS<H_TrackingObj_f6_Str_2>;
type VW_BinaryTimestamp=T_VW<V_BinaryTimestamp>;
type H_TrackingObj_f3=T_D32<0>;
type H_TrackingObj={
	1?: H_TrackingObj_Tag;
	2?: H_TrackingObj_Id;
	3?: H_TrackingObj_f3;
	4?: VW_BinaryTimestamp;
	6?: H_TrackingObj_f6;
	7?: TV_Str<T_Base64Str>;
	8?: T_VW_Bigint<101551873087600536n>|T_D32<2048687136925003>;
	9?: T_VW_Bigint<bigint>;
	11?: TV_Str<"FEwhat_to_watch">;
	16?: T_VW<D_TrackingObj_f16>;
	19?: T_VW<D_TrackingObj_f19>;
	21?: T_VW<{
		6: T_FD32<1315653944>;
		10: T_PArr_R<[
			T_FD32<826690645>,
			T_D32<114>,
			T_D32<84>,
		]>,
		14: T_FD64<4715926796601679684n>;
	}>;
};