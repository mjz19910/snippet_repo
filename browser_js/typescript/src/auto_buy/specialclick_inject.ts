declare global {
	interface Window {
		specialsbought: number;
		atomsinvest: number;
		calcDiff(v: number): number;
		noti: boolean;
		gritter: any;
		toTitleCase(v: string): string;
		plurials(v: string): string;
		arrayNames: string[];
		updateprogress(v: any): void;
		seeUnit(v: number): any;
		checkspec(): void;
		achiSpec(): void;
	}
}

export function specialclick_inject(that: number) {
	if(window.allspec[that].done==undefined)
		window.allspec[that].done=false;
	if(window.allspec[that].cost<=window.totalAtome&&window.allspec[that].done==false) {
		let specialsbought_e=window.doc.getElementById('specialsbought');
		let atomsinvest_e=window.doc.getElementById('atomsinvest');
		if(!specialsbought_e||!atomsinvest_e)
			throw new Error("Invalid");
		specialsbought_e.innerText=window.rounding(++window.specialsbought,false,0);
		window.atomsinvest+=window.allspec[that].cost;
		atomsinvest_e.innerText=window.rounding(window.atomsinvest,false,0);
		window.allspec[that].done=true;
		window.totalAtome-=window.allspec[that].cost;
		var diff1=window.calcDiff(that);
		for(var a in window.arUnit[that][17])
			window.arUnit[that][17][a]*=100;
		window.arUnit[that][5]*=100;
		var spec_aps=0;
		if(window.arUnit[that][4]>0) {
			spec_aps=(window.calcDiff(that)-diff1);
			window.atomepersecond+=spec_aps;
		}
		if(window.noti)
			window.gritter('Power-up !',window.toTitleCase(window.plurials(window.arrayNames[that]))+" X100 APS",null,"+"+window.rounding(spec_aps,false,0)+" APS","");
		window.updateprogress(that);
		$('#spec'+that).remove();
		if(that<74) window.seeUnit(that+1);
		else window.seeUnit(that-1);
		window.seeUnit(that);
		window.checkspec();
		window.achiSpec();
	}
}
