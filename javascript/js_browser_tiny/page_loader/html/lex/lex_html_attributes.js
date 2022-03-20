/**
 * @param {string} param
 */
export function lex_html_attributes(param) {
	let attr_arr=[];
	let xs=0,x=0;
	for(;x<param.length;x++){
		switch(param[x]){
			case "\"":
				x++;
				while(param[x] != "\"" && x < param.length)x++;
				x++;
				attr_arr.push(param.slice(xs, x));x++;xs=x;
				break;
			case " ":attr_arr.push(param.slice(xs, x));x++;xs=x;break;
		}
	}
	if(xs < param.length) {
		attr_arr.push(param.slice(xs));
	}
	let np=[];
	for(let j of attr_arr){
		let idx=j.indexOf("=");
		if(idx == -1){
			np.push({
				a:j
			});
			continue;
		}
		np.push({
			a:j.slice(0,idx),
			b:j.slice(idx+1),
		})
	}
	if(np.length>0 || attr_arr.length>0){
		//debugger;
	}
	return np;
}
