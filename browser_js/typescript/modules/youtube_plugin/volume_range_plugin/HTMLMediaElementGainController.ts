import {volume_plugin_style_source} from "./css/volume_plugin_style_source.js"

export class HTMLMediaElementGainController {
	last_event: Event|undefined
	attached_element_list: (HTMLVideoElement|HTMLAudioElement)[]=[]
	audioCtx=new AudioContext()
	style=document.createElement("style")
	gain_node: GainNode
	gain: AudioParam
	dynamics_compressor: DynamicsCompressorNode
	constructor() {
		this.gain_node=this.audioCtx.createGain()
		this.gain=this.gain_node.gain
		this.gain_node.connect(this.audioCtx.destination)
		let dynamics_compressor=this.audioCtx.createDynamicsCompressor()
		dynamics_compressor.connect(this.gain_node)
		this.dynamics_compressor=dynamics_compressor
		function init_dynamics_compressor(dyn:DynamicsCompressorNode) {
			let {knee,attack,release,ratio,threshold}=dyn
			knee.value=27
			attack.value=1
			release.value=1
			ratio.value=4
			threshold.value=-24
		}
		init_dynamics_compressor(dynamics_compressor)
		this.style.innerHTML=volume_plugin_style_source
		document.head.append(this.style)
	}
	setGain(gain: number) {
		this.gain.value=gain
	}
	media_element_source_list: MediaElementAudioSourceNode[]=[]
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
