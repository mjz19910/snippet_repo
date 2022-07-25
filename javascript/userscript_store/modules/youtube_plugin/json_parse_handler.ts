export class json_parse_handler {
	/**
	 * @param {any[]} proxy_args
	 */
	apply(...proxy_args: any[]) {
		let cst=new Error
		let error_stack=cst.stack
		if(!error_stack)
			throw new Error("Unable to handle error without stack")
		let string_arr=error_stack.split('\n')
		string_arr=string_arr.slice(2)
		string_arr=string_arr.map(str => str.split('()'[0])[0].slice(4+3,-1))
		string_arr=string_arr.map(str => str.match(/^Object/)===null&&str||str.slice(6))
		string_arr=string_arr.map(str => '{'+str+'}')
		let simple_error_stack=string_arr.join('!')
		if(simple_error_stack==="{Se}!{._.uf}!{b}!{.apply}") {
			return false
		}
		return Reflect.apply(proxy_args[0],proxy_args[1],proxy_args[2])
	}
}
