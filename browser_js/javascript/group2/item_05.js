x:{
	if(!('temp1' in window)) {
		if(queryObjects) {
			console.log("please export the queryObjects result as temp1");
			queryObjects(Function.prototype);
		} else {
			console.log("please open the console/devtools");
		}
		break x;
	}
	/** @arg {any} v */
	function any(v) {return v;}
	/** @type {({__type: string}|{})[]} */
	let temp1=any(window.temp1);
	if(!("_YC3" in window)) {
		console.log("Missing constructor (_YC3) to find");
		break x;
	}
	let _YC3=any(window._YC3);
	/** @arg {typeof temp1[0]} e @returns {e is {__type: string}} */
	function only_with_type(e) {
		return '__type'in e;
	}
	let has_type_arr = temp1.filter(only_with_type);
	let target_map=new Map;
	/** @arg {{__type: string }|{ __type: string; __q2:string; _qi2: string; }} object */
	function inspect_object(object) {
		if(Object.getPrototypeOf(object).constructor === _YC3) {
			if("__q2" in object) {
				console.log('%o :: id: %o %o %o', object.__type, object.__q2, object._qi2, object);
			} else {
				console.log('miss: %o %o', object.__type, object);
			}
		} else {
			console.log('type: %o %o', object.__type, object);
		}
	}
	for(let i=0;i<300;i++){
		inspect_object(has_type_arr[i]);
	}
	console.log(target_map);
}
