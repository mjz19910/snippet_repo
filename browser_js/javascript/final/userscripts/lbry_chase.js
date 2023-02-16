// ==UserScript==
// @name         explorer.lbry.com lbry_chase
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://explorer.lbry.com/tx/*
// @match        https://explorer.lbry.com/address/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lbry.com
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck
/*eslint-disable no-undef*/

(function() {
	'use strict';
	// spell:words lbry_chase
	function lbry_chase() {
		if(location.href.match(/.+\/address\//)) {
			let tmp=[...document.querySelector('tbody').children];
			console.log(tmp.map(e => e.innerHTML.replaceAll("\n","\\n")).join("\n"));
			for(let i=0;i<tmp.length;i++) {
				let str=tmp[i].children[6].innerText.split(" LBC",1);
				if(parseFloat(str)<=0) {
					continue;
				}
				tmp[i].children[1].children[0].children[0].click();
				break;
			}
		}
		let document_query_result=document.querySelectorAll(".inputs .input");
		if(document_query_result.length===1) {
			document_query_result[0].children[2].children[0].click();
		}

	}
	if(sessionStorage.lbry_chase) {
		window.onload=() => {
			lbry_chase();
		};
	}
	// Your code here...
})();