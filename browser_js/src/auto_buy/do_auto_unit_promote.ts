// do_auto_unit_promote
export type Typeof_arUnit=[unknown,unknown,unknown,number,number,number,unknown,unknown,unknown,unknown,unknown,unknown,unknown,unknown,unknown,unknown,boolean,number[]][];
declare global {
	export interface Window {
		arUnit: Typeof_arUnit;
		Get_Unit_Type(v: unknown): unknown;
		getUnitPromoCost(v: unknown): number;
		Find_ToNext(v: number): number;
		_targets_achi: unknown[];
		totalAchi(): number;
		_targets: unknown[];
		mainCalc(v: unknown): void;
		tonext(v: number): void;
	}
}

export function do_auto_unit_promote() {
	const out=[],maxed=[];
	for(let k=0;k<window.arUnit.length;k++) {
		let afford=false;
		if(window.arUnit[k][16]==true||k==0) {
			const type=window.Get_Unit_Type(k);
			let tmp=window.getUnitPromoCost(k);
			let cost=tmp;
			const next=window.Find_ToNext(k);
			if(next<0) {maxed[k]=true;}
			for(let i=1;i<=100;i++) {
				if(window.totalAtome>=cost) {
					tmp=tmp+(tmp*window.arUnit[k][3])/100;
					const tar=(window.arUnit[k][4]*1)+i;
					const a=window._targets.indexOf(tar);
					let reduction=1;
					if(a>-1&&tar<=1000) {
						let b=true;
						for(const k2 in type[2]) {
							const v2=type[2][k2];
							if(v2!=k&&window.arUnit[v2][4]<tar) {
								b=false;
							}
						}
						if(b) {
							const c=window._targets_achi.indexOf(window.totalAchi()+1);
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
	const res=out.lastIndexOf(true);
	if(res<0)
		return;
	if(maxed[res]) {
		for(let y=0;y<100;y++) {
			window.mainCalc(res);
		}
	} else {
		window.tonext(res);
	}
}
