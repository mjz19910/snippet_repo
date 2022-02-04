const code = `(function (rebuild) {
    var global;
    (function (global) {
        g_worker_state: WorkerState;
    })(global = rebuild.global || (rebuild.global = {}));
})(rebuild || (rebuild = {}));`;
/**@arg {number} index */
function step_template(index) {
	switch(this.code[index]) {
		case '': {} break;
		default: {
			console.log("??(\"%s\")", this.code[index]);
		}
	}
}
let parse_depth = 0;
class Parser {
	/**@arg {string} code */
	constructor(code) {
		this.code = code;
		/**@type {string[]} */
		this.tokens = [];
		this.step_index = 0;
		/**@type {((index:number)=>number)[]} */
		this.steps = [/**@arg {Parser}self @arg {number} index */
			function step_1(self, index) {
				let ret = null;
				let char = self.code[index];
				switch(char) {
					case "()"[0]: {
						self.tokens.push(char);
						switch(self.code[index + 1]) {
							case 'f': {
								self.step_index++;
								ret = 1;
							} break;
						}
					} break;
					case "()"[1]: {
						console.log(2);
					} break;
					default: {
						console.log("??(\"%s\")", self.code[index]);
					}
				}
				return ret;
			},
			// "f"
			/**@arg {Parser}self @arg {number} index */
			function step_2(self, index) {
				let ret=0;
				let cur=self.code[index];
				switch(cur) {
					case 'f': {
						let chk = self.code.slice(index, index + "function".length);
						if(chk === 'function') {
							self.tokens.push("function");

						}
					} break;
					default: {
						console.log("??(\"%s\")", self.code[index]);
					}
				}
				return ret;
			},
			// `function${infer U}`
			/**@arg {Parser}self @arg {number} index */
			function step_3(self, index) {
				switch(self.code[index]) {
					case 'f': {
						let chk = self.code.slice(index, index + "function".length);
						if(chk === 'function') {
							self.tokens.push("function");
							debugger;
							return "function".length;
						}
					} break;
					default: {
						console.log("??(\"%s\")", self.code[index]);
					}
				}
			},
			/**@arg {Parser}self @arg {number} index */
			function step_template(self, index) {
				switch(self.code[index]) {
					case '': {} break;
					default: {
						console.log("??(\"%s\")", self.code[index]);
					}
				}
			}];
	}
	run() {
		let index = 0;
		for(let i = 0; i < 12; i++) {
			try {
				let step = this.steps[this.step_index];
				process.stdout.write('.');
				let ch = step(this, index);
				index += ch;
				if(!ch) {
					break;
				}
			} catch(e) {
				continue;
			}
		}
		process.stdout.write("\n");
		console.log(this.tokens);
	}
}
function main(){
	new Parser(code).run();
}
main();