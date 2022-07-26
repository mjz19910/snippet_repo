/*
Copyright 2021-2021 @mjz19910

Header definition:
function main() {
	let parse_state
	class Logger {
		info_log_value(obj) {}
		info_object(obj) {}
		info(in_obj) {}
	}
	class Rust_std {}
	class Rust {}
	class Rust_crate_std_mem {
		discriminant() {}
	}
	class State {
		constructor() {}
		run() {}
		parse_first_class_comment(str) {
			class FirstClassCommentParser {
				constructor() {}
				accept_type(com_type, str, index) {}
				strip_tab_padding(str) {
					return str.split('\n').map(e=>{}).join('\n')
				}
				get_ss_comment(str) {}
				parse_rust_cont(str, index) {}
			}
			let parser = new FirstClassCommentParser
			let stripped_str = parser.strip_tab_padding(str)
			if (stripped_str[0] == '\n' && stripped_str[1] == '/' && stripped_str[2] == '/'){
				let str = stripped_str.slice(1,stripped_str.indexOf('\n',idx+1))
				let value = parser.get_ss_comment(str)
				return parser.accept_type(value, stripped_str, value.length + 4)
			}
			if(stripped_str[0] != '\n'){
				return stripped_str.slice(0, stripped_str.indexOf('\n'))
			}
		}
	}
	Logger::info({
		filter: State::parse_first_class_comment,
		url: '',
		msg: ''
	})
}
*/
function main() {
	'use strict'
	class Logger {
		info_log_value(obj) {
			if(obj.url) {
				console.info(obj.url,obj.result)
				return
			}
			console.info(obj.result)
		}
		info_object(obj) {
			if(obj.filter) {
				obj.result=obj.filter(obj.msg)
				delete obj.msg
				this.info_log_value(obj)
				return
			}
			obj.result=obj.msg
			delete obj.msg
			this.info_log_value(obj)
		}
		info(in_obj) {
			if(typeof in_obj==='object') {
				this.info_object(in_obj)
			}
		}
	}
	class Rust_std {
	}
	class Rust {
	}
	//std::mem::discriminant
	class Rust_crate_std_mem {
		discriminant() {}
	}
	let logger=new Logger()
	class State {
		constructor() {}
		run() {}
		parse_first_class_comment(str) {
			class FirstClassCommentParser {
				constructor() {
					this.on_parse_type={}
					this.on_parse_rust_type_discriminant=new Map
					this.on_parse_type['rust block']=(str,index) => this.parse_rust_cont(str,index)
					let obj={
						start: {
							type: 'string-find',
							needle: "\n//unix hash bang"
						},
						end: {
							type: 'string-eof-on-hit',
							needle: "\n//unix hash bang end"
						},
						on_hit: {
							type: 'rest',
							handler: (str,index) => this.parse_unix_file(str,index)
						}
					}
					this.on_parse_rust_type_discriminant.set('unix hash bang',obj)
				}
				on_unix_hash_bang() {
					let hb_line_end=str.indexOf('\n',index)
					console.log('hash_bang',str.slice(index,hb_line_end))
				}
				accept_type(com_type,str,index) {
					let parse_cb=this.on_parse_type[com_type]
					return parse_cb(str,index)
				}
				strip_tab_padding(str) {
					let at=str.indexOf("first_class_comment_info pad_line")
					let sv2=['','']
					for(let i=0;i<32;i++) {
						sv2[0]=sv2[1]
						sv2[1]=str[at-i]
						if(sv2[1]==='/'&&sv2[0]==='/') {
							at-=i
							break
						}
					}
					let tab_size=4
					let char_len=at-str.lastIndexOf('\n',at)-1
					let ws_start=str.slice(at-char_len,at)
					let indent_len=ws_start.split('').reduce((a,b) => {
						console.log(a,b)
						if(b==='\t')
							b=tab_size
						if(b===' ')
							b=1
						let sum=a+b
						return sum
					}
						,0)
					let no_indent=str.split('\n').map(e => {
						let c_indent=indent_len
						let sk=0
						if(e==='') {
							return e
						}
						for(;;) {
							if(c_indent<=0) {
								return e.slice(sk)
							}
							if(e[sk]==='\t') {
								c_indent-=tab_size
								sk++
								continue
							}
							if(e[sk]===' ') {
								sk++
								c_indent--
								continue
							}
							if(c_indent>0) {
								throw new Error('bad '+c_indent+' '+e[sk])
							}
						}
					}
					).join('\n')
					return no_indent
				}
				get_ss_comment(str) {
					return str.slice(2)
				}
				parse_rust_cont(str,index) {
					let nx_line=str.slice(index,str.indexOf('\n',index))
					console.log(nx_line.slice(1,-1))
					let end_str=str.indexOf(nx_line.slice(-1)+nx_line.slice(1,-1))
					window.nx_line=nx_line
					return str.slice(index+nx_line.length,end_str)
				}
			}
			let parser=new FirstClassCommentParser
			let stripped_str=parser.strip_tab_padding(str)
			let idx=0
			if(stripped_str[0]==='\n') {
				idx++
				let comment=stripped_str.slice(idx,stripped_str.indexOf('\n',idx))
				console.log([comment])
				if(comment[0]=='/'&&comment[1]=='/') {
					idx+=2
					let value=parser.get_ss_comment(comment)
					idx+=value.length+1
					return parser.accept_type(value,stripped_str,idx)
				}
			} else {
				return stripped_str.slice(0,stripped_str.indexOf('\n'))
			}
		}
	}
	let parse_state=new State
	// cspell:ignore template_varargs
	logger.info({
		filter: parse_state.parse_first_class_comment.bind(parse_state),
		url: 'pg132/The-Modding-Tree/evolution',
		msg: `
		//rust block
		r##"
		//unix hash bang a.sh file
		#!/bin/bash
		#bash
		echo "life-points : 35,050"
		cat <<EOF
			// javascript init
			template_varargs('impl_base',\${class {
			}
			})
			//rust block
			/* javascript immediate javascript_alt(alt_for("rust"),'class impl_Speed_token extends impl_base'+'{}'[0]) */
			impl Speed for token</*typescript*/upg_coins<number,number,number>/*rust*/> {
				//javascript class impl_base
				life_points(){
					u1:{
						return this.generate(32,33,52) //rust return type -> !
					}
					u2:{
						return this.generate(32,34,51) //rust return Ok("1e44493")
					}
					return new Decimal('1e35420')
				}
				//rust
			}
			//rust block end
			/*javascript immediate javascript_alt(alt_for_end('rust'),'{}'[1]) */
		EOF
		//unix hash bang end
		"##
		//rust block end
		// first_class_comment_info pad_line
		`
	})
}
main()
