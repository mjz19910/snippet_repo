// ==UserScript==
// @name         webm_compress_audio
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*/*.webm
// @match        http://*/*.webm
// @grant        none
// @run-at       document-start
// ==/UserScript==
/* eslint-disable no-undef */

(function() {
	'use strict';
	if(typeof aud=='undefined')aud={};
	e=aud;
	t=document.querySelector("video");
	e.audioCtx=new AudioContext();
	m=e.audioCtx.destination;
	x=e.audioCtx.createGain();
x.connect(m);
	j=e.gain_v=x.gain;
e.gain=x;
	s=e.audioCtx.createDynamicsCompressor();
s.connect(x);
e.comp=s;
	(({knee,attack,release,ratio,threshold})=>{knee.value=28;attack.value=release.value=1;ratio.value=10;threshold.value=-24})(s);
	y=e.audioCtx.createMediaElementSource(t);
	y.connect(s);
	// Your code here...
})();