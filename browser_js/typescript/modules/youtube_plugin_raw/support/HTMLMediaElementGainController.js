
/**
 * @param {AudioContext} audio_ctx
 * @param {AudioNode} next_node
 */
function createDynamicsCompressor(audio_ctx,next_node) {
	let node=audio_ctx.createDynamicsCompressor();
	node.connect(next_node);
	let {
		knee,
		attack,
		release,
		ratio,
		threshold,
	}=node;
	knee.value=27;
	attack.value=1;
	release.value=1;
	ratio.value=4;
	threshold.value=-24;
	return node;
}
/**
 * @param {AudioContext} audio_ctx
 * @param {AudioNode} next_node
 */
function createGainNode(audio_ctx,next_node) {
	let node=audio_ctx.createGain();
	node.connect(next_node);
	return node;
}
let volume_plugin_style_source=`
	#rh_css {
		--w: calc(100% - 16px - 264px - 728px - 225px);
		--cv: calc(100% / 3.98);
		--fo: 0.6px;
		position: absolute;
		left: 168px;
		width: calc(var(--w) / 2);
		z-index: 1;
	}
	@media screen and (max-width: 1260px) {
		#rh_css {
			display: none;
		}
	}
	#i_r_css {
		outline: none;
	}
	@media screen and (prefers-color-scheme: light) {
		#i_r_css {
			--bg-range-color: #ff000040;
			background: #fff;
		}
	}
	@media screen and (prefers-color-scheme: dark) {
		#i_r_css {
			--bg-range-color: #ff000086;
			background: transparent;
		}
	}
	@supports selector(::-webkit-slider-thumb) {
		#i_r_css::-webkit-slider-runnable-track {
			padding: 0;
			margin: 0;
			background: repeating-linear-gradient(90deg, transparent, #ff000014 var(--fo), var(--bg-range-color) var(--cv));
		}
		#i_r_css {
			border-style: solid;
			border-width: 0 2.5px;
			border-right-color: #f00;
			border-left-color: #f00;
			appearance: none;
			padding: 0;
			display: block;
			z-index: 1;
		}
		#i_r_css::-webkit-slider-thumb {
			appearance: none;
			width: 4px;
			height: 8px;
			color: #000;
			background: #000;
			border: 0;
		}
	}
	@supports selector(::-moz-range-thumb) {
		#i_r_css::-moz-range-track {
			padding: 0;
			margin: 0;
			height: 8px;
			background: repeating-linear-gradient(90deg, transparent, #ff000014 var(--fo), var(--bg-range-color) var(--cv));
		}
		#i_r_css {
			height: 8px;
			border-style: solid;
			border-width: 0 2.5px;
			border-color: #f00;
			border-right-color: #f00;
			appearance: none;
			padding: 0;
			display: block;
		}
		#i_r_css::-moz-range-thumb {
			appearance: none;
			width: 4px;
			height: 8px;
			color: #000;
			background: #000;
			border: 0;
		}
	}
	/\*# sourceURL=youtube_volume_plugin_style_source*\/
`;
/**
 * @param {string} css_content
 */
function createStyleElement(css_content) {
	let style=document.createElement("style");
	style.innerHTML=css_content;
	return style;
}
export class HTMLMediaElementGainController {
	/**@type {Event|null}*/
	last_event=null;
	/**@type {(HTMLVideoElement | HTMLAudioElement)[]} */
	attached_element_list=[];
	audioCtx=new AudioContext();
	style=createStyleElement(volume_plugin_style_source);
	/**@type {DynamicsCompressorNode} */
	dynamics_compressor;
	/**
	 * @type {MediaElementAudioSourceNode[]}
	 */
	media_element_source_list=[];
	constructor() {
		this.gain_node=createGainNode(this.audioCtx,this.audioCtx.destination);
		this.dynamics_compressor=createDynamicsCompressor(this.audioCtx,this.gain_node);
		document.head.append(this.style);
	}
	/**
	 * @param {number} gain
	 */
	setGain(gain) {
		this.gain_node.gain.value=gain;
	}
	/**
	 * @param {NodeListOf<HTMLMediaElement>} media_node_list
	 */
	attach_element_list(media_node_list) {
		for(let i=0;i<media_node_list.length;i++) {
			let video_element=media_node_list[i];
			video_element.crossOrigin='anonymous';
			if(this.attached_element_list.includes(video_element)) continue;
			let media_element_source=this.audioCtx.createMediaElementSource(video_element);
			media_element_source.connect(this.dynamics_compressor);
			this.attached_element_list.push(video_element);
			this.media_element_source_list.push(media_element_source);
		}
	}
}
