import {LOG_LEVEL_ERROR,LOG_LEVEL_INFO} from "../../../src/constants.js"
import {BaseNode} from "../../../vm/BaseNode.js"
import {l_log_if} from "../../../vm/l_log_if.js"
import {AsyncNodeRoot} from "./AsyncNodeRoot.js"
import {AverageRatio} from "./AverageRatio.js"
import {AverageRatioRoot} from "./AverageRatioRoot.js"
import {AutoBuyMulModifierFactor,AutoBuyRatioDiv} from "./const.js"
import {TimeoutNode} from "./TimeoutNode.js"
import {TimeoutTarget} from "./TimeoutTarget.js"

export class AutoBuyState {
	root_node: AsyncNodeRoot
	debug: boolean
	arr: number[]
	ratio: number
	last_ratio: number
	compressor_stats: never[]
	arr_max_len: number
	val: number
	total_mul: number
	ratio_mode: number
	total_cycle_count_change: number
	locked_cycle_count: number
	is_init_complete: boolean
	avg: AverageRatioRoot
	prev_atomepersecond?: number
	div?: number
	constructor(root: AsyncNodeRoot) {
		this.root_node=root
		this.debug=false
		/**
		 * @type {number[]}
		 */
		this.arr=[]
		this.ratio=0
		this.last_ratio=0
		this.compressor_stats=[]
		this.arr_max_len=5*60
		this.val=1
		this.total_mul=1
		this.ratio_mode=0
		this.total_cycle_count_change=0
		this.locked_cycle_count=50
		this.is_init_complete=false
		this.avg=new AverageRatioRoot
	}
	init() {
		if(window.atomepersecond===0) {
			let node=new TimeoutNode(0)
			this.root_node.append_child(node as unknown as BaseNode)
			node.start(new TimeoutTarget(this,this.init))
			return
		}
		this.val=window.totalAtome/window.atomepersecond
		let rep_val=this.val/(100*4*window.prestige)
		if(Number.isFinite(rep_val)) {
			for(let i=0;i<8;i++) {
				this.arr.push(rep_val*.75)
			}
		} else {
			rep_val=0.75
		}
		let ratio_types=['10sec','1min','5min','30min','3hour']
		let ratio_times=[10*1000,60*1000,5*60*1000,30*60*1000,3*60*60*1000]
		let ratio_counts=[80,6,5,6,6]
		function mul_3(arr: number[],i: number) {
			let [a,b=1,c=10]=arr.slice(i)
			return a*b*c*4
		}
		//@AverageRatio
		function create_ratio(target_obj: AverageRatioRoot,i: number,now_start: number) {
			let obj=new AverageRatio(ratio_types[i],ratio_times[i],ratio_counts[i],mul_3(ratio_counts,i),now_start)
			if(ratio_types[i]==='1min')
				obj.set_history_size(7200)
			target_obj.set_ratio(ratio_types[i],obj)
		}
		let now_start=performance.now()
		for(let i=0;i<5;i++) {
			create_ratio(this.avg,i,now_start)
		}
		this.prev_atomepersecond=window.atomepersecond
		this.is_init_complete=true
	}
	calc_ratio() {
		return this.avg.get_average('30min')
	}
	append_value(value: number) {
		if(!Number.isFinite(value)) {
			console.assert(false,'value is not finite')
		}
		this.arr.unshift(value)
		this.avg.push(value)
		while(this.arr.length>this.arr_max_len) {
			this.arr.pop()
		}
		let new_ratio=this.calc_ratio()
		if(!Number.isFinite(new_ratio)) {
			console.assert(false,'ratio result is not finite')
		}
		this.last_ratio=this.ratio
		this.ratio=new_ratio
	}
	update_ratio_mode() {
		let do_update=false
		if(this.locked_cycle_count>0) {
			this.locked_cycle_count--
			if(this.locked_cycle_count%100==0) {
				do_update=true
				l_log_if(LOG_LEVEL_INFO,'ratio cycle lcc=%o',this.locked_cycle_count)
			}
		} else {
			do_update=true
		}
		if(!do_update)
			return
		this.total_mul=1
		this.total_cycle_count_change=0
		let did_update=this.rep_update_ratio_mode(true)
		let should_notify=did_update
		while(did_update) {
			did_update=this.rep_update_ratio_mode(false)
		}
		if(should_notify) {
			this.finalize_locked_cycle_count()
			this.cycle_log()
		}
	}
	rep_update_ratio_mode(do_lock: boolean) {
		let mode_ratio_up=this.ratio_mode*.1
		let mode_ratio_down=this.ratio_mode*.1-.25
		if(this.ratio>(mode_ratio_up+.5))
			return this.on_increase_ratio(do_lock,2)
		if(this.ratio<mode_ratio_down)
			return this.on_decrease_ratio(do_lock)
		if(this.ratio>mode_ratio_up)
			return this.on_increase_ratio(do_lock)
		return false
	}
	on_decrease_ratio(do_lock: boolean,mul=1) {
		this.on_ratio_change(do_lock,-1,10,mul)
		return true
	}
	on_increase_ratio(do_lock: boolean,mul=1) {
		this.on_ratio_change(do_lock,1,20,mul)
		return true
	}
	on_ratio_change(do_lock: boolean,dir_num: number,lock_for: number,mul: number) {
		if(do_lock) {
			this.do_ratio_lock(do_lock,dir_num,60*lock_for*mul)
		} else {
			this.do_ratio_lock(do_lock,dir_num,2*lock_for*mul)
		}
		this.on_cycle_count_change(lock_for,mul)
	}
	on_cycle_count_change(lock_for: number,mul: number) {
		this.total_mul*=mul
		this.total_cycle_count_change+=lock_for
	}
	finalize_locked_cycle_count() {
		let rem_val=this.locked_cycle_count%100
		this.locked_cycle_count-=rem_val
		this.locked_cycle_count+=50
	}
	/**
	 * @param {boolean} _do_lock
	 * @param {number} mode_change_direction
	 * @param {number} num_of_cycles
	 */
	do_ratio_lock(_do_lock: boolean,mode_change_direction: number,num_of_cycles: number) {
		this.ratio_mode+=mode_change_direction
		this.locked_cycle_count+=num_of_cycles
	}
	get_mul_modifier() {
		switch(this.ratio_mode) {
			case 0: return AutoBuyMulModifierFactor+2
			case 1: return AutoBuyMulModifierFactor+1
			default: return AutoBuyMulModifierFactor
		}
	}
	/**
	 * @param {string} near_avg
	 */
	get_near_val(near_avg: string) {
		let real_val=this.avg.get_average(near_avg)
		let log_val=real_val
		let log_mul_count=0
		if(log_val<0.01||log_val>1) {
			while(log_val<0.1) {
				log_val*=10
				log_mul_count--
			}
			while(log_val>1) {
				log_val/=10
				log_mul_count++
			}
		}
		return [real_val,log_val,log_mul_count]
	}
	cycle_log() {
		l_log_if(LOG_LEVEL_INFO,'ratio mode mode=%o total_mul=%o cycle_change=%o',this.ratio_mode,this.total_mul,this.total_cycle_count_change)
		const near_avg='30min'
		let [real,num,exponent]=this.get_near_val(near_avg)
		a: if(exponent<2&&exponent>-2) {
			l_log_if(LOG_LEVEL_INFO,'ratio cycle avg:%s=%o lcc=%o',near_avg,(~~(real*10000))/10000,this.locked_cycle_count)
		} else {
			l_log_if(LOG_LEVEL_ERROR,'ratio cycle avg:%s=(%o,%o) lcc=%o',near_avg,(~~(num*1000))/1000,exponent,this.locked_cycle_count)
		}
	}
	update_not_ready() {
		let node=new TimeoutNode(80)
		this.root_node.append_child(node as unknown as BaseNode)
		node.start(new TimeoutTarget(this,this.update))
	}
	update() {
		let not_ready=false
		if(!not_ready)
			if(typeof window.prestige=='undefined')
				not_ready=true
		if(!not_ready)
			if(window.totalAtome<100||window.atomepersecond<100)
				not_ready=true
		if(not_ready) {
			this.update_not_ready()
			return
		}
		this.div=Math.log2(window.prestige)*AutoBuyRatioDiv
		//this.div=AutoBuyRatioDiv;
		this.val=Math.log2(window.totalAtome/window.atomepersecond)/this.div
		if(!Number.isFinite(this.val)) {
			this.val=1e-16
			this.update_not_ready()
			return
		}
		if(this.val<1e-16) {
			this.val=1e-16
		}
		this.val*=this.get_mul_modifier()
		this.append_value(this.val)
		this.update_ratio_mode()
	}
	/**
	 * @param {string} time_played_str
	 */
	on_game_reset_finish(time_played_str: string) {
		let history_arr_1=this.avg.values[0].history.slice().reverse()
		let history_item=history_arr_1[0]
		let history_div_num=6*5*6
		let history_arr_2=history_arr_1.map(value => {
			history_item*=history_div_num-1
			history_item+=value
			history_item/=history_div_num
			return (history_item*100).toFixed(1)
		})
		let json_hist=JSON.stringify(history_arr_2)
		let json_tag="JSON_HIST@"
		let prev_hist=sessionStorage.getItem('history')
		let data_arr: string[]
		if(prev_hist&&prev_hist.startsWith(json_tag)) {
			let hist_data=prev_hist.slice("JSON_HIST@".length)
			let prev_data_len=parseInt(hist_data.split(":",1)[0])
			data_arr=hist_data.slice((prev_data_len+"").length).split("|")
			if(data_arr.length!=prev_data_len) {
				console.assert(false,'invalid data_arr len')
			}
			data_arr.push(json_hist)
		} else if(prev_hist&&prev_hist.startsWith("JSON_HIST:")) {
			// upgrade v1
			let hist_data=prev_hist.slice("JSON_HIST:".length)
			data_arr=hist_data.split("|")
			data_arr.push(json_hist)
		}
		else {
			data_arr=[json_hist]
		}
		sessionStorage.history=`${json_tag}${data_arr.length.toFixed(0)}:${data_arr.join("|")}`
		let time_played_arr: (string|null)[]=data_arr.map(_e => null)
		if(sessionStorage.time_played_hist) {
			let data: string=sessionStorage.time_played_hist
			data.split("@").map(e => {
				let [index,time_str]=e.split("|")
				let index_num=parseInt(index)
				time_played_arr[index_num]=time_str
			})
		}
		time_played_arr[time_played_arr.length-1]=time_played_str
		let t_play_tmp: [number,(string|null)][]=time_played_arr.map((e,i) => [i,e])
		t_play_tmp=t_play_tmp.filter(e => e[1]!==null)
		let t_play_tmp_2=t_play_tmp.map(e => `${e[0]}|${e[1]}`)
		sessionStorage.time_played_hist=t_play_tmp_2.join("@")
	}
	reset() {
		this.ratio*=0.75
		for(var i=0;i<this.arr.length;i++) {
			this.arr[i]*=0.75
		}
	}
}
