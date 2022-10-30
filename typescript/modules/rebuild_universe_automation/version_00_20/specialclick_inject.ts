export function specialclick_inject(that: number) {
	let allspec=window.allspec
	let totalAtome=window.totalAtome
	let atomsinvest=window.atomsinvest
	let doc=window.doc
	let gritter=window.gritter
	let specialsbought=window.specialsbought,noti=window.noti
	let rounding=window.rounding,calcDiff=window.calcDiff,arUnit=window.arUnit,atomepersecond=window.atomepersecond
	let arrayNames=window.arrayNames,plurials=window.plurials,toTitleCase=window.toTitleCase
	let updateprogress=window.updateprogress,seeUnit=window.seeUnit,checkspec=window.checkspec,achiSpec=window.achiSpec
	if(allspec[that].done==undefined)
		allspec[that].done=false
	if(allspec[that].cost<=totalAtome&&allspec[that].done==false) {
		let specialsbought_e=doc.getElementById('specialsbought')
		if(specialsbought_e)
			specialsbought_e.innerText=rounding(++specialsbought,false,0)
		if(that==74) {
		}
		atomsinvest+=allspec[that].cost
		let atomsinvest_e=doc.getElementById("atomsinvest")
		if(atomsinvest_e)
			atomsinvest_e.innerText=rounding(atomsinvest,false,0)
		allspec[that].done=true
		totalAtome-=allspec[that].cost
		var diff1=calcDiff(that)
		for(var a in arUnit[that][17])
			arUnit[that][17][a]*=100
		arUnit[that][5]*=100
		var spec_aps=0
		if(arUnit[that][4]>0) {
			spec_aps=(calcDiff(that)-diff1)
			atomepersecond+=spec_aps
		}
		//spell:ignore noti plurials
		if(noti)
			gritter('Power-up !',toTitleCase(plurials(arrayNames[that]))+" X100 APS",null,"+"+rounding(spec_aps,false,0)+" APS","")
		//spell:ignore updateprogress
		updateprogress(that)
		$('#spec'+that).remove();
		(that<74)? seeUnit(that+1):seeUnit(that-1)
		seeUnit(that)
		//spell:ignore checkspec
		checkspec()
		//spell:ignore achiSpec
		achiSpec()
	}
	window.totalAtome=totalAtome
	window.atomsinvest=atomsinvest
	window.atomepersecond=atomepersecond
	window.specialsbought=specialsbought
}
