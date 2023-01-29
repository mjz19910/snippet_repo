const __module_name__="mod$ECatcherService";
const store=required(window.__plugin_modules__);
const as=required(required(store["mod$YoutubePluginBase"]).as);
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn) {
	/** @typedef {typeof exports} ExportsT */
	if(typeof exports==="object") {
		fn(exports);
	} else {
		window.__plugin_modules__??={};
		let all_modules=window.__plugin_modules__;
		/** @type {ExportsT} */
		let exports=as({});
		all_modules[__module_name__]=exports;
		fn(as(exports));
	}
}
export_(exports => {
	exports.__is_module_flag__=true;
});
const base_store=required(store.mod$YoutubePluginBase);
const is_firefox=base_store.is_firefox;
const BaseService=base_store.BaseService;
const Services=required(store.mod$LoadServices?.Services);
/** @extends {BaseService<Services,ServiceOptions>} */
class ECatcherService extends BaseService {
	data={
		/** @private @type {{name:RC_ECatcherClientName['value'];fexp:number[];version:RC_SomeVer<RC_CsiVarTypes["cver"]>}|null} */
		client: null,
		expected_client_values: {
			/** @private @type {number[]} */
			fexp: [
				[1714247],
				[9405964],
				[23804281,23848210,23882502],
				[23918597,23934970,23946420,23966208,23983296,23986033,23998056],
				[24002022,24002025,24004644,24007246,24034168,24036947,24059444,24059508,24077241,24080738],
				[24108447,24120820,24124511,24128088,24135310,24140247,24161116,24162919,24164186,24166867,24169501,24181174,24187043,24187377,24197450],
				[24200839,24211178,24217535,24219381,24219713,24241378,24248091,24250324,24255163,24255543,24255545,24260378,24262346,24263796,24267564,24268142,24279196,24281896,24283015,24283093,24287604,24288442,24288663,24288664,24290971,24291857,24292955,24390675,24396645],
				[24401504,24402891,24404640,24406313,24406621,24407190,24408888,24414718,24415864,24415866,24416290,24419549,24422508,24424806,24424807,24426636,24429095,24432597,24433679,24434209,24436009,24437575,24438162,24438848,24439361,24439483,24440901,24440903,24441244,24442137,24443373,24447336,24448074,24448246,24450199,24450571,24451033,24452012,24453129,24453162,24453860,24453874,24453942,24454357,24454363],
				[24590921,24591046,24591048],
				[24612269,24613467,24613789,24614043,24615363,24615479,24615664,24615733],
				[39321826,39321827,39322504,39322574,39322870,39322873,39322953,39322980,39322983,39323013,39323016,39323020,39323023,39323117,39323120],
				[45686551],
				[24440132,24449113,24450200,24453859,24454920,24458318,24458456],
				[24457196,24294553,24455879],
				[24457638],
			].flat(),
		},
	};
	/** @private @type {number[]} */
	seen_new_expected=[];
	/** @api @public @arg {number[]} x */
	iterate_fexp(x) {
		let expected=this.data.expected_client_values.fexp;
		/** @private @type {number[]} */
		let new_expected=[];
		x.forEach(e => {
			if(expected.includes(e))
				return;
			if(this.seen_new_expected.includes(e))
				return;
			this.seen_new_expected.push(e);
			new_expected.push(e);
		});
		if(new_expected.length>0) {
			if(is_firefox) {
				this.log_new_experiments(new_expected);
				return;
			}
			let fexp_log_val;
			if(new_expected.length>1) {
				fexp_log_val=new_expected;
			} else {
				fexp_log_val=new_expected[0];
			}
			if(fexp_log_val instanceof Array) {
				this.log_new_experiments(fexp_log_val);
				return;
			}
			this.log_new_experiments(fexp_log_val,"[%o]");
		}
	}
	/** @arg {[number|number[],string?]} experiments_arr_log_args */
	log_new_experiments(...experiments_arr_log_args) {
		let [arg,tags=""]=experiments_arr_log_args;
		console.log(`[new_fexp_expected]${tags}`,arg);
		this.data.expected_client_values.fexp;
	}
	/** @api @public @arg {RC_ECatcher_SPs["params"]} params */
	on_params(params) {
		/** @private @type {NonNullable<this["data"]["client"]>} */
		let new_client={};
		for(let param of params) {
			switch(param.key) {
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
		if(prev_client.name!==this.data.client.name) {
			console.log({name: prev_client.name},{name: this.data.client.name});
		}
	}
	/** @private @arg {NonNullable<this["data"]["client"]>} client */
	update_client(client) {
		this.data.client=client;
	}
}
export_(exports => {
	exports.ECatcherService=ECatcherService;
	exports.__module_loaded__=true;
});
