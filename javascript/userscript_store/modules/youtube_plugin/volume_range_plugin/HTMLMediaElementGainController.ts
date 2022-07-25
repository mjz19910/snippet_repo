import {volume_plugin_style_source} from "./volume_plugin_style_source"

export class HTMLMediaElementGainController {
	/**@type {Event|undefined}*/
	last_event: Event|undefined=undefined;
	/**@type {(HTMLVideoElement | HTMLAudioElement)[]} */
	attached_element_list: (HTMLVideoElement|HTMLAudioElement)[]=[];
	audioCtx=new AudioContext();
	style=document.createElement("style");
	gain_node: GainNode
	gain: any
	dynamics_compressor: DynamicsCompressorNode
	constructor() {
		this.gain_node=this.audioCtx.createGain()
		this.gain=this.gain_node.gain
		this.gain_node.connect(this.audioCtx.destination)
		let dynamics_compressor=this.audioCtx.createDynamicsCompressor()
		dynamics_compressor.connect(this.gain_node)
		this.dynamics_compressor=dynamics_compressor;
		(({knee,attack,release,ratio,threshold}) => {
			knee.value=27 //28 -1
			attack.value=1
			release.value=1
			ratio.value=4 //3 +1
			threshold.value=-24
		})(dynamics_compressor)
		this.style.innerHTML=volume_plugin_style_source
		document.head.append(this.style)
	}
	/**
	 * @param {number} gain
	 */
	setGain(gain: number) {
		this.gain.value=gain
	}
	/**
	 * @type {MediaElementAudioSourceNode[]}
	 */
	media_element_source_list: MediaElementAudioSourceNode[]=[];
	/**
	 * @param {NodeListOf<HTMLMediaElement>} media_node_list
	 */
	attach_element_list(media_node_list: NodeListOf<HTMLMediaElement>) {
		for(let i=0;i<media_node_list.length;i++) {
			let video_element=media_node_list[i]
			if(this.attached_element_list.includes(video_element))
				continue
			let media_element_source=this.audioCtx.createMediaElementSource(video_element)
			media_element_source.connect(this.dynamics_compressor)
			this.attached_element_list.push(video_element)
			this.media_element_source_list.push(media_element_source)
		}
	}
}
