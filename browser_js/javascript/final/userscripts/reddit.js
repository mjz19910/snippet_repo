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
	if (localStorage.getItem("reddit_custom_context") === null){
			localStorage.reddit_custom_context=7//7 extra items by default
	}
	if (document.querySelector(".sr-bar") === null){
		// Nothing if there is no header bar, we probably got injected into a reddit related iframe
		// We might be on new reddit, there is no parent UX on each comment, so i cant do anything
	}else{
	var a,b,c,e //these are most of the vars we use, make them private to the function we are currently in.
	a=document.createElement("li");"      "//preparing the required dom elements to prepend the configure link @create @dom
	var link=b=document.createElement("a");//@create @dom
	b.classList.add("choice");"           "//@create @dom
	b.innerHTML="configure context";"     "//@create @dom
	c=document.querySelector(".sr-bar");" "//@get @header
	e=document.createElement("span");"    "//@create @dom
	e.classList.add("separator");"        "//@create @dom
	e.innerHTML="-";"                     "//@create @dom
	c.firstChild.prepend(e);//add items to the reddit header bar @insert @header @dom
	a.append(b);0//@insert @header @dom
	c.prepend(a);//@insert @header @dom
	link.onclick=function(){//add the click handler to the context_configure button
		var a=prompt("Enter a number");//get a number from the user
		if (a == null){return};// bail out if we got a negative response
		a=Number.parseInt(a);//try to turn the response into a number
		if (Number.isNaN(a)){return};//bail out if we parsed NaN
		if (a < 0){return};//bail out if the number is negative
		localStorage.reddit_custom_context=a//save the users choice so it persists
	}
	document.querySelector(".sitetable.nestedlisting").querySelector("ul :nth-child(4)>*").href+="?context="+localStorage.reddit_custom_context
	// append the context option to the first "parent" link
	}
})();