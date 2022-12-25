import {create_from_parse} from "./create_from_parse.js";
import {Decay} from "./Decay.js";
import {ParseUrlParams} from "../search_params/ParseUrlParams.js";
import {get_url_params} from "./get_url_params.js";

export function do_test_url_parse_test_0() {
	let pagead=new class {
		adview=new class {
			ai: string|null=null;
		};
	};
	pagead.adview={ai: new URLSearchParams(new URL("https://www.youtube.com/pagead/adview?ai=CR9DJiI6lY62vDMm7n88Pnre6kAngxfL9bfCOlrycEWQQASAAYP2Q9oDMA4IBF2NhLXB1Yi02MjE5ODExNzQ3MDQ5MzcxoAHLt6f4A6gDBMgDCqoEyAFP0EC2FSEYx70zuAUppUfEkYi_mOxY9ayL2TsEqmuwqQ2uR52X5F8mREDx148616YrlzJGcdfwasaotiQufJZQh_1P-F5EUxNcTrvVkGAoIHM-E6HcARQOzmMpiHURkEuWhENDfN2plBxHA5lui-nCj1tpA07TYASPOdBjxm-rT6PJyNg5mzjomgxxcY4JpG3rnZbC1TQ_an4StPQ5YOx-FCxGyY58dQA2TCk1vQwtBzqiGbOgOwWxy0tPKdPvQ51LcGX2i_nxJ8AEyNr865sEiAWjkqTnR5IFCQgTaAF47fX5BqAGboAHncjYB4gHAZAHAqgHgqqxAqgHhAioB6jSG6gHtgeoB-DPG6gH6dQbqAeMzRuoB7HcG6gHpJqxAqgHkZ-xAqgHsJuxAqgH36GxAqgHpqqxAqgHgcYbqAerxRuoB-PZG6gHt6mxAqgH6auxApIIC0FBQUFBQUFBQUFB0ggYCIDAgEAQAhgAMgSBgoAOOgeAgICAgIEEyAkAugs-CAIQBRgWIAgoATADQAFIAFABWCVgAGgAcAGIAQCYAQGiARIKAggBKAH4AQGQAgKoAgXAAgLYAQGAAgGIAgW4E____________wGwFALAFYGAgECKFwoIAxgBKAEwATgBoBcBqReJBEg1yjlletIXDhIK7E7vTqtctFyTaRhu&sigh=f6Ah-ilTPVs&cid=CAESD-D2saJYt_ikQ_sicNcKDQ").search).get("ai")};
	const xx="https://i.ytimg.com/vi/OAIqCpqszVw/hqdefault.jpg?sqp=-oaymwE1CKgBEF5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AH-CYAC0AWKAgwIABABGB8gZShWMA8=&rs=AOn4CLCpqrflce1_k2te4K_5kNbCpjCm6Q";
	let vv=create_from_parse(xx);
	type rt={
		"hash": "",
		"host": "i.ytimg.com",
		"hostname": "i.ytimg.com",
		"href": "https://i.ytimg.com/vi/OAIqCpqszVw/hqdefault.jpg?sqp=-oaymwE1CKgBEF5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AH-CYAC0AWKAgwIABABGB8gZShWMA8=&rs=AOn4CLCpqrflce1_k2te4K_5kNbCpjCm6Q",
		"origin": "https://i.ytimg.com",
		"password": "",
		"pathname": "/vi/OAIqCpqszVw/hqdefault.jpg",
		"port": "",
		"protocol": "https:",
		"search": "?sqp=-oaymwE1CKgBEF5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AH-CYAC0AWKAgwIABABGB8gZShWMA8=&rs=AOn4CLCpqrflce1_k2te4K_5kNbCpjCm6Q",
		"searchParams": URLSearchParams;
	};
	let rt_u: rt=vv;
	rt_u;
	type ru=Decay<ParseUrlParams<rt['search']>>;
	let ru_v: ru={};
	ru_v;
	console.log("rs",get_url_params(vv.search,"rs"));
	console.log("sqp",get_url_params(vv.search,"sqp"));
}

do_test_url_parse_test_0();
