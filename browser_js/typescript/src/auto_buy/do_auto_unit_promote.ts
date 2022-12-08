// do_auto_unit_promote
declare global {
	interface Window {
		arUnit: any[];
		Get_Unit_Type(v: any): any;
		getUnitPromoCost(v: any): number;
		Find_ToNext(v: number): number;
		_targets_achi: any[];
		totalAchi(): number;
		_targets: any[];
		mainCalc(v: any): void;
		tonext(v: number): void;
	}
}

export function do_auto_unit_promote() {
	var out=[],maxed=[];
	for(var k=0;k<window.arUnit.length;k++) {
		var afford=false;
		if(window.arUnit[k][16]==true||k==0) {
			var type=window.Get_Unit_Type(k);
			var tmp=window.getUnitPromoCost(k);
			var cost=tmp;
			var next=window.Find_ToNext(k);
			if(next<0) {maxed[k]=true;}
			for(var i=1;i<=100;i++) {
				if(window.totalAtome>=cost) {
					tmp=tmp+(tmp*window.arUnit[k][3])/100;
					var tar=(window.arUnit[k][4]*1)+i;
					var a=window._targets.indexOf(tar);
					var reduction=1;
					if(a>-1&&tar<=1000) {
						var b=true;
						for(var k2 in type[2]) {
							var v2=type[2][k2];
							if(v2!=k&&window.arUnit[v2][4]<tar) {
								b=false;
							}
						}
						if(b) {
							var c=window._targets_achi.indexOf(window.totalAchi()+1);
							if(c>-1) {
								reduction*=(1-((c+1)*0.01));
							}
							reduction*=1-((a+1)*0.01);
						}
					}
					tmp*=reduction;
					cost+=tmp;
				} else {
					break;
				}
				if(i==next||(maxed[k]&&i==100)) {
					afford=true;
				}
			}
			if(afford) {
				out[k]=true;
			} else {
				out[k]=false;
			}
		}
	}
	let res=out.lastIndexOf(true);
	if(res<0)
		return;
	if(maxed[res]) {
		for(var y=0;y<100;y++) {
			window.mainCalc(res);
		}
	} else {
		window.tonext(res);
	}
}
