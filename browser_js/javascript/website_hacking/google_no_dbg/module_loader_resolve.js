{
	let _a=a;
	let _b=b;
	{
		let a=_a;
		let b=_b;
		let c=[];
		let args=[a,b];
		args;
		for(let d=0;d<a.length;d++) {
			let e,f,acc=[];
			f;
			e=a[d];
			let idx=e.indexOf(':');
			if(idx>-1) {
				acc.push(e.slice(0,idx),e.slice(idx+1));
			} else {
				acc.push(e);
			}
			c.push([...acc]);
		}
		/** @arg {any[]} arr @arg {any[]} val */
		function fix_ref(arr,val) {
			let nc=0;
			if(val.length==1)
				return -1;
			if((val.indexOf(','))<0) {
				val[1]=arr[parseInt(val[1][0],36)];
				return -1;
			}
			while(nc++<32) {
				return val.indexOf(',');
			}
			return -1;
		}
		for(let j=0;j<c.length;j++) {
			fix_ref(c,c[j]);
		}
		let asa=new Set(c);
		for(let i=0;i<c.length;i++) {
			for(let ccq=c[i],q=1;q<ccq.length;q++) {
				asa.delete(ccq[q]);
			}
		}
		window.__c_arr=c;
		window.__asa=asa;
	}
}
