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
	media_source_set=new Set;
	/** @type {Set<HTMLVideoElement>} */
	connected_video_elements=new Set;
	/** @type {Map<HTMLVideoElement,MediaElementAudioSourceNode>} */
	connection_map=new Map;
	static instance;
	static {
		this.instance=new this;
	}
	start() {
		const ctx=this.audioCtx,gain=this.gainNode,compressor=this.compressorNode;
		let video_element=document.querySelector("video");
		if(!video_element) return;
		if(this.connected_video_elements.has(video_element)) return;
		this.connected_video_elements.add(video_element);
		let media_source=ctx.createMediaElementSource(video_element);
		this.media_source_set.add(media_source);
		this.connection_map.set(video_element,media_source);
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
