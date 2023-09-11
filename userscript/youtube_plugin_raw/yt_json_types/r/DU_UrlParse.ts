export type DU_UrlParams_PageAd_AClk={
	sa: "L";
	ai: string;
	ae: "2";
	num: "1";
	cid: "CAESD-D29zZxVOrF2rNFnJPOyg";
	ad_cpn: "[AD_CPN]";
	sig: "AOD64_1v5DsfSfMgedKwzlLnd_4e8_CFhg";
	act: "1";
	ri: "1";
	adurl: `https://www.xometry.com/?${string}`;
	label: "video_click_to_advertiser_site";
	ctype: "110";
	ms: "[CLICK_MS]";
};

// cspell:ignoreRegexp /"AOD64_.+"/
export type DU_UrlParse={
	host: "www.youtube.com";
	pathname: "/pagead/paralleladinteraction";
	search: DU_UrlParams_PageadParallelAdInteraction;
}|{
	host: "www.googleadservices.com";
	pathname: "/pagead/aclk";
	search: DU_UrlParams_PageAd_AClk;
};
