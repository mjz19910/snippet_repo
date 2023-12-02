// ==UserScript==
// @name         Fission-Simulator userscript(broken)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://redfire75369.github.io/Fission-Simulator/
// @grant        none
// ==/UserScript==
// @ts-nocheck

(function() {
	let st_func;
	setTimeout(st_func=function() {
		var t=this;
		t.getNanitesOnPrestige=function() {
			let ret=player.reactor.amount[7].pow(2/3).mul(log(player.reactor.bought[7]/10+1,5)).mul(sqrt(2));
			if(player.nanites.ups[11]>=1) {
				ret=ret.mul(player.meteor.shower/5);
			}
			if(player.nanites.total.gt(0)) {
				ret=ret.sub(player.nanites.total.div(16));
			}
			//ret = ret.sub(player.nanites.total);
			if(ret.gt(0)) {
				return ret;
			} else {
				return new Decimal(0);
			}
		};
		var cint_mm=setInterval(e => buyMaxMeteor(),10000);
		var cint_mr=setInterval(e => buyMaxAllReactorEff(),500);
	},1000);
	var rcode_get=function(e) {return e.raw[0];};
	var rcode=rcode_get`let naniteUpCost = {
	0: new Decimal(1),
	11: new Decimal(2),
	21: new Decimal(1),
	22: new Decimal(2),
	31: new Decimal(1),
	32: new Decimal(2),
	41: new Decimal(3),
	42: new Decimal(4),
    usm:1
};
let naniteUpList = [0, 11, 21, 22, 31, 32, 41, 42];

function resetNaniteUps() {
	player.nanites.ups = getDefaultData().nanites.ups;
	player.nanites.effUpCost = getDefaultData().nanites.effUpCost;
	player.eff.multMult = getDefaultData().eff.multMult;
}
function canBuyNaniteUp(id) {
	if (id == 0) {
		let boughtAll = true;
		for (let up = 1; up < player.nanites.ups.length; up++) {
			if (player.nanites.ups[up] != 1) {
				boughtAll=false;
			}
		}
		if (boughtAll) {
			return player.nanites.nanites.gte(player.nanites.effUpCost);
		} else if (player.nanites.ups[0] < 2) {
			return player.nanites.nanites.gte(player.nanites.effUpCost);
		} else {
			return false;
		}
	}
	return (player.nanites.nanites.gte(naniteUpCost[id]));
}

function buyNaniteUp(id) {
	if (canBuyNaniteUp(id)) {
		if (id == 0) {
			player.nanites.nanites = player.nanites.nanites.sub(player.nanites.effUpCost);
			player.nanites.ups[0] += 1;
			if (player.nanites.ups[0] >= 2 & player.nanites.ups[0]) {
				player.nanites.effUpCost = player.nanites.effUpCost.add(1);
			}
			let effUpg = player.nanites.ups[0];
			if (effUpg <= 2) {
				player.eff.multMult = new Decimal(1.1 + 0.02 * effUpg);
			} else {
				player.eff.multMult = new Decimal(1.25).mul(new Decimal(1.036).pow(effUpg - 2));
			}
		} else if (id == 41) {
			player.nanites.nanites = player.nanites.nanites.sub(naniteUpCost[41]);
			player.meteor.meteorMult = new Decimal(2.2);
			player.nanites.ups[id] += 1;
		} else {
			player.nanites.nanites = player.nanites.nanites.sub(naniteUpCost[id]);
			player.nanites.ups[id] += 1;
		}
	}
}

function getNaniteUpMult(id) {
	if (player.nanites.ups[id] == 0) {
		return [9, new Decimal(1)];
	}
	switch(id) {
		case 11:
			return [9, new Decimal(max(1, player.meteor.shower / 5))]
		case 21:
			return [8, new Decimal(max(1, log(player.time, 16) - 1))];
		case 22:
			if (player.meteor.shower <= 13) {
				return [8, new Decimal(max(1, log(player.meteor.shower, 10) ** player.meteor.shower))];
			} else {
				return [8, new Decimal(max(1, (player.meteor.shower - 9) * (log(player.meteor.shower, 8) ** 0.5)))];
			}
		case 31:
			return [8, Decimal.max(1, new Decimal(player.energy.log(25)).div(75).pow(2))];
		case 32:
			return [8, Decimal.max(1, new Decimal(player.totalEnergy.log(25)).div(75).pow(2))];
		case 42:
			return [8, new Decimal(player.nanites.total.log(1.1))];
		default:
			return [9, new Decimal(1)];
	}
}

function getTotalNaniteUpMult(tier) {
	let ret = new Decimal(1);
	for (let id in naniteUpList) {
		if (player.nanites.ups[id] >= 1) {
			if (getNaniteUpMult(id)[0] == tier | getNaniteUpMult(id)[0] == 8) {
				ret.mul(getNaniteUpMult(id)[1]);
			}
		}
	}
	return ret;
}

function updateUINaniteUps() {
	document.getElementById("nanites").innerText = notation(player.nanites.nanites);
	if (player.nanites.ups[11] == 0) {
		document.getElementById("naniteupformula11").innerHTML = "√(2) * x<sup>2/3</sup> * log<sub>5</sub>(x / 10 + 1)";
	} else {
		document.getElementById("naniteupformula11").innerHTML = "√(2) * x<sup>2/3</sup> * log<sub>5</sub>(x / 10 + 1) * (m / 5)";
	}
	if (player.meteor.shower <= 13) {
		document.getElementById("naniteupformula22").innerHTML = "(log<sub>10</sub>(x))<sup>x</sup>"
	} else if (player.meteor.shower > 13) {
		document.getElementById("naniteupformula22").innerHTML = "(x - 9) * log<sub>8</sub>(x)<sup>0.5</sup>"
	}
	let id = 0;
	for (let i = 0; i < naniteUpList.length; i++) {
		id = naniteUpList[i];
		if (id != 0 & id != 41) {
			document.getElementById("naniteupmult" + id).innerText = notation(getNaniteUpMult(id)[1]);
		}
		if (player.nanites.ups[id] == 1 & id != 0) {
			document.getElementById("naniteup" + id).className = "naniteupgbtnbought";
		} else {
			document.getElementById("naniteup" + id).className = canBuyNaniteUp(id) ? "naniteupgbtnbuy" : "naniteupgbtnlocked";
		}
	}
}//# sourceURL=https://redfire75369.github.io/Fission-Simulator/javascripts/core/nanites/upgrades_us.js`;
	return;
	var j={};
	var xeval=Function("j","j.ev=eval;return j.ev")(j);
	var setInterval_r=setInterval;
	window.setInterval=function(f,t) {(0,j.ev(rcode)); window.setInterval=setInterval_r; return setInterval_r(f,t);};
	// Your code here...
})();