export class Vector<T> extends Array<T> {
    append(arg0: T) {
        this.push(arg0);
    }
    override at(x: number): T {
		let value=super.at(x);
		if(value === void 0) throw new Error("");
		return value;
	}
    clear() {
        throw new Error("Method not implemented.");
    }
    empend(arg0: T) {
		this.push(arg0);
    }
	clear_with_capacity() {
		this.length=0;
	}
	last() {
		let last_val=this.at(-1);
		if(!last_val) {
			throw new Error("Underflow");
		}
		return last_val;
	}
	size() {
		return this.length;
	}
	is_empty() {
		return this.length===0;
	}
	take_last() {
		this.pop();
	}
}
