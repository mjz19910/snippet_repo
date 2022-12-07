/* spell:words
-- version_list item 4 --
v1 (old): snippet_repo/javascript/final/items/item4_v1.js
v2 (old): snippet_repo/javascript/final/items/item4_v2.js
v3 (cur): snippet_repo/javascript/group1/sub_a/item-_4.js
*/
function avg(arr) {
	let min=null
	let max=null
	let total=0
	let cnt=0
	for(let i=0;i<arr.length;i++) {
		let v=arr[i]
		total+=v
		cnt++
		if(!min||v<min) {
			min=v
		}
		if(!max||v>max) {
			max=v
		}
	}
	return [total/cnt,min,max]
}
function avg_up(arr,v_avg) {
	let min=null
	let max=null
	let total=0
	let cnt=0
	for(let i=0;i<arr.length;i++) {
		let v=arr[i]
		if(v_avg>v) {
			total+=v
			cnt++
		}
		if(!min||v<min) {
			min=v
		}
		if(!max||v>max) {
			max=v
		}
	}
	return [total/cnt,min,max]
}
class AutoState {
	constructor() {
		/** @type {[0|1,number][]} */
		this.cint_arr=[]
		this.current_generator_autobuy=0
	}
	destroy_cint_item(item) {
		switch(item[0]) {
			case 0:
				clearTimeout(item[1])
				break
			case 1:
				clearInterval(item[1])
				break
		}
	}
	setTimeout() {
		let cint=setTimeout(func,delay)
		this.cint_arr.push([0,cint])
	}
	setInterval(func,delay) {
		let cint=setInterval(func,delay)
		this.cint_arr.push([1,cint])
	}
	start() {
		if(!player.generators_autobuyer[0][0]) {
			let t=this
			this.setInterval(e => tierGenerator(t.current_generator_autobuy++%8),50)
			this.setInterval(e => tierMult(),300)
			this.setInterval(e => buyMeta(),300)
		}
		let money_log=player.money.log().toNumber()
		let sd_arr=[]
		function auto_sacrificeGen() {
			let cur_log=player.money.log().toNumber()
			let log_diff=cur_log-money_log
			let mode_run=0
			money_log=cur_log
			if(log_diff>0.1&&log_diff<1) {
				if(FORMULA.sacrifice().gt('1e4')) {
					mode_run=2
					sacrificeGen()
				}
			} else if(log_diff>0&&log_diff<0.1) {
				if(FORMULA.sacrifice().gt(10)) {
					mode_run=3
					sacrificeGen()
				}
			}
			if(log_diff!==0) {
				let [v_avg]=avg(sd_arr)
				let ov=v_avg
				v_avg=avg_up(sd_arr,v_avg)[0]
				let avg_1=ov
				let avg_2=v_avg
				let cnt=0
				while(v_avg<100) {
					v_avg*=10
					ov*=10
					cnt++
				}
				let lost=sd_arr.filter(e => e<avg_2)
				while(sd_arr.length>500) {
					let rm=sd_arr.indexOf(lost[0])
					sd_arr.splice(rm,1)
					lost.shift()
					if(lost.length===0) {
						break
					}
				}
				console.log('sac %o (%s %s)*1.0e-%o',mode_run,v_avg.toFixed(4),ov.toFixed(4),cnt,lost.length)
				sd_arr.push(log_diff)
			}
		}
		this.setInterval(auto_sacrificeGen,500)
	}
	destroy_cint() {
		for(let item of this.cint_arr) {
			this.destroy_cint_item(item)
		}
	}
	destroy() {
		this.destroy_cint()
	}
}
if(window.g_state) {
	window.g_state.destroy()
}
window.g_state=new AutoState
window.g_state.start()
