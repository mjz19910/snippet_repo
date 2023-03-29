/** @arg {string} s */
function split_tags(s) {
	var t=""
	/** @type {([1,string]|[0,string])[]} */
	var res=[]
	while(s.length>0) {
		if(s[0]=="<") {
			if(t!="") {
				res.push([1,t])
				t=""
			}
			s=s.slice(1)
			while(s[0]!=">") {
				t+=s[0]
				s=s.slice(1)
			}
			res.push([0,t])
			t=""
		} else {
			t=t+s[0]
		}
		s=s.slice(1)
	}
	return res
}
function main() {
	let ar=split_tags(document.documentElement.innerHTML);
	/** @type {([string,0|1,number])[]} */
	let ar_1=ar.map(
		(e,n) => [e[1],e[0],n]
	);
	/** @type {([string,0|1,number])[]} */
	let ar2=ar.slice(
		ar_1.filter(
			e => e[0].match("class=\"text"))[0][2]
		).map(
			(e,n) => [e[1],e[0],n]
	)
	let find_r=ar2.find(e => e[0].match("greentext"));
	if(!find_r) return null;
	//cspell:ignore greentext
	let target=ar2[find_r[2]+2][0].split(";").pop()
	return target;
}
