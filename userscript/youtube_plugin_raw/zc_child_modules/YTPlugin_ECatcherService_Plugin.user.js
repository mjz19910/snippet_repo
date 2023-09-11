// ==UserScript==
// @name	YTPlugin ECatcherService Plugin
// @namespace	https://github.com/mjz19910/
// @version	0.1.1
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2020-2023
// @match	https://www.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_ECatcherService_Plugin.user.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_ECatcherService_Plugin.user.js
// ==/UserScript==

let page_require=typeof require==="undefined"? __module_require__:require,delete_require=false,reset_require=false;
if(typeof require==="undefined"||page_require!==__module_require__)
{
	delete_require=typeof require==="undefined";
	require=__module_require__;
	reset_require=true;
}
const {do_export}=require("../../base_require_raw/BaseRequire.user");
const {BaseService}=require("./YTPlugin_Base.user");

const __module_name__="mod$ECatcherService";
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {do_export(fn,flags,exports,__module_name__);}
export_(exports => {exports.__is_module_flag__=true;});
class ECatcherService extends BaseService
{
	/** @type {number[]} */
	static known_experiments=[
		[1714247],
		[4957635,9405964],
		[23804281,23848210,23848211,23882502],
		[23918597,23934970,23946420,23966208,23983296,23986033,23998056],
		[24002022,24002025,24004644,24007246,24034168,24036947,24059444,24059508,24077241,24080738],
		[24108447,24120820,24124511,24128088,24135310,24140247,24161116,24162919,24164186,24166867,24169501,24181174,24187043,24187377,24197450],
		[24200839],/*/2420(\d{4})/*/
		[24211178,24217535,24219381,24219713],/*/2421(\d{4})/*/
		[24235780],/*/2422(\d{4})/*/
		[24241378,24248091],/*/2424(\d{4})/*/
		[24250324,24255163,24255543,24255545],/*/2425(\d{4})/*/
		[24260378,24262346,24263796,24267564,24268142],/*/2426(\d{4})/*/
		[24279196],/*/2427(\d{4})/*/
		[24281896,24281897,24283015,24283093,24287604,24288442,24288663,24288664],/*/2428(\d{4})/*/
		[24290971,24291857,24292955,24294553],/*/2429(\d{4})/*/
		[24390675,24396645],/*/243(\d{5})/*/
		[24401504,24402891,24404640,24406313,24406621,24407190,24407191,24408888,24409417],/*/2440(\d{4})/*/
		[24412855,24412856,24414718],/*/2441(\d{4})/*/
		[24415864,24415866,24416290,24419549],
		[24422508,24424806,24424807,24426636,24428818,24429095],/*/2442(\d{4})/*/
		[24430079,24430382,24432597,24433679,24434209,24436009,24437575,24437577,24438162,24438848,24439361,24439483],/*/2443(\d{4})/*/
		[24440132,24440302,24440901,24440903,24441239,24441240,24441244,24442137,24443373,24440519,24445230],/*/2444(\d{4})/*/
		[24447336,24447748,24447992],
		[24448074,24448245,24448246,24448383,24449113],
		[24450199,24450200,24450366,24450367,24450571,24451033,24451319,24451320,24451434,24451438,24452012,24452410,24453129,24453162],/*/2445(\d{4})/*/
		[24453859,24453860,24453874,24453942,24454001,24454357,24454363,24454920,24455284,24455878,24455879,24456451,24456736,24457195],
		[24457196,24457611,24457612,24457638,24457969,24458317,24458318,24458324,24458325,24458329,24458330,24458456,24458634,24458839],
		[24463911,24463912,24465011,24466371,24466827,24466859,24468690,24468724],/*/2446(\d{4})/*/
		[24465486],
		[24470281,24473090,24473107,24470280,24473091,24474437,24474438,24476774,24477147,24477317,24477512,24478150,24478762,24478802],/*/2447(\d{4})/*/
		[24481213,24481771,24482080,24482557,24482558,24482828,24482876,24482877,24483085,24483504,24483766],/*/2448(\d{4})/*/
		[24484079,24484158,24485239,24485791,24486982,24487104],
		[24486981,24487048,24487523],
		[24489232],
		[24491070,24491431,24491863,24492030,24494067,24494197,24495841],/*/2449(\d{4})/*/
		[24590921,24591046,24591048],/*/245(\d{5})/*/
		[24612269,24613467,24613789,24614043,24615363,24615479,24615664,24615733],/*/246(\d{5})/*/
		[39321826,39321827,39322504,39322574,39322870,39322873,39322953,39322980,39322983],/*/(?:39321\d{3}|39322\d{3})/*/
		[39323013,39323016,39323020,39323023,39323074,39323074,39323117,39323120,39323338],/*/(?:39323\d{3})/*/
		[45686551],
		// new
		[24474986,24477228,24482081,24485421,24488188,24493736,24495060,24496739,24496968,24498927,24499415,24499417,24499792],
		[24510798,24512929,24515366,24516063,24516157,24517587,24518452,24519143],
	].flat();
	data={
		/** @private @type {{name:import("../yt_json_types/r/group_R.js").RC_ECatcherClientName['value'];fexp:number[];version:import("../yt_json_types/r/group_R.js").RC_SomeVer<import("../yt_json_types/r/group_R.js").RC_CsiVarTypes["cver"]>}|null} */
		client: null,
		expected_client_values: {fexp: ECatcherService.known_experiments},
	};
	/** @private @type {number[]} */
	seen_new_expected=[];
	/** @api @public @arg {number[]} x */
	iterate_fexp(x)
	{
		let expected=this.data.expected_client_values.fexp;
		/** @private @type {number[]} */
		let new_expected=[];
		x.forEach(e =>
		{
			if(expected.includes(e))
				return;
			if(this.seen_new_expected.includes(e))
				return;
			this.seen_new_expected.push(e);
			new_expected.push(e);
		});
		if(new_expected.length>0) this.log_new_experiments(new_expected);
	}
	/** @arg {[number[]]} experiments_arr_log_args */
	log_new_experiments(...experiments_arr_log_args)
	{
		let [arg]=experiments_arr_log_args;
		var do_new_fexp_expected_many=false;
		if(do_new_fexp_expected_many)
		{
			console.log(`-- [new_fexp_expected_many] --\n\n[%s],`,arg.join());
			this.data.expected_client_values.fexp;
		}
	}
	/** @api @public @arg {RC_ECatcher_SPs["params"]} params */
	on_params(params)
	{
		/** @private @type {NonNullable<this["data"]["client"]>} */
		let new_client={};
		for(let param of params)
		{
			switch(param.key)
			{
				case "client.version": new_client.version=param.value; break;
				case "client.name": new_client.name=param.value; break;
				case "client.fexp": new_client.fexp=param.value.split(",").map(e => parseInt(e,10)); break;
				default: console.log("[new_param_part]",param); debugger;
			}
		}
		let prev_client=this.data.client;
		if(!prev_client)
			return this.update_client(new_client);
		this.data.client={...this.data.client,...new_client};
		let client=this.data.client;
		this.iterate_fexp(client.fexp);
		if(prev_client.name!==this.data.client.name) {console.log({name: prev_client.name},{name: this.data.client.name});}
	}
	/** @private @arg {NonNullable<this["data"]["client"]>} client */
	update_client(client) {this.data.client=client;}
}
export_(exports => {exports.ECatcherService=ECatcherService;});
export_(exports => exports.__module_loaded__=true);
if(delete_require)
{
	delete window.require;
} else if(reset_require)
{
	require=page_require;
}
