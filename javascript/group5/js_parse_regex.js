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
							self.step_index++;
							return "function".length;
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
			function step_whitespace(self, index) {
				let rx=/\w+/g;
				rx.lastIndex=index;
				let mat=rx.exec(self.code);
				if(mat.index === index){
					self.tokens.push(mat[0]);
					return mat[0].length;
				}
				let cur=self.code[index];
				let ret=null;
				switch(cur) {
					case ' ': {
						let chk = self.code.slice(index, index + 2);
						if(chk[0] === ' ' && chk[1] === '()'[0]) {
							cur=[" ", "()"[0]];
							ret=2;
						}
					} break;
					case ')':{
						self.step_index++;
						ret=1;
					} break;
					default: {
						console.log("??(\"%s\", json=%s)", cur, JSON.stringify(cur));
					}
				}
				if(cur instanceof Array){
					self.tokens.push(...cur);
				}else{
					self.tokens.push(cur);
				}
				if(ret !== null){
					return ret;
				}
			},
			/**@arg {Parser}self @arg {number} index */
			function step_whitespace(self, index) {
				switch(self.code[index]) {
					case ' ': {} break;
					default: {
						console.log("??(\"%s\", 1)", self.code[index]);
					}
				}
			},
			/**@arg {Parser}self @arg {number} index */
			function step_template(self, index) {
				switch(self.code[index]) {
					case '': {} break;
					default: {
						console.log("??(\"%s\", 'template')", self.code[index]);
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