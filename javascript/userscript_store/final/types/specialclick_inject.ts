//spell:words specialsbought atomsinvest checkspec specaps noti plurials updateprogress achiSpec
export function specialclick_inject(that: number) {
	let allspec = window.allspec;
	let doc = window.doc;
	if(allspec[that].done == undefined)
		allspec[that].done = false;
	if(allspec[that].cost <= window.totalAtome && allspec[that].done == false) {
		let sb = doc.getElementById('specialsbought');
		if(!sb)
			throw new Error;
		sb.innerText = window.rounding(++window.specialsbought, false, 0);
		if(that == 74) {
		}
		window.atomsinvest += allspec[that].cost;
		let ae = doc.getElementById('atomsinvest');
		if(ae !== void 0 && ae !== null)
			ae.innerText = window.rounding(window.atomsinvest, false, 0);
		allspec[that].done = true;
		window.totalAtome -= allspec[that].cost;
		var diff1 = window.calcDiff(that);
		for(var a in window.arUnit[that][17])
			window.arUnit[that][17][a] *= 100;
		window.arUnit[that][5] *= 100;
		var specaps = 0;
		if(window.arUnit[that][4] > 0) {
			specaps = (window.calcDiff(that) - diff1);
			window.atomepersecond += specaps;
		}
		if(window.noti)
			window.gritter('Power-up !', window.toTitleCase(window.plurials(window.arrayNames[that])) + " X100 APS", null, "+" + window.rounding(specaps, false, 0) + " APS", "");
		window.updateprogress(that);
		window.$('#spec' + that).remove();
		(that < 74) ? window.seeUnit(that + 1) : window.seeUnit(that - 1);
		window.seeUnit(that);
		window.checkspec();
		window.achiSpec();
	}
}
