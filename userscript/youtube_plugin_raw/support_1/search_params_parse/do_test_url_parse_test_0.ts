async function do_test_url_parse_test_0() {
	let mod=await import("../../zc_child_modules/YtPlugin_Base_Plugin.user.js");
	function parse_with_url_parse<T extends `https://${string}`>(str: T): UrlParse<T> {
		let s=new URL(str);
		return s as any as UrlParse<T>;
	}
	let pagead=new class {
		adview=new class {
			ai: string|null=null;
		};
	};
	pagead.adview={
		ai: new URLSearchParams(new URL("https://www.youtube.com/pagead/adview?ai=CR9DJiI6lY62vDMm7n88Pnre6kAngxfL9bfCOlrycEWQQASAAYP2Q9oDMA4IBF2NhLXB1Yi02MjE5ODExNzQ3MDQ5MzcxoAHLt6f4A6gDBMgDCqoEyAFP0EC2FSEYx70zuAUppUfEkYi_mOxY9ayL2TsEqmuwqQ2uR52X5F8mREDx148616YrlzJGcdfwasaotiQufJZQh_1P-F5EUxNcTrvVkGAoIHM-E6HcARQOzmMpiHURkEuWhENDfN2plBxHA5lui-nCj1tpA07TYASPOdBjxm-rT6PJyNg5mzjomgxxcY4JpG3rnZbC1TQ_an4StPQ5YOx-FCxGyY58dQA2TCk1vQwtBzqiGbOgOwWxy0tPKdPvQ51LcGX2i_nxJ8AEyNr865sEiAWjkqTnR5IFCQgTaAF47fX5BqAGboAHncjYB4gHAZAHAqgHgqqxAqgHhAioB6jSG6gHtgeoB-DPG6gH6dQbqAeMzRuoB7HcG6gHpJqxAqgHkZ-xAqgHsJuxAqgH36GxAqgHpqqxAqgHgcYbqAerxRuoB-PZG6gHt6mxAqgH6auxApIIC0FBQUFBQUFBQUFB0ggYCIDAgEAQAhgAMgSBgoAOOgeAgICAgIEEyAkAugs-CAIQBRgWIAgoATADQAFIAFABWCVgAGgAcAGIAQCYAQGiARIKAggBKAH4AQGQAgKoAgXAAgLYAQGAAgGIAgW4E____________wGwFALAFYGAgECKFwoIAxgBKAEwATgBoBcBqReJBEg1yjlletIXDhIK7E7vTqtctFyTaRhu&sigh=f6Ah-ilTPVs&cid=CAESD-D2saJYt_ikQ_sicNcKDQ").search).get("ai")
	};
	let vv=parse_with_url_parse(url_test_value_ytimg_vi_jpg);

	let rt_u=vv; rt_u;
	const search_str=mod.split_string(vv.search,"?")[1];
	console.log('rt_u.search has_sqp=%o',rt_u.search.includes("sqp")? "yes":"no");
	console.log("rs",get_url_params(search_str,"rs"));
	console.log("sqp",get_url_params(search_str,"sqp"));
}

do_test_url_parse_test_0().then(e => {
	if(e!==void 0) debugger;
	console.log("done");
});
