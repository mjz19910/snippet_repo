// cspell:words mlay mlayjson tetr
function bulkPrestige() {
	var jv
	if(game.max_layer.cache) {
		jv=game.mlj
	} else {
		jv=game.mlj=JSON.stringify(game.max_layer)
	}
	var gp=game.prestige
	let p=gp[jv].points
	let pow=gp[jv].power.div(10).floor()
	let m=game.max_layer[0]
	var mx
	var mlay
	if(game.state==1) {
		var mx=m.tetr(2).floor()
		let gain=n(10).pow(getPrestigeGain2(p,mx))
		var mlay=[mx]
		mlay.cache=1
		var mlayjson=game.mlj=JSON.stringify(mlay)
		gp[mlayjson]=new Layer(mlay,gain.mul(10),pow)
		game.max_layer=mlay
	}
}
