// ==UserScript==
// @name         cook1ee binarygame
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://cook1eegames.feedia.co/binarygame/
// @grant        none
// @run-at       document-start
// ==/UserScript==
/* eslint-disable no-undef */

(function() {
	'use strict';
	/** @arg {{value:number;parentElement:HTMLElement}[]} in_out_arr @returns {[]} */
	function solver_input(in_out_arr) {
		let x=in_out_arr.map(e => e.parentElement).map(x => {
			let q1=x.querySelectorAll("button"),qa=[];
			for(let i=0;i<q1.length;i++) qa.push(q1[i]);
			let hx_if=qa.map(e => e.classList.contains("rowstateon"));
			let st=1<<(hx_if.length-1);
			let n=0; for(var i=0;i<hx_if.length;i++) {n+=hx_if[i]? st:0; st>>=1;};
			return n;
		});
		for(var i=0;i<in_out_arr.length;i++) {
			in_out_arr[i].value=x[i];
		};
	}
	solver_input;
	// Your code here...
})();