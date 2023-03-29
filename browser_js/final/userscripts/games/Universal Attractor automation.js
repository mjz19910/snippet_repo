// ==UserScript==
// @name         Universal Attractor automation
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://daffodil-homburg.glitch.me/game.html
// @match        https://daffodil-homburg.glitch.me/game.html
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck

(function() {
	'use strict';
	var t=window;
	var to_done,nxfn,end_slow;
	var noteval=Function("","return eval")();
	var getraw=function(e){return e.raw[0]}
	var bgn,bgid=9,i,mptt=null,mpt=null,s=0,wtlen=0;
	end_slow=function(){
			if (!t.keysPressed.includes(77)) t.keysPressed.push(77);
			t.checkToReset(1);
			t.cint=setTimeout(nxfn,50)
	}
	var end_fast=function(){
			var key=77
			var newKeysPressed = [];
			for (i = 0; i < t.keysPressed.length; i++) {
					if (t.keysPressed[i] != key) {
							newKeysPressed.push(t.keysPressed[i])
					};
			}
			t.keysPressed = newKeysPressed;
	}
	nxfn=function(){
			a:{
					if(bgn != t.player.generators[bgid].bought){
							i=0;
							bgn=t.player.generators[bgid].bought
					}
					i++
					b:{
							if(t.player.currentChallenge){
									break a
							}
							if(t.player.preSupernova){
									//break b
							}
							var r=0,f=0;
							c:{
									if(t.player.breakLimit){
											if(t.player.generators[bgid].bought > 0 && i > 3){
													r=1;
													f=1
											}
									}else{
											if(t.player.generators[bgid].bought > 0 && i > 7){
													r=1;
													f=2;
											}
									}
							}
							if(r && f == 2){
									i=0;
									if (!t.keysPressed.includes(77)) t.keysPressed.push(77);
									setTimeout(end_fast,1*1000)
									setTimeout(end_slow,1.4*1000)
									return
							}
							var plp=t.player.prestigePower
							var plst=t.player.stars
							var gtpp=()=>t.getPrestigePower(plst)
							if(i > 2 && gtpp().gt(plp.mul(1000))){
									t.checkToReset(1);
									break b
							}
							if(i > 40 && gtpp().gt(plp.mul(8))){
									i=0;
									t.checkToReset(1);
									break b
							}
							if(i > 65 && gtpp().gt(plp.mul(3))){
									i=0;
									t.checkToReset(1);
									break b
							}
							if(r && f == 1 && gtpp().gt(plp.mul(20))){
									i=0;
									if (!t.keysPressed.includes(77)) t.keysPressed.push(77);
									setTimeout(end_fast,0.1*1000)
									setTimeout(end_slow,0.3*1000)
									return
							}
							if(mpt == null){mpt=t.player.transferPoints;mptt=mpt}
							if(mpt != t.player.transferPoints){mptt=mptt.add(t.player.transferPoints);mpt=t.player.transferPoints}
							var gtp=e=>t.getTransferPoints()
							c:{
									//break c
									if(mptt.eq(0) && t.getTransferPoints().gt(0)){
											t.checkToReset(2)
											break a
									}else{
											if(t.player.breakLimit){
													if(i > 100 && gtp().gte(mptt.mul(1e10))){
															if(gtpp().gt(plp.mul(10))){break b}
															t.checkToReset(2)
															break a
													}
											}else{
													if(i > 95 && gtp().gte(mptt.div(0.9))){
															t.checkToReset(2)
															break a
													}
											}
									}
							}
							if(t.player.transferPoints.eq(0)){
									mptt=new t.Decimal(0)
									mpt=null
							}
							if (plst.gte(new t.Decimal(Number.MAX_VALUE).pow(t.player.neutronBoosts.powers[0]+6).mul(1e125)/*.div(1e20)*/)) {
									t.checkToReset(3);
									mptt=new t.Decimal(0)
									mpt=null
									break a
							}
					}
					t.maxAll()
			}
			t.cint=setTimeout(nxfn,100)
	}
	var waitfn=function(){
			if (window.hasOwnProperty("player")) {
					mptt=new t.Decimal(0)
					console.log("delay",wtlen)
					setTimeout(to_done,100)
			} else {
					wtlen++;
					window.cint = setTimeout(waitfn, 100)
					return
			}
	}
	to_done=function(){
			if(!t.keysPressed.includes(16)){t.keysPressed.push(16,77)};
			nxfn();
	}
	waitfn();
	// Your code here...
})();