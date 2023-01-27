namespace Replace {
	type G1=UrlParse<D_GoogleLoginExternalUrl>['search'];
	type G2=T_Split<G1,"?">[1];
	type G3=TP_ParseUrlSearchParams<G2>['continue'];
	type V1=T_Replace<G3,"%3A",":">;
	type V2=T_Replace<V1,"%2F","/">;
	type V3=T_Replace<V2,"%3F","?">;
	type V4=T_Replace<V3,"%3D","=">;
	type V5=T_Replace<V4,"%26","&">;
	export type V6=T_Replace<V5,"%25","%">;
}