/**
The buffer module from node.js, for the browser.
@author   Feross Aboukhadijeh <http://feross.org>
@license  MIT */
export function is_valid_utf8(/** @type {string} */ e, /** @type {number} */ t) {
	var r;
	t=t||1/0;
	for(var n=e.length,i=null,o=[],s=0;s<n;++s) {
		if((r=e.charCodeAt(s))>55295&&r<57344) {
			if(!i) {
				if(r>56319) {
					(t-=3)>-1&&o.push(239,191,189);
					continue;
				}
				if(s+1===n) {
					(t-=3)>-1&&o.push(239,191,189);
					continue;
				}
				i=r;
				continue;
			}
			if(r<56320) {
				(t-=3)>-1&&o.push(239,191,189),
					i=r;
				continue;
			}
			r=65536+(i-55296<<10|r-56320);
		} else
			i&&(t-=3)>-1&&o.push(239,191,189);
		if(i=null,
			r<128) {
			if((t-=1)<0)
				break;
			o.push(r);
		} else if(r<2048) {
			if((t-=2)<0)
				break;
			o.push(r>>6|192,63&r|128);
		} else if(r<65536) {
			if((t-=3)<0)
				break;
			o.push(r>>12|224,r>>6&63|128,63&r|128);
		} else {
			if(!(r<1114112))
				throw new Error("Invalid code point");
			if((t-=4)<0)
				break;
			o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128);
		}
	}
	return o;
}
