const code = `(function (rebuild) {
    var global;
    (function (global) {
        g_worker_state: WorkerState;
    })(global = rebuild.global || (rebuild.global = {}));
})(rebuild || (rebuild = {}));`;
let parse_depth = 0;
class Parser {
	constructor(code) {
		this.code = code;
		this.tokens=[];
		this.step_index = 0;
		this.steps = Array(255).fill('step_').map((e, dx) => e + (dx + 1));
	}
	run() {
		let index = 0;
		for(let i = 0; i < 3; i++) {
			try {
				let step = this.steps[this.step_index];
				console.log(step);
				let ch = this[step](index);
				index += ch;
				if(!ch) {
					break;
				}
			} catch(e) {
				continue;
			}
		}
	}
	step_1(index) {
		let ret = null;
		let char=this.code[index];
		switch(char) {
			case "()"[0]: {
				this.tokens.push(char);
				switch(this.code[index + 1]) {
					case 'f': {
						this.step_index++;
						ret = 1;
					} break;
				}
			} break;
			case "()"[1]: {
				console.log(2);
			} break;
		}
		return ret;
	}
	// "f"
	step_2(index) {
		switch(this.code[index]) {
			case 'f':{
				let chk=this.code.slice(index, index+"function".length);
				if(chk === 'function'){
					this.tokens.push("function");

				}
			}break;
			default:{
				console.log("??(\"%s\")", this.code[index]);
			}
		}
	}
	// `function${infer U}`
	step_3(index){

	}
}
new Parser(code).run();