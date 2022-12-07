function x() {
	var fmstr=t.toString()
	var fms2=fmstr.slice(0,fstr.indexOf("{}"[0]))
	var fmnb=fmstr.slice(fstr.indexOf("{}"[0]))
	var fmar=fms2.slice(fms2.indexOf("()"[0])).replace(/[()]/g,"").split(",")
	var idm_mod=fmar[0]
	var idm_imp=fmar[2]
	var fnm=fnb.replace(/[{}]/g,""),idx_load
	if(fnm.slice(fnm.indexOf(idm_mod+".exports=")+(idm_mod+".exports=").length).indexOf(idm_imp)==0) {
		idx_load=fnm.slice(11).replace(/[()]/g,"")
	}
	var fstr=ars[idx_load].toString()
	var fs2=fstr.slice(0,fstr.indexOf("{}"[0]))
	var fnb=fstr.slice(fstr.indexOf("{}"[0]))
	var argsar=fs2.slice(fs2.indexOf("()"[0])).replace(/[()]/g,"").split(",")
	var id_mod=argsar[0]
	var id_imp=argsar[2]
	var fnc=fnb.replace(/[{}]/g,"")
	var outar=[]
	fnc.split("()"[0]).map(e => e.split("()"[1])).forEach(e => e.forEach(e => outar.push(e)))
	var outar2=outar
	outar=[]
	outar2.map(e => e.split(",")).forEach(e => e.forEach(e => outar.push(e)))
	let sk_val=0
	// cspell:ignore APESTER
	let custom_string="window.APESTER.load"
	if(outar.indexOf(custom_string)>0) {
		sk_val=1
	}
	return {
		sk: sk_val,
		tv: function() {
			return {}
		},
		get_debug_data() {
			return {
				id_imp,
				id_mod,
				fmnb,
			}
		}
	}
}
