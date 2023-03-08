// ==UserScript==
// @name         Antimatter Dim auto
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://aarextiaokhiao.github.io/IvarK.github.io/
// @grant        none
// ==/UserScript==
// @ts-nocheck

(function() {
	'use strict';
	var run=function(){
			var t=window
			t.cint=setInterval((function(){
					var i;
					for (i=(t.player.replicanti.gal+Math.floor(t.player.replicanti.gal*0.5))-t.player.replicanti.galaxies;i;i--){t.replicantiGalaxy()}
			}),9);
			t.cint_slow=setInterval(function(){
					if(t.player.infinityPoints.lt("1e4000")){while(t.getRGCost().lt(t.player.infinityPoints)){t.upgradeReplicantiGalaxy()}}
					window.maxAllID()
			},50)
			var ge=t.gainedEternityPoints().l,dv=null,cn=0,en=0
			t.cint_ep=setInterval(function(){
					var player=t.player
					t.buyMaxEPMult()
					t.buyMaxTimeDimensions()
					t.maxTheorems();
					a:{
							break a;
							cn++;
							var nv=t.gainedEternityPoints().l;
							if(dv === null){
									dv=nv-ge
									console.log(dv)
									ge=nv
									break a
							}
							dv=((nv-ge)+dv)/2
							if((cn%10)==1)console.log(dv)
							if(dv < 0){
									dv=null
									break a
							}
							ge=nv
							var maybe_eter=false
							var dia_en=player.dilation.active
							var etn_en=!player.dilation.active
							if(dia_en && dv > 0 && dv < 0.0025){
									console.log("dil_act",t.getDilGain().div(player.dilation.tachyonParticles).root(player.dilation.tachyonParticles.l/100).toNumber())
									maybe_eter=true
							} else if(etn_en && dv > 0 && dv < (t.player.eternityPoints.l/250000)*0.6){
									var enum_dist=t.gainedEternityPoints().div(player.eternityPoints).root(player.eternityPoints.l/100).toNumber()
									if(enum_dist<700){
											ge=nv/5;
											dv=1;
											break a
									}
									console.log("etn_act",enum_dist)
									maybe_eter=true
							} else if (dia_en && t.getDilGain().div(player.dilation.tachyonParticles).root(player.dilation.tachyonParticles.l/100).toNumber() > 100){
									maybe_eter=true
							} else if (etn_en && t.gainedEternityPoints().div(player.eternityPoints).root(player.eternityPoints.l/100).toNumber() > 1000){
									maybe_eter=true
							}
							if(maybe_eter){
									ge=0
									dv=null
									en++
									var buyDilationUpgrade=t.buyDilationUpgrade;
									buyDilationUpgrade(11);
									buyDilationUpgrade(3);
									buyDilationUpgrade(1);
									buyDilationUpgrade(2);
									if(en > 7){
											en=0;
											t.startDilatedEternity();
											break a
									}
									t.eternity()
									break a
							}
							break a
					}
					a:if(document.getElementById("mdtabbtn").style.display != "none"){
							for (i = 1; i <= 8; i++) t.buyMaxMetaDimension(i);
							if(player.meta.antimatter.l > 415) break a
							var i=1;
							while(t.player.meta[i].bought > 9){
									i++
									if(i == 8) break;
									if(i==t.player.meta.resets+4) break;
							};
							var fl
							for(fl=true;fl;){
									fl=t.metaBuyOneDimension(i)
							}
							for(fl=true;fl;){
									fl=t.metaBuyOneDimension(1)
							}
							t.metaBoost()
					}
			},2*1000)
	}
	setTimeout(run,200)
	// Your code here...
})();