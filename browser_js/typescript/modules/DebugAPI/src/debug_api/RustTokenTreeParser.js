import {RustSimpleTokenizer} from "./RustSimpleTokenizer";

export class RustTokenTreeParser {
	tokenizer=new RustSimpleTokenizer;
	/**
	 * @param {string} str
	 */
	simple_type_info(str) {
		// let iter_index = 0
		this.tokenizer.reset(str);
		let token_vec=this.tokenizer.str_to_tokens(str);
		let tt_root=this.tokenizer.into_tt(token_vec);
		let trg_obj={
			body: tt_root[0]
		};
		return trg_obj;
	}
	result_ok_option_any_example() {
		let simple_type_info_str="{value:Result<_, ()>={discriminant:Result::discriminant=Result::Ok,value:Option<any>={discriminant:Option::discriminant=Option::Some,value=root.value}}}";
		let ret=this.simple_type_info(simple_type_info_str);
		return ret;
	}
}
