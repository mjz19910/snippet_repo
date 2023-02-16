// ==UserScript==
// @name         Exponential Madness auto
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://thetastypi.github.io/Exponential-Madness/
// @grant        none
// ==/UserScript==
// @ts-nocheck

(function() {
	'use strict';
	var olf=function(){
			document.querySelector("#number").style.fontSize="24px"
			var game=window.game;
			var achievement=Function("return achievement")();
			setInterval(function(){
					let num = game.number.log10().log10();
					num.mag = num.mag*0.99999;
					let startCost = game.reset.cost.log10().log10();
					if (num.greaterThanOrEqualTo(startCost)) {
							let baseCost = game.reset.baseCost.log10().log10();
							let costChange = num.sub(startCost);
							let scaling = game.reset.costScaling.log10().mul(2);
							let startIncrease = game.reset.costIncrease.log10();
							let endIncrease = startIncrease.pow(2).add(scaling.mul(costChange).mul(2)).sqrt();
							let increaseChange = endIncrease.sub(startIncrease);
							let buyAmount = increaseChange.div(scaling).add(1).floor();
							game.reset.amount = game.reset.amount.add(buyAmount);
							game.permaStat.totalReset = game.permaStat.totalReset.add(buyAmount);
							achievement.reset.complete();
							window.calcReset();
							game.plexal.resetted = true;
					}
			},3000)
	}
	if(document.querySelector("#number")){
			olf()
	}else{
			window.onload=olf
	}
	// Your code here...
})();