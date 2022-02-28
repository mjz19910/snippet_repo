import {RustSimpleTokenizer} from "./RustSimpleTokenizer";

interface RustSimpleParser {
	tokenizer: RustSimpleTokenizer;
	simple_type_info(str: any): any;
	result_ok_option_any_example(): any;
}
