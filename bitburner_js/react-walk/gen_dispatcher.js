import {as_any} from "../net-fs/api/v100/as.js";

export function gen_dispatcher() {
	/** @arg {number} minified_error_id */
	function a(minified_error_id) {return "react mini-error: "+minified_error_id;}
	let eo={},Qi={dependencies: {}};
	let Ji={
		context: {},observedBits: 0,
		/** @type {{context:ReactContext,observedBits:number;next:null;}|null} */
		next: null
	};
	return {
		/** @arg {ReactContext} e @arg {undefined} t */
		useContext(e,t) {
			/** @returns {{context:typeof e,observedBits:number;next:null;}} */
			function get_t() {return as_any(t);}
			if(eo!==e&&!1!==t&&0!==t) {
				if('number'==typeof t&&1073741823!==t||(eo=e,
					// @ts-expect-error
					t=1073741823),
					// @ts-expect-error
					t={
						context: e,
						observedBits: t,
						next: null
					},null===Ji) {
					if(null===Qi)
						throw Error(a(308));
					Ji=get_t(),
						Qi.dependencies={
							lanes: 0,
							firstContext: t,
							responders: null
						};
				} else {
					Ji=Ji.next=get_t();
				}
			}
			return e._currentValue;
		}
	};
}
