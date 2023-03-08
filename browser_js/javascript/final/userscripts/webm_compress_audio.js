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
class AudioGainController {
	constructor() {
		this.audioCtx=new AudioContext();
		let x=this.audioCtx.createGain();
		this.gainNode=x;
		this.audioGainParam=x.gain;
		let s=this.audioCtx.createDynamicsCompressor();
		this.compressorNode=s;
		s.knee.value=28;
		s.attack.value=s.release.value=1;
		s.ratio.value=10;
		s.threshold.value=-24;
	}
	/** @type {Set<MediaElementAudioSourceNode>} */
	media_source=new Set;
	/** @type {Set<HTMLVideoElement>} */
	connected_video_elements=new Set;
	static instance;
	static {
		this.instance=new this;
	}
	start() {
		const ctx=this.audioCtx,gain=this.gainNode,compressor=this.compressorNode;
		if(this.media_source) {
			return;
		}
		let t=document.querySelector("video");
		if(!t) return;
		if(this.connected_video_elements.has(t)) return;
		this.connected_video_elements.add(t);
		let media_source=ctx.createMediaElementSource(t);
		media_source.connect(compressor);
		compressor.connect(gain);
		gain.connect(ctx.destination);

	}
}
(function() {
	'use strict';
	AudioGainController.instance.start();
	// Your code here...
})();
