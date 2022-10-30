export function do_auto_unit_promote() {
	let arUnit = window.arUnit;
	let Get_Unit_Type = window.Get_Unit_Type;
	let getUnitPromoCost = window.getUnitPromoCost;
	let Find_ToNext = window.Find_ToNext;
	let totalAtome = window.totalAtome;
	let _targets = window._targets;
	let _targets_achi = window._targets_achi;
	let totalAchi = window.totalAchi;
	let mainCalc = window.mainCalc;
	let tonext = window.tonext;
	var out = [], maxed = [];
	for(var k = 0; k < arUnit.length; k++) {
		var afford = false;
		if(arUnit[k][16] == true || k == 0) {
			var type = Get_Unit_Type(k);
			var tmp = getUnitPromoCost(k);
			var cost = tmp;
			var next = Find_ToNext(k);
			if(next < 0) {maxed[k] = true;};
			for(var i = 1; i <= 100; i++) {
				if(totalAtome >= cost) {
					tmp = tmp + (tmp * arUnit[k][3]) / 100;
					var tar = (arUnit[k][4] * 1) + i;
					var a = _targets.indexOf(tar);
					var reduction = 1;
					ib: if(a > -1 && tar <= 1000) {
						for(var k2 in type[2])
							if(type[2][k2] != k && arUnit[type[2][k2]][4] < tar)
								break ib;
						var c = _targets_achi.indexOf(totalAchi() + 1);
						if(c > -1)
							reduction *= (1 - ((c + 1) * 0.01));
						reduction *= 1 - ((a + 1) * 0.01);
					}
					tmp *= reduction;
					cost += tmp;
				} else
					break;
				if(i == next || (maxed[k] && i == 100))
					afford = true;
			}
			if(afford)
				out[k] = true; else
				out[k] = false;
		}
	}
	let res = out.lastIndexOf(true);
	if(res < 0)
		return;
	if(maxed[res])
		for(var y = 0; y < 100; y++)
			mainCalc(res); else
		tonext(res);
}
