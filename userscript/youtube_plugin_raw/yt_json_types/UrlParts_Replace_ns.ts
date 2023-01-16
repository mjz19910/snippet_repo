namespace Replace {
	type G1=UrlParse<GoogleLoginExternalUrl>['search'];
	type G2=Split<G1,"?">[1];
	type G3=ParseUrlSearchParams<G2>['continue'];
	type V1=Replace<G3,"%3A",":">;
	type V2=Replace<V1,"%2F","/">;
	type V3=Replace<V2,"%3F","?">;
	type V4=Replace<V3,"%3D","=">;
	type V5=Replace<V4,"%26","&">;
	export type V6=Replace<V5,"%25","%">;
}