// ==UserScript==
// @name         aarextiaokhiao Productive-Data
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://aarextiaokhiao.github.io/Productive-Data/
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck

(function() {
	'use strict';
	var noteval=Function("","return eval")();
	var getraw=function(e){return e.raw[0].replace(/\\`/g,"`")}
	var rstr;
	var waitfn=function(){
			if (window.hasOwnProperty("game")) {
					noteval(rstr+"\n//# sourceURL=https://aarextiaokhiao.github.io/Productive-Data/$_1")
			} else {
					window.cint = setTimeout(waitfn, 100)
					return
			}
	}
	waitfn();
	rstr=getraw`var t = window;
var bc=0;
spread_bits = function() {
	if (!game.files.unlocked) {
			return
	}
	if(get_bit_capacity() < 1e4){
			return
	}
	if(get_bit_capacity() > 1e36){
			return
	}
	var add = game.bits / (8 * Math.log10(get_bit_capacity() + 100) * (2.8 - (bc++/52)))
	if(bc > 50){bc=1}
	var mv=0
	for (var id = 1; id < 9; id++) {
			if (game.files[id].bits > mv){
					mv=game.files[id].bits
			}
	}
	var mvids=[]
	for (var id = 1; id < 9; id++) {
			if (game.files[id].bits > mv*0.999999){
					mvids.push(id)
			}
	}
	if(mvids.length == 1){add=add*2}
	if(mvids.length == 7){add-=(add/16)}
	for (var id = 1; id < 9; id++) {
			if(mvids.length != 8 && mvids.indexOf(id) > -1){continue}
			game.bits = Math.max(game.bits - add, 0)
			game.files[id].bits += add
			game.statistics.bits_injected += add
			update_file(id)
			if (game.options.locked_bits_production)
					document.getElementById("produce_bits").textContent = "Producing"
			if (tab_name == "files")
					document.getElementById("total_file_boost").innerHTML = "<b>Total multiplier on bit and byte productions</b>: " + format(get_total_file_boost(), 1) + "x"
			if (tab_name == "computers") {
					if (game.computers.unlocked)
							update_select_file_button(id)
					else
							document.getElementById("total_file_boost_computers").innerHTML = "<b>Total multiplier on bit and byte productions</b>: " + format(get_total_file_boost(), 1) + "x"
			}
			if (tab_name == "statistics")
					update_tab_on_switch("statistics")
	}
}
spread_bits_dom = document.querySelector("#spread_bits_button")
x = document.createElement("div")
spread_bits_timer = function() {
	t.cid = setInterval(spread_bits, 1000)
}
if (t.cid) {
	clearInterval(t.cid)
	spread_bits_timer()
} else {
	spread_bits_timer()
}
upgrades_timer_run = function() {
if(get_bit_capacity() > 1e36){
return
}
	max_upgrades()
	if(game.bits > 64 && !game.files.unlocked){
			//unlock_files();
	}
	if(get_total_file_boost() > 512 && !game.computers.unlocked){
			//unlock_computers();
	}
}
upgrades_timer = function() {
	t.upgrades_tid = setInterval(upgrades_timer_run, 4 * 1000)
}
if (t.upgrades_tid) {
	clearInterval(t.upgrades_tid)
	upgrades_timer()
} else {
	upgrades_timer()
}
if(t.cint){
	clearInterval(t.cint)
	//t.cint=setInterval(produce,120*1000,"bytes")
}else{
	//t.cint=setInterval(produce,120*1000,"bytes")
}
if (!spread_bits_dom) {
	ds1 = \`<div id="spread_bits_button"><button onclick="spread_bits()">Inject all bits evenly</button></div>\`
	x.innerHTML = ds1
	spread_bits_dom = x.firstChild
	file_el = document.querySelector("#inject_equally_button")
	file_el.insertAdjacentElement("afterEnd", spread_bits_dom)
}
`;
	// Your code here...
})();