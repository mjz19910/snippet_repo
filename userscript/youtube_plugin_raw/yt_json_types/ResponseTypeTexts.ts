namespace ResponseTypeTexts {
	type VV=ResponseTypes['type'] extends infer U? PageTypeList[number]&U:never;
	const vvq: PageTypeList=as_cast([] as any[]);
	function ttq(x: VV) {
		for(let i=0;i<vvq.length;i++) {
			vvq[i]=x;
		}
	}
	ttq("browse");
}
