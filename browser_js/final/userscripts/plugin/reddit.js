// ==UserScript==
// @name         reddit
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.reddit.com/*
// @grant        none
// ==/UserScript==
// @ts-nocheck

(function() {
	'use strict';
	if(localStorage.getItem("reddit_custom_context")===null) {
		localStorage.reddit_custom_context=7;
	}
	let separator_renderer_bar=document.querySelector(".sr-bar");
	// Do nothing if there is no header bar; We probably got injected into a reddit related iframe.
	// We might be on new reddit, there is no parent UX on each comment, so i cant do anything
	if(separator_renderer_bar===null) return;
	// These are most of the vars we use, make them private to the function we are currently in.
	var list_item_element,context_configure_anchor_item,separator_renderer_bar,sr_bar_span;
	// Create the dom elements for the configure link
	list_item_element=document.createElement("li");
	var context_configure_anchor_item=document.createElement("a");
	context_configure_anchor_item.classList.add("choice");
	context_configure_anchor_item.innerHTML="configure context";
	sr_bar_span=document.createElement("span");
	sr_bar_span.classList.add("separator");
	sr_bar_span.innerHTML="-";
	// Add items to the reddit header bar
	separator_renderer_bar.firstChild.prepend(sr_bar_span);
	list_item_element.append(context_configure_anchor_item); 0;
	separator_renderer_bar.prepend(list_item_element);
	context_configure_anchor_item.onclick=function() {
		var custom_context_str=prompt("Enter a number");
		// if the user canceled, bail
		if(custom_context_str==null) return;
		// Parse the response into a number
		let custom_context_len=Number.parseInt(custom_context_str);
		if(Number.isNaN(custom_context_len)) return;
		if(custom_context_len<0) return;
		// Save the choice
		localStorage.reddit_custom_context=custom_context_len;
	};
	let nested_listing=document.querySelector(".sitetable.nestedlisting");
	let context_dom=nested_listing.querySelector("ul :nth-child(4)>*");
	// append the context option to the first "parent" link
	context_dom.href+="?context="+localStorage.reddit_custom_context;

})();