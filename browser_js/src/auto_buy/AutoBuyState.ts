import {AverageRatioRoot} from "./AverageRatioRoot.ts";
import {AsyncTimeoutNode} from "../timer_node/AsyncTimeoutNode.ts";
import {TimeoutTargetFireDataNode} from "../timer_node/TimeoutTargetFireDataNode";
import {AverageRatio} from "./AverageRatio.ts";
import {BaseNode} from "../timer_node/BaseNode.ts";

// AutoBuyState
declare global {
	interface Window {
		atomepersecond: number;
		prestige: number;
	}
}

export class AutoBuyState {
	root_node;
	debug;
	arr: number[];
	ratio;
	compressor_stats: never[];
	arr_max_len;
	val;
	ratio_mode;
	locked_cycles;
	is_init_complete;
	avg;
	ratio_multiplier: number;
	div: number;
	constructor(root: BaseNode) {
		this.root_node=root;
		this.debug=false;
		this.arr=[];
		this.ratio=0;
		this.compressor_stats=[];
		this.arr_max_len=5*60;
		this.val=1;
		this.ratio_mode=0;
		this.locked_cycles=0;
		this.prev_atomepersecond=0;
		this.ratio_multiplier=0;
		this.div=0;
		this.is_init_complete=false;
		this.avg=new AverageRatioRoot;
	}
	prev_atomepersecond: number;
	init() {
		if(window.atomepersecond===0) {
			let node=new AsyncTimeoutNode(0);
			this.root_node.append_child(node);
			node.start(new TimeoutTargetFireDataNode(this,this.init,'not ready AutoBuyState.update'));
			return;
		}
		this.val=window.totalAtome/window.atomepersecond;
		let initial_arr=[this.val/(100*4*window.prestige)];
		if(Number.isFinite(initial_arr[0])) {
			for(let i=0;i<8;i++) {
				this.arr.push(initial_arr[0]*.75);
			}
		} else {
			initial_arr[0]=0.75;
		}
		let ratio_names=['10sec','1min','5min','30min','3hour'];
		let ratio_counts=[80,6,5,6,6];
		let ratio_mul=[0,.65,.15,.15,.05];
		let ratio_human=["10 seconds","1 minute","5 minutes","30 minutes","3 hours"];
		function mul_3(arr: number[],i: any) {
			let [a,b=1,c=10]=arr.slice(i);
			return a*b*c;
		}
		//@AverageRatio
		function create_ratio(i: number) {
			return new AverageRatio(initial_arr,ratio_counts[i],mul_3(ratio_counts,i),ratio_mul[i],ratio_human[i]);
		}
		for(let i=0;i<5;i++) {
			let obj=create_ratio(i);
			this.avg.push_ratio([ratio_names[i],obj]);
		}
		this.prev_atomepersecond=window.atomepersecond;
		this.is_init_complete=true;
	}
	calc_ratio() {
		if(this.avg.can_average('30min'))
			return this.avg.get_average('30min');
		if(this.avg.can_average('5min'))
			return this.avg.get_average('5min');
		if(this.avg.can_average('1min'))
			return this.avg.get_average('1min');
		if(this.avg.can_average('10sec'))
			return this.avg.get_average('10sec');
		return 0;
	}
	append_value(value: number) {
		if(!Number.isFinite(value)) {
			console.assert(false,'value is not finite');
		}
		this.arr.unshift(value);
		this.avg.push(value);
		while(this.arr.length>this.arr_max_len) {
			this.arr.pop();
		}
		let new_ratio=this.calc_ratio();
		if(!Number.isFinite(new_ratio)) {
			console.assert(false,'ratio result is not finite');
		}
		this.ratio=new_ratio;
	}
	update_ratio_mode() {
		switch(this.ratio_mode) {
			case 0: if(this.ratio>.4)
				this.do_ratio_lock(1,80*12);
				break;
			case 1:
				if(this.ratio<.35)
					this.do_ratio_lock(-1,80*3);
				if(this.ratio>.60)
					this.do_ratio_lock(1,80*12);
				break;
			case 2:
				if(this.ratio<.45)
					this.do_ratio_lock(-1,80*3);
				if(this.ratio>.85)
					this.do_ratio_lock(1,80*12);
				break;
			case 3:
				if(this.ratio<.9)
					this.do_ratio_lock(-1,80*3);
				if(this.ratio>1.5)
					this.on_very_high_ratio();
				break;
			default:
				if(this.ratio<.9)
					this.do_ratio_lock(-1,80*6);
				if(this.ratio>1.5)
					this.on_very_high_ratio(2);
				break;
		}
	}
	do_ratio_lock(mode_change_direction: number,num_of_cycles: number) {
		this.ratio_mode+=mode_change_direction;
		this.locked_cycles=num_of_cycles;
	}
	on_very_high_ratio(mul=1) {
		console.log('high ratio',this.ratio_mode,mul,(~~(this.ratio*100))/100);
		this.do_ratio_lock(1,80*12*mul);
	}
	get_mul_modifier(): 0.05|0.4|1|1.5|2|3|4|8 {
		switch(this.ratio_mode) {
			case 0: return 3;
			case 1: return 2;
			case 2: return 1.5;
			case 3: return 1;
			default: return 0.4;
		}
	}
	get_near_val() {
		let log_val=this.avg.get_average('5min');
		let log_mul_count=0;
		if(log_val<0.01||log_val>1) {
			while(log_val<0.1) {
				log_val*=10;
				log_mul_count--;
			}
			while(log_val>1) {
				log_val/=10;
				log_mul_count++;
			}
		}
		return [log_val,log_mul_count];
	}
	cycle_log() {
		let [num,exponent]=this.get_near_val();
		console.log('ratio cycle lock %se%o %s%o %s%o',(~~(num*1000))/1000,exponent,'mode=',this.ratio_mode,'cc=',this.locked_cycles);
	}
	update() {
		if(typeof window.prestige=='undefined') {
			console.log('fail',this.div,window.atomepersecond,window.totalAtome);
			let node=new AsyncTimeoutNode(80);
			this.root_node.append_child(node);
			node.start(new TimeoutTargetFireDataNode(this,this.update,'not ready AutoBuyState.update'));
			return;
		}
		this.ratio_multiplier=window.prestige;
		this.div=60*this.ratio_multiplier*8;
		this.val=window.totalAtome/window.atomepersecond/this.div;
		if(!Number.isFinite(this.val)) {
			this.val=1;
			console.log('fail',this.div,window.atomepersecond,window.totalAtome);
			let node=new AsyncTimeoutNode(80);
			this.root_node.append_child(node);
			node.start(new TimeoutTargetFireDataNode(this,this.update,'not ready AutoBuyState.update'));
			return;
		}
		this.val*=this.get_mul_modifier();
		this.append_value(this.val);
		if(this.locked_cycles>0) {
			this.locked_cycles--;
		} else {
			this.update_ratio_mode();
			if(this.locked_cycles>0)
				this.cycle_log();
		}
	}
	reset() {
		this.ratio*=0.75;
		for(var i=0;i<this.arr.length;i++) {
			this.arr[i]*=0.75;
		}
	}
}
