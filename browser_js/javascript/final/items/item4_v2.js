/* spell:words totalAtome
-- version_list item 4 --
v1 (old): snippet_repo/javascript/final/items/item4_v1.js
v2 (cur): snippet_repo/javascript/final/items/item4_v2.js
v2 (new): snippet_repo/javascript/group1/sub_a/item-_4.js
*/
function short_wait() {
	return new Promise((a) => setTimeout(a,0));
}
function get_totalAtome() {
	return 0;
}
{
	class IterState {
		running=true;
		cur=0;
		step() {
			if(this.cur!==get_totalAtome()) {
				let last=this.cur;
				this.cur=get_totalAtome();
				let diff=this.cur-last;
				if(diff>0)
					console.log('ch',diff);
				else
					console.log('gi',diff);
			}
		}
		is_done() {
			return !this.running;
		}
		values() {
			return new SlowIterator(this);
		}
	}
	class SlowIterator {
		async slow_iter() {
			let iter_cur;
			do {
				iter_cur=this.next();
				await short_wait();
			} while(!iter_cur.done);
		}
		/**
		 * @arg {IterState} state
		 */
		constructor(state) {
			this.state=state;
		}
		is_done() {
			return this.state.is_done();
		}
		step() {
			return {
				value: this.state.step(),
				done: false
			};
		}
		final() {
			return {
				value: void 0,
				done: true
			};
		}
		next() {
			if(this.is_done())
				return this.final();
			return this.step();
		}
	}
	let iterator_state=new IterState;
	iterator_state.values().slow_iter();
}
