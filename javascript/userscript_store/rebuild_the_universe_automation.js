// ==UserScript==
// @name		 rebuild the universe automation
// @namespace	http://tampermonkey.net/
// @version	  0.1
// @description  try to take over the world!
// @author	   You
// @match		http://rebuildtheuniverse.com/*
// @match		http://rebuildtheuniverse.com
// @match		https://rebuildtheuniverse.com/*
// @match		https://rebuildtheuniverse.com
// @run-at	   document-start
// @grant		none
// ==/UserScript==
// spell:words adsbygoogle deinit totalAtome _targets_achi totalAchi tonext atomepersecond lightreset lightgray
/* eslint-disable no-undef,no-lone-blocks,no-eval */

(function() {
	'use strict';
	function no_document_write(){
		let doc_write_strings=[];
		document.write=e=>doc_write_strings.push(e);
		return doc_write_strings;
	}
	window.doc_write_strings=no_document_write();
	class UniqueIdGenerator {
		constructor(){
			this.m_current=-1;
		}
		set_current(current_value){
			this.m_current=current_value;
		}
		current(){
			return this.m_current;
		}
		next(){
			return this.m_current++;
		}
	}
	function move_timers_to_worker_promise_executor(promise_executor_accept, promise_executor_reject) {
		void promise_executor_reject;
		if (globalThis.remote_worker_state) {
			postMessage({
				t: 109
			});
			return null;
		}
		function worker_code_function(){
			class RemoteWorkerState {
				constructor(){
					this.map=new Map;
					this.unique_script_id=1;
				}
			}
			function timer_nop(){};
			function fire_timer(timer, remote_id){
				timer.fire(remote_id);
			}
			class RemoteTimerApi{
				constructor(api_names){
					this.init=api_names.init;
					this.deinit=api_names.deinit;
				}
			}
			class RemoteTimer {
				constructor(repeat, msg_type, api_names){
					this.m_map=new Map;
					this.m_api=new RemoteTimerApi(api_names);
					this.repeat=repeat;
					this.msg_type=msg_type;
				}
				fire(remote_id){
					postMessage({
						t:this.msg_type,
						v:remote_id
					});
					if(!this.repeat)this.m_map.delete(remote_id);
				}
				set(remote_id, delay){
					let local_id=globalThis[this.m_api.init](fire_timer, delay, this, remote_id);
					this.m_map.set(remote_id, local_id);
					return local_id;
				}
				clear(remote_id){
					if(this.m_map.has(remote_id)){
						let local_id=this.m_map.get(remote_id);
						globalThis[this.m_api.deinit](local_id);
						this.m_map.delete(remote_id);
					}
				}
			}
			let remote_worker_state=new RemoteWorkerState;
			globalThis.remote_worker_state=remote_worker_state;
			// (timeout|interval)_timer fire(=103|104)?
			remote_worker_state.timeout_timer=new RemoteTimer(false, 103, {
				init:"setTimeout",
				deinit:"clearTimeout"
			});
			remote_worker_state.interval_timer=new RemoteTimer(true, 104, {
				init:"setInterval",
				deinit:"clearInterval"
			});
			{
				let id=setTimeout(timer_nop);
				clearTimeout(id);
				id=setInterval(timer_nop);
				clearInterval(id);
			}
			onmessage=function(e){
				let msg = e.data;
				switch (msg.t) {
					case 200/*result*/:{
						let result=msg.v;
						console.assert(false, "unhandled result on remote worker", result)
						break;
					}
					case 201/*remote worker init*/:{
						let user_msg=msg.v;
						if(user_msg.t == "remote_worker_init") {
							let worker_str="()"[0];
							worker_str+=user_msg.init;
							worker_str+="()"[1];
							worker_str+="()";
							worker_str+="\n";
							worker_str+="onmessage=";
							worker_str+=user_msg.onmessage;
							worker_str+="\n";
							worker_str+="\n//# sourceURL=$__.";
							worker_str+=remote_worker_state.unique_script_id;
							eval(worker_str);
							remote_worker_state.unique_script_id++;
							postMessage({
								t:100,
								v:msg.t
							});
						}
						break;
					}
					case 202:{
						postMessage({
							t:100,
							v:msg.t
						});
						break;
					}
					case 203/*remote timeout_timer set*/:{
						let user_msg=msg.v;
						let remote_timer_id = remote_worker_state.timeout_timer.set(user_msg.t, user_msg.v);
						break;
					}
					case 204/*remote interval_timer set*/:{
						let user_msg=msg.v;
						let remote_timer_id = remote_worker_state.interval_timer.set(user_msg.t, user_msg.v);
						break;
					}
					case 205/*remote timeout_timer clear*/:
						remote_worker_state.timeout_timer.clear(msg.v);
						break;
					case 206/*remote interval_timer clear*/:
						remote_worker_state.interval_timer.clear(msg.v);
						break;
					default:{
						console.assert(false, "RemoteWorker: Unhandled message", msg);
						break;
					}
				}
			}
		}
		class WorkerState{
			constructor(worker_code_blob){
				this.worker_url = URL.createObjectURL(worker_code_blob);
				this.worker=null;
			}
			static create(worker_code_blob) {
				const worker_state = new this(worker_code_blob);
				worker_state.init();
				return worker_state;
			}
			init() {
				this.worker = new Worker(this.worker_url);
				this.worker.onmessage = this.onmessage;
				this.worker.postMessage({
					t: 202
				});
			}
			on_result(result){
				switch(result){
					case 202:{
						console.log("remote_worker ready");
						if(window.worker_state && window.worker_state !== this){
							window.worker_state.destroy();
							delete window.worker_state;
						}
						window.worker_state=this;
						promise_executor_accept(this);
						break;
					}
					default:{
						console.assert(false, "unhandled result", result);
					}
				}
			}
			postMessage(data){
				return this.worker.postMessage(data);
			}
			static has_global_state(){
				return window.hasOwnProperty("worker_state");
			}
			static reset_global_state(){
				let old_worker_state=window.worker_state;
				delete window.worker_state;
				old_worker_state.destroy();
			}
			destroy(){
				if (this.worker){
					this.worker.terminate();
					this.worker=null;
					URL.revokeObjectURL(this.worker_url);
					this.worker_url = null;
				};
				this.timeout_timer.destroy();
				this.interval_timer.destroy();
			}
			onmessage(e) {
				var msg = e.data;
				switch (msg.t) {
					case 100/*result*/:{
						worker_state.on_result(msg.v);
						break;
					}
					case 101:break;
					case 102/*ready*/:
						console.log("ready");
						break;
					case 103/*timeout_timer fire*/:{
						worker_state.timeout_timer.fire(msg.v);
						break;
					}
					case 104/*interval_timer fire*/:{
						worker_state.interval_timer.fire(msg.v);
						break;
					}
					case 105/*worker_state destroy_worker*/:
						worker_state.destroy_worker();
						break;
					default:{
						console.assert(false, "Main: Unhandled message", msg);
						break;
					}
				}
			}
		}
		function timer_nop(){}
		class TimerApi {
			constructor(names){
				this.m_map=new Map;
				this.init=names.init;
				this.deinit=names.deinit;
				this.m_map.set(this.init, window[this.init]);
				this.m_map.set(this.deinit, window[this.deinit]);
				let start_id=window[this.init](timer_nop);
				window[this.deinit](start_id);
				this.m_start_id=start_id;
			}
			start_id(){
				return this.m_start_id;
			}
			destroy(){
				window[this.init]=this.m_map.get(this.init);
				window[this.deinit]=this.m_map.get(this.deinit);
				for (var ent of this.m_map.entries()) {
					let ent_key=ent[0];
					let ent_val=ent[1];
					if(!ent_val.repeat){
						// if the timer is not repeating, call it with the original timeout functions
						// so it can register the timeout with the underlying api
						ent_val.fn.apply(null, ent_val.args);
					}
				}
				this.m_map.clear();
			}
		}
		class Timer {
			constructor(id_generator, repeat, msg_types, api_names){
				this.id_generator=id_generator;
				this.m_map=new Map;
				this.repeat=repeat;
				this.msg_types=msg_types;
				this.m_api=new TimerApi(api_names);
				let start_id=this.m_api.start_id();
				if(start_id > this.id_generator.current()){
					this.id_generator.set_current(start_id);
				}
			}
			fire(timer_id){
				var timer_state = this.m_map.get(timer_id);
				if(timer_state.active){
					timer_state.target_function.apply(null, timer_state.target_arguments);
				}
				if(!this.repeat)this.m_map.delete(timer_id);
			}
			set(target_function, delay, target_arguments){
				var timer_id = this.id_generator.next();
				if (delay < 0)delay = 0;
				this.m_map.set(timer_id, {
					active: true,
					repeat: this.repeat,
					target_function,
					target_arguments,
					delay
				});
				worker_state.postMessage({
					t: this.msg_types.set,
					v: {
						t: timer_id,
						v: delay
					}
				});
				return timer_id;
			}
			clear(timer_id){
				if (this.m_map.has(timer_id)) {
					var timeout_state = this.m_map.get(timer_id);
					timeout_state.active = false;
					worker_state.postMessage({
						t: this.msg_types.clear,
						v: timer_id
					});
				}
			}
			destroy(){
				this.m_api.destroy();
			}
		}
		if (WorkerState.has_global_state()) {
			WorkerState.reset_global_state();
			return null;
		}
		const worker_code_blob = new Blob(["(", worker_code_function.toString(), ")()","\n//# sourceURL=$__.0"]);
		const worker_state=WorkerState.create(worker_code_blob);
		let id_generator=new UniqueIdGenerator;
		worker_state.timeout_timer=new Timer(id_generator, false, {set:203, clear:205}, {init:"setTimeout",deinit:"clearTimeout"});
		worker_state.interval_timer=new Timer(id_generator, true, {set:204, clear:206}, {init:"setInterval",deinit:"clearInterval"});
		window.remoteSetTimeout = function(target_function, delay, ...target_arguments) {
			return worker_state.timeout_timer.set(target_function, delay, target_arguments);
		}
		window.remoteClearTimeout = function(timeout_id) {
			worker_state.timeout_timer.clear(timeout_id);
		}
		window.remoteSetInterval = function(target_function, delay, ...target_arguments) {
			return worker_state.interval_timer.set(target_function, delay, target_arguments);
		}
		window.remoteClearInterval = function(timer_id) {
			worker_state.interval_timer.clear(timer_id);
		}
		setTimeout = remoteSetTimeout;
		setInterval = remoteSetInterval;
		clearTimeout = remoteClearTimeout;
		clearInterval = remoteClearInterval;
		return worker_state;
	}
	function move_timers_to_worker() {
		return new Promise(move_timers_to_worker_promise_executor);
	}
	function remove_bad_dom_script_element(){
		function remove_element_callback(e){
			if(!e.src)return;
			if(new URL(e.src).origin != location.origin)return;
			if(e.src.indexOf("ads") > -1 || e.src.indexOf("track") > -1){
				e.remove();
			}
		}
		Array.prototype.forEach.call(document.querySelectorAll("script"), remove_element_callback);
	};
	remove_bad_dom_script_element();
	function inject_func(){
		function do_auto_unit_promote(){
			var out=[],maxed=[];
			for(var k=0;k<arUnit.length;k++){
				var afford=false;
				if(arUnit[k][16]==true||k==0){
					var type=Get_Unit_Type(k);
					var tmp=getUnitPromoCost(k);
					var cost=tmp;
					var next=Find_ToNext(k);
					if(next < 0){maxed[k]=true};
					for(var i=1;i<=100;i++){
						if(totalAtome>=cost){
							tmp=tmp+(tmp*arUnit[k][3])/100;
							var tar=(arUnit[k][4]*1)+i;
							var a=_targets.indexOf(tar);
							var reduction=1;
							if(a>-1&&tar<=1000){
								var b=true;
								for(var k2 in type[2]){
									var v2=type[2][k2]
									if(v2!=k&&arUnit[v2][4]<tar){
										b=false;
									}
								}
								if(b){
									var c=_targets_achi.indexOf(totalAchi()+1);
									if(c>-1){
										reduction*=(1-((c+1)*0.01));
									}
									reduction*=1-((a+1)*0.01);
								}
							}
							tmp*=reduction;
							cost+=tmp;
						}else{
							break
						}
						if(i==next||(maxed[k]&&i==100)){
							afford=true;
						}
					}
					if(afford){
						out[k]=true;
					}else{
						out[k]=false;
					}
				}
			}
			res=out.lastIndexOf(true);
			if(res<0){
				return
			}
			if(maxed[res]){
				for(var y=0;y<100;y++){
					mainCalc(res);
				}
			}else{
				tonext(res);
			}
		};
		if(typeof cint != "undefined" && cint > 0){clearTimeout(cint)};
		var auto_buy_delay_arr;
		var n=1;
		if(localStorage.auto_buy_delay_str){
			var auto_buy_delay_tmp=localStorage.auto_buy_delay_str.split(",");
			auto_buy_delay_arr=auto_buy_delay_tmp.map((str)=>parseInt(str));
		}else{
			auto_buy_delay_arr=[2400,2400,2400,2400];
		};
		if(typeof cint_ar == "undefined"){cint_ar=[]};
		var ar_stk=[];
		var run_auto_buy_step_1=function(auto_buy_delay_arr, target_fn){
			for(var cur=ar_stk.shift();cur;)cur=ar_stk.shift();
			target_fn(auto_buy_delay_arr);
		};
		var log_elm=document.createElement("div");
		document.body.append(log_elm);
		log_elm.style="top:0px;position:fixed;color:lightgray;font-size:22px;font-family:Desc;";
		var time_elm=document.createElement("div");
		log_elm.append(time_elm);
		var c_stk_elm=document.createElement("div");
		log_elm.append(c_stk_elm);
		var hours_elm=document.createElement("div");
		log_elm.append(hours_elm);
		var percent_elm=document.createElement("div");
		log_elm.append(percent_elm);
		var prev_atomepersecond=atomepersecond;
		var ratio_mult_sec=prestige;
		var pca_10sec_avg=[];//len == 80;
		var pca_1min_avg=[];//len == 6;weight=.7;
		var pca_5min_avg=[];//len == 5;weight=.15;
		var pca_30min_avg=[];//len == 6;weight=.15;
		var pca_len=5*60;
		var log_val=e=>(((Math.log2(e)/10)+1));
		window.g_pca??={};
		var g_pca=window.g_pca;
		g_pca.ratio=0;
		g_pca.arr=[];
		function calc_ratio(arr){
			let ratio_acc=0;
			for(let i=0;i<arr.length;i++)ratio_acc+=arr[i];
			return ratio_acc/arr.length;
		}
		function ratio_arr_truncate(arr, truncate_len){
			while(arr.length > truncate_len)arr.pop();
		}
		function ratio_arr_update(arr_prev, arr_next){
			arr_next.unshift(calc_ratio(arr_prev));
		}
		function ratio_arr_update_first(arr, item){
			arr.unshift(item);
		}
		g_pca.calc_ratio=function(){
			return calc_ratio(this.arr);
		}
		{
			let val=totalAtome/atomepersecond;
			if(!Number.isFinite(val)){
				val=1;
			}
			let div=60*ratio_mult_sec*4;
			for(let i=0;i<8;i++){
				g_pca.arr.push((val/div)*.75);
			}
		}
		g_pca.update=function() {
			let val=totalAtome/atomepersecond;
			let div=60*ratio_mult_sec*4;
			let rate_changed=prev_atomepersecond != atomepersecond;
			let t=this;
			function do_ratio_update(type){
				void type;
				let cur=val/div*log_val(g_pca.arr.length);
				//console.log(type, cur, t.ratio);
				if(cur > t.ratio*2)cur+=cur/4;
				if(cur < t.ratio/2)cur-=cur/4;
				t.arr.unshift(cur);
				while(t.arr.length > pca_len) {
					t.arr.pop();
				}
				ratio_arr_update_first(pca_10sec_avg, cur);
				ratio_arr_truncate(pca_10sec_avg, 80);
				ratio_arr_update(pca_10sec_avg, pca_1min_avg);
				ratio_arr_truncate(pca_10sec_avg, 6);
				ratio_arr_update(pca_1min_avg, pca_5min_avg);
				ratio_arr_truncate(pca_10sec_avg, 5);
				ratio_arr_update(pca_5min_avg, pca_30min_avg)
				ratio_arr_truncate(pca_10sec_avg, 6);
				t.ratio=t.calc_ratio();
			}
			if(!rate_changed){
				if (Number.isFinite(val)){
					do_ratio_update('nc');
				}
				return;
			}
			let diff=prev_atomepersecond/atomepersecond;
			t.ratio*=diff;
			prev_atomepersecond=atomepersecond;
			if (Number.isFinite(val)) {
				do_ratio_update('ch');
			}
		}
		g_pca.reset=function(){
			g_pca.ratio*=0.75;
			for(var i=0;i<g_pca.arr.length;i++){
				g_pca.arr[i]*=0.75;
			}
		}
		g_pca.update();
		percent_elm.addEventListener('click',function(){
			g_pca.reset();
		});
		var stk_lis=function(){
			ar_stk.pop();
			var extra=0,max=0;
			ar_stk.push(">");
			clearTimeout(cint);
			var hit=auto_buy_delay_arr.length>16;
			var auto_buy_promise=Promise.resolve(auto_buy_delay_arr);
			var promise_callback=function(e){
				hit=auto_buy_delay_arr.length>16;
				if(hit){
					e.shift();
					auto_buy_promise.then(promise_callback);
					return e
				}else{
					return e
				}
			}
			if(hit){
				auto_buy_promise.then(promise_callback)
			}
			for(var i=0;i<auto_buy_delay_arr.length;i++){
				extra+=auto_buy_delay_arr[i]
				max=Math.max(auto_buy_delay_arr[i],max)
			};
			extra=~~(extra/auto_buy_delay_arr.length);
			time_elm.innerHTML=extra;
			cint=setTimeout(run_auto_buy_step_1, extra, auto_buy_delay_arr, auto_buy_main);
		}
		c_stk_elm.addEventListener('click',stk_lis)
		time_elm.innerHTML=auto_buy_delay_arr[0];
		var filter_ar_stk=function(){
			let cur_item="",prev_item="",crush_item_count=0;
			for(var i=0;i<ar_stk.length;i++){
				if(ar_stk[i].indexOf("*") > 0){
					var [item,times]=ar_stk[i].split("*");
					if(i+1 < ar_stk.length && ar_stk[i+1] == item){
						times=parseInt(times);
						times+=1;
						ar_stk.splice(i,2,item+"*"+times.toString())
					}
				}
			}
			function on_user_each(cur,prev,i){
				if(cur === prev){
					crush_item_count+=1
				}else{
					crush_item_count+=1
					if(prev){
						if(cur.indexOf("*") > 0 || crush_item_count <= 1){
							0
						}else{
							if(i-crush_item_count < 0){
								0
							}else{
								ar_stk.splice(i-crush_item_count, crush_item_count, prev+"*"+(crush_item_count).toString());
							}
						}
					}
					crush_item_count=0
				};
			}
			for (var i=0;i<ar_stk.length+1;i++){
				on_user_each(cur_item, prev_item, i);
				prev_item=cur_item;
				if(i<ar_stk.length){
					cur_item=ar_stk[i];
				}else{
					cur_item="";
				}
			}
			on_user_each("", prev_item, ar_stk.length)
		}
		var timer=Date.now();
		var dom_fn=function(){
			// spell:words timeplayed
			hours_elm.innerHTML=((timeplayed / 30) / 60).toFixed(3) + " hours";
			g_pca.update();
			percent_elm.innerHTML=(g_pca.ratio*100).toFixed(2)+"%";
			filter_ar_stk();
			c_stk_elm.innerHTML=ar_stk.join(" ");
			cint_dom=setTimeout(dom_fn, 125);
		};
		function auto_buy_main(auto_buy_delay_arr){
			ar_stk.pop();
			var delay;
			var max=0;
			var hit=auto_buy_delay_arr.length > 16;
			var promise_obj=Promise.resolve(auto_buy_delay_arr);
			var promise_callback=function(e){
				while(auto_buy_delay_arr.length>16){
					auto_buy_delay_arr.shift();
				};
				return e;
			}
			if(hit){
				promise_obj.then(promise_callback)
			}
			var extra=0;
			for(var i=0;i<auto_buy_delay_arr.length;i++){
				extra+=auto_buy_delay_arr[i];
				max=Math.max(auto_buy_delay_arr[i], max);
			};
			extra=~~(extra/auto_buy_delay_arr.length);
			var pre_total=totalAtome;
			do_auto_unit_promote();
			if((atomepersecond/totalAtome) < 0.005){auto_buy_delay_arr.push(extra/1.01)}
			if(g_pca.ratio > 1){
				//a_elm.muted=!a_elm.muted
				setTimeout(function(){
					ar_stk.push("trigger")
					//a_elm.muted=!a_elm.muted
					setTimeout(function(){
						ar_stk.pop();ar_stk.pop();
						ar_stk.push("reset_soon");
						cint=setTimeout(lightreset,60*1000)
						time_elm.innerHTML=60*1000;
					},60*2*1000)
					time_elm.innerHTML=60*2*1000;
				},60*7*1000);
				time_elm.innerHTML=60*7*1000;
				ar_stk.push("reset_delay");
				return
			}
			if(pre_total != totalAtome){
				n+=1;
				time_elm.innerHTML=extra;
				cint=setTimeout(auto_buy_main, extra, auto_buy_delay_arr);
				if(n>8 && totalAtome > 10000000000000){
					delay=~~(extra-((extra*Math.pow(1.007,Math.log(totalAtome)))/10)*Math.pow(1.05,n/2));
					if(delay < 50){
						delay=50;
					}
					ar_stk.push("!");
				}else{
					delay=~~(extra-((extra*Math.pow(1.006,Math.log(totalAtome)))/10)*Math.pow(1.05,n/2));
					ar_stk.push("-");
				};
				auto_buy_delay_arr.push(delay);
				return
			};
			n=0;
			if(Math.random()<0.12){
				delay=~~(extra+((extra*Math.pow(1.008,Math.log(totalAtome)))/10));
				auto_buy_delay_arr.push(delay)
				var ctm_fn=function(){
					var fast_auto_buy_unit_delay=()=>{
						cint=setTimeout(fast_auto_buy_unit, extra/1.9);
						time_elm.innerHTML=extra/1.9;
						ar_stk.push(":");
					};
					var slow_auto_buy_final=()=>{
						cint=setTimeout(run_auto_buy_step_1, delay/4+extra/3+extra/3, auto_buy_delay_arr, auto_buy_main);
						time_elm.innerHTML=delay/4+extra/3+extra/3;
						ar_stk.push("$");
					};
					var fast_auto_buy_unit=function(){
						pre_total=totalAtome;
						do_auto_unit_promote();
						if(pre_total == totalAtome)slow_auto_buy_final();else fast_auto_buy_unit_delay();
					};
					var auto_buy_bonus=function(){
						bonusAll();
						fast_auto_buy_unit_delay()
					}
					var dcc=e=>{
						time_elm.innerHTML=delay*1.75
						cint=setTimeout(dc,delay*1.75)
						ar_stk.push("^")
					}
					var find_next_to_buy=e=>e.find(c=>{return (!c.done) && c.cost < totalAtome});
					var do_special_auto_buy=function(){
						//spell:words allspec specialclick
						for(var i,e=allspec,v=find_next_to_buy(e);v;){
							i=e.indexOf(v);
							specialclick(i);
							return false
						}
						return true
					}
					var dcn=()=>{
						cint=setTimeout(auto_buy_bonus, delay*1.75);
						time_elm.innerHTML=delay*1.75
						ar_stk.push("#")
					}
					var dc=e=>do_special_auto_buy()?dcn():dcc();
					cint=setTimeout(dc,delay*1.75)
				}
				cint=setTimeout(ctm_fn,extra*1.5)
				time_elm.innerHTML=extra*1.5
				ar_stk.push("_")
				return
			}
			delay=~~(extra+((extra*Math.pow(1.008,Math.log(totalAtome)))/16));
			auto_buy_delay_arr.push(delay)
			cint=setTimeout(auto_buy_main, extra, auto_buy_delay_arr);
			time_elm.innerHTML=extra
			ar_stk.push("+")
		};
		dom_fn();
		run_auto_buy_step_1(auto_buy_delay_arr, auto_buy_main);
		var add_override=function(){
			var lightreset_orig=lightreset;
			lightreset=function(){
				window.onunload=function(){
					localStorage.auto_buy_delay_str="300,300,300,300";
					localStorage.long_wait=12000;
				}
				lightreset_orig();
			}
			//spell:words specialsbought atomsinvest checkspec specaps noti plurials updateprogress achiSpec
			specialclick=function(that){
				if (allspec[that].done == undefined) allspec[that].done = false;
				if (allspec[that].cost <= totalAtome && allspec[that].done == false) {
					doc.getElementById('specialsbought').innerHTML = rounding(++specialsbought, false,0);
					if (that == 74) {
					}
					atomsinvest += allspec[that].cost;
					doc.getElementById('atomsinvest').innerHTML = rounding(atomsinvest, false,0);
					allspec[that].done = true;
					totalAtome -= allspec[that].cost;
					var diff1 = calcDiff(that);
					for (var a in arUnit[that][17]) arUnit[that][17][a] *= 100;
					arUnit[that][5] *= 100;
					var specaps = 0;
					if (arUnit[that][4] > 0) {
						specaps = (calcDiff(that) - diff1);
						atomepersecond += specaps;
					}
					if (noti) gritter('Power-up !', toTitleCase(plurials(arrayNames[that])) + " X100 APS", null, "+" + rounding(specaps, false,0) + " APS", "");
					updateprogress(that);
					$('#spec' + that).remove();
					(that < 74) ? seeUnit(that + 1): seeUnit(that - 1);
					seeUnit(that);
					checkspec();
					achiSpec();
				}
			}
		}
		setTimeout(add_override,200);
		window.onunload=function(){
			if(localStorage.auto_buy_forced_action == "RESET"){
				localStorage.auto_buy_delay_str=auto_buy_delay_arr.map(e=>~~(e/4)).join(",");
				return;
			}
			localStorage.auto_buy_delay_str=auto_buy_delay_arr.join(",");
		}
	}
	(function(){
		var prev_node_prototype_insertBefore=Node.prototype.insertBefore;
		var dom_add_elm_filter=function(elm){
			if(elm && elm.nodeName === "SCRIPT"){
				if(!elm.src){
					console.log(elm);
					return true;
				}
				if(elm.src && new URL(elm.src).origin === location.origin){
					remove_bad_dom_script_element();
					return true;
				}
				return false;
			}
			return true;
		}
		document.addEventListener('onContentLoaded', remove_bad_dom_script_element);
		Node.prototype.insertBefore=function(element_to_insert, element_reference, ...rest){
			console.assert(rest.length === 0, "unexpected arguments for overwritten Node.prototype.insertBefore");
			let should_insert_1=dom_add_elm_filter(element_to_insert);
			if(!should_insert_1)return element_to_insert;
			let should_insert_2=dom_add_elm_filter(element_reference);
			if(!should_insert_2)return element_to_insert;
			return prev_node_prototype_insertBefore.call(this, element_to_insert, element_reference);
		}
	})();
	adsbygoogle=[];
	adsbygoogle.op=adsbygoogle.push;
	adsbygoogle.push=function(e){
		adsbygoogle.op(e);
		remove_bad_dom_script_element();
	};
	function on_page_is_loaded(init){
		if(init){
			var ba=document.querySelector("#background_audio");
			ba.volume=0.58;
			ba.onloadeddata=null;
			return
		}
		remove_bad_dom_script_element();
		if(Pace.bar.progress == 100){
			inject_func();
		}else{
			let original_pace_bar_finish=Pace.bar.finish;
			Pace.bar.finish=function(){
				original_pace_bar_finish.call(this);
				inject_func();
			}
		}
	}
	let first = true;
	function on_timers_moved(){
		if(typeof window._SM_Data != "undefined"){
			if(first){
				on_page_is_loaded(first);
				first=false;
			}
			remove_bad_dom_script_element();
			let delay=1000;
			if(localStorage.long_wait){
				delay=parseInt(localStorage.long_wait)/7;
				localStorage.removeItem("long_wait");
			};
			setTimeout(function(){
				on_page_is_loaded(first);
			}, delay);
			return
		}
		setTimeout(on_timers_moved, 55);
	}
	move_timers_to_worker().then(on_timers_moved);
	document.stop=function(){};
	setTimeout(function(){
		remove_bad_dom_script_element();
	},0);
	// Your code here...
})();