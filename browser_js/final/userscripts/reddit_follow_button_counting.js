// ==UserScript==
// @name         reddit_follow_button_counting
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.reddit.com/r/ButtonAftermath/comments/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck
/* eslint-disable no-undef */

window.onload=function() {
	'use strict';

	x: {
		document.querySelector("[id^='continueThread']");
		// : __reactInternalInstance$fh55rrshmcw
		break x;
	}
	var dom=document.body.children["2x-container"];
	dom=dom._reactRootContainer._internalRoot.current.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.stateNode;
	var do_ar=Object.getOwnPropertyNames(dom);
	var react_ii=do_ar.find(e => e.indexOf("__reactInternalInstance")==0);
	window.react_ii=react_ii;
	(function(f) {f(f);})(async function(f) {
		console.log('en');
		var get_dom=() => document.querySelector("[id^='continueThread']");
		var dom=get_dom();
		let count=0;
		if(!dom) {
			dom=await new Promise(function(a) {
				count++;
				setTimeout(function t() {
					var cdom=get_dom();
					if(cdom) {a(cdom); return; };
					count++;
					if(count>45) {
						var want=[...document.all].filter(e => e[react_ii]).map(e => e[react_ii]).filter(e => e.key=='commentsPaneWrapper').map(e => e);
						var w2=want[0].stateNode.querySelectorAll('[target=_blank][rel]:not([id])'); var a_link=w2.item(w2.length-1);
						a_link.target='';
						a_link.rel='';
						a_link.href=a_link.href.replace("old.reddit.com","reddit.com");
						a_link.click();
						cint=setTimeout(t,12000);
						return;
					}
					cint=setTimeout(t,33);
				},33);
			});
			console.log('wc',count);
		};
		var do_ar=Object.getOwnPropertyNames(dom);
		var root_new=dom[react_ii];
		window.root_new=root_new;
		function get_inner() {try {return root_new.child.sibling.child.child.child.child.child.child.child.child.child.child.child.stateNode;} catch {}; return null;};
		count=0;
		var ndom=await new Promise(function(a) {function t() {var cdom=get_inner(); if(cdom) {a(cdom); return; }; count++; cint=setTimeout(t,33);}; t();});
		console.log('wb',count);
		if(ndom) {
			console.log('ts');
			return setTimeout(e => {
				dom=get_dom();
				do_ar=Object.getOwnPropertyNames(dom);
				root_new=dom[react_ii];
				window.root_new=root_new;
				ndom=get_inner();
				ndom.click();
				window.inner_dom=ndom;
				cint=setTimeout(function() {cint=f(f);},1500);
			},33);
		};
	});

	// Your code here...
};