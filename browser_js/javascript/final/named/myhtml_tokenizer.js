/* cspell:words
--- version_list item 1 ---
v1 (cur): snippet_repo/javascript/final/myhtml_tokenizer.js
*/
{
	/** @type {import("./__global.js")} */
	let holder=1;
	holder;
}
`
// ***********
    // for ends
    // *********
    object[(LAST_ENTRY
                              + DATA)]                          = myhtml_tokenizer_end_state_data
    object[(LAST_ENTRY
                              + TAG_OPEN)]                      = myhtml_tokenizer_end_state_tag_open
    object[(LAST_ENTRY
                              + TAG_NAME)]                      = myhtml_tokenizer_end_state_tag_name
    object[(LAST_ENTRY
                              + END_TAG_OPEN)]                  = myhtml_tokenizer_end_state_end_tag_open
    object[(LAST_ENTRY
                              + SELF_CLOSING_START_TAG)]        = myhtml_tokenizer_end_state_self_closing_start_tag
    object[(LAST_ENTRY
                              + MARKUP_DECLARATION_OPEN)]       = myhtml_tokenizer_end_state_markup_declaration_open
    object[(LAST_ENTRY
                              + BEFORE_ATTRIBUTE_NAME)]         = myhtml_tokenizer_end_state_before_attribute_name
    object[(LAST_ENTRY
                              + ATTRIBUTE_NAME)]                = myhtml_tokenizer_end_state_attribute_name
    object[(LAST_ENTRY
                              + AFTER_ATTRIBUTE_NAME)]          = myhtml_tokenizer_end_state_after_attribute_name
    object[(LAST_ENTRY
                              + BEFORE_ATTRIBUTE_VALUE)]        = myhtml_tokenizer_end_state_before_attribute_value
    object[(LAST_ENTRY
                              + ATTRIBUTE_VALUE_DOUBLE_QUOTED)] = myhtml_tokenizer_end_state_attribute_value_double_quoted
    object[(LAST_ENTRY
                              + ATTRIBUTE_VALUE_SINGLE_QUOTED)] = myhtml_tokenizer_end_state_attribute_value_single_quoted
    object[(LAST_ENTRY
                              + ATTRIBUTE_VALUE_UNQUOTED)]      = myhtml_tokenizer_end_state_attribute_value_unquoted
    object[(LAST_ENTRY
                              + AFTER_ATTRIBUTE_VALUE_QUOTED)]  = myhtml_tokenizer_end_state_after_attribute_value_quoted

    // for ends comments
    object[(LAST_ENTRY
                              + COMMENT_START)]                 = myhtml_tokenizer_end_state_comment_start
    object[(LAST_ENTRY
                              + COMMENT_START_DASH)]            = myhtml_tokenizer_end_state_comment_start_dash
    object[(LAST_ENTRY
                              + COMMENT)]                       = myhtml_tokenizer_end_state_comment
    object[(LAST_ENTRY
                              + COMMENT_END)]                   = myhtml_tokenizer_end_state_comment_end
    object[(LAST_ENTRY
                              + COMMENT_END_DASH)]              = myhtml_tokenizer_end_state_comment_end_dash
    object[(LAST_ENTRY
                              + COMMENT_END_BANG)]              = myhtml_tokenizer_end_state_comment_end_bang
    object[(LAST_ENTRY
                              + BOGUS_COMMENT)]                 = myhtml_tokenizer_end_state_bogus_comment

    // for ends cdata
    object[(LAST_ENTRY
                              + CDATA_SECTION)]                 = myhtml_tokenizer_end_state_cdata_section

    // rcdata
    object[(LAST_ENTRY
                              + RCDATA)]                        = myhtml_tokenizer_end_state_rcdata
    object[(LAST_ENTRY
                              + RCDATA_LESS_THAN_SIGN)]         = myhtml_tokenizer_end_state_rcdata_less_than_sign
    object[(LAST_ENTRY
                              + RCDATA_END_TAG_OPEN)]           = myhtml_tokenizer_end_state_rcdata_end_tag_open
    object[(LAST_ENTRY
                              + RCDATA_END_TAG_NAME)]           = myhtml_tokenizer_end_state_rcdata_end_tag_name

    // rawtext
    object[(LAST_ENTRY
                              + RAWTEXT)]                        = myhtml_tokenizer_end_state_rawtext
    object[(LAST_ENTRY
                              + RAWTEXT_LESS_THAN_SIGN)]         = myhtml_tokenizer_end_state_rawtext_less_than_sign
    object[(LAST_ENTRY
                              + RAWTEXT_END_TAG_OPEN)]           = myhtml_tokenizer_end_state_rawtext_end_tag_open
    object[(LAST_ENTRY
                              + RAWTEXT_END_TAG_NAME)]           = myhtml_tokenizer_end_state_rawtext_end_tag_name

    // for ends plaintext
    object[(LAST_ENTRY
                              + PLAINTEXT)]                     = myhtml_tokenizer_end_state_plaintext

    // for ends doctype
    object[(LAST_ENTRY
                              + DOCTYPE)]                                 = myhtml_tokenizer_end_state_doctype
    object[(LAST_ENTRY
                              + BEFORE_DOCTYPE_NAME)]                     = myhtml_tokenizer_end_state_before_doctype_name
    object[(LAST_ENTRY
                              + DOCTYPE_NAME)]                            = myhtml_tokenizer_end_state_doctype_name
    object[(LAST_ENTRY
                              + AFTER_DOCTYPE_NAME)]                      = myhtml_tokenizer_end_state_after_doctype_name
    object[(LAST_ENTRY
                              + CUSTOM_AFTER_DOCTYPE_NAME_A_Z)]           = myhtml_tokenizer_end_state_custom_after_doctype_name_a_z
    object[(LAST_ENTRY
                              + BEFORE_DOCTYPE_PUBLIC_IDENTIFIER)]        = myhtml_tokenizer_end_state_before_doctype_public_identifier
    object[(LAST_ENTRY
                              + DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED)] = myhtml_tokenizer_end_state_doctype_public_identifier_double_quoted
    object[(LAST_ENTRY
                              + DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED)] = myhtml_tokenizer_end_state_doctype_public_identifier_single_quoted
    object[(LAST_ENTRY
                              + AFTER_DOCTYPE_PUBLIC_IDENTIFIER)]         = myhtml_tokenizer_end_state_after_doctype_public_identifier
    object[(LAST_ENTRY
                              + DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED)] = myhtml_tokenizer_end_state_doctype_system_identifier_double_quoted
    object[(LAST_ENTRY
                              + DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED)] = myhtml_tokenizer_end_state_doctype_system_identifier_single_quoted
    object[(LAST_ENTRY
                              + AFTER_DOCTYPE_SYSTEM_IDENTIFIER)]         = myhtml_tokenizer_end_state_after_doctype_system_identifier
    object[(LAST_ENTRY
                              + BOGUS_DOCTYPE)]                           = myhtml_tokenizer_end_state_bogus_doctype

    // for ends script
    object[(LAST_ENTRY
                              + SCRIPT_DATA)]                               = myhtml_tokenizer_end_state_script_data
    object[(LAST_ENTRY
                              + SCRIPT_DATA_LESS_THAN_SIGN)]                = myhtml_tokenizer_end_state_script_data_less_than_sign
    object[(LAST_ENTRY
                              + SCRIPT_DATA_END_TAG_OPEN)]                  = myhtml_tokenizer_end_state_script_data_end_tag_open
    object[(LAST_ENTRY
                              + SCRIPT_DATA_END_TAG_NAME)]                  = myhtml_tokenizer_end_state_script_data_end_tag_name
    object[(LAST_ENTRY
                              + SCRIPT_DATA_ESCAPE_START)]                  = myhtml_tokenizer_end_state_script_data_escape_start
    object[(LAST_ENTRY
                              + SCRIPT_DATA_ESCAPE_START_DASH)]             = myhtml_tokenizer_end_state_script_data_escape_start_dash
    object[(LAST_ENTRY
                              + SCRIPT_DATA_ESCAPED)]                       = myhtml_tokenizer_end_state_script_data_escaped
    object[(LAST_ENTRY
                              + SCRIPT_DATA_ESCAPED_DASH)]                  = myhtml_tokenizer_end_state_script_data_escaped_dash
    object[(LAST_ENTRY
                              + SCRIPT_DATA_ESCAPED_DASH_DASH)]             = myhtml_tokenizer_end_state_script_data_escaped_dash_dash
    object[(LAST_ENTRY
                              + SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN)]        = myhtml_tokenizer_end_state_script_data_escaped_less_than_sign
    object[(LAST_ENTRY
                              + SCRIPT_DATA_ESCAPED_END_TAG_OPEN)]          = myhtml_tokenizer_end_state_script_data_escaped_end_tag_open
    object[(LAST_ENTRY
                              + SCRIPT_DATA_ESCAPED_END_TAG_NAME)]          = myhtml_tokenizer_end_state_script_data_escaped_end_tag_name
    object[(LAST_ENTRY
                              + SCRIPT_DATA_DOUBLE_ESCAPE_START)]           = myhtml_tokenizer_end_state_script_data_double_escape_start
    object[(LAST_ENTRY
                              + SCRIPT_DATA_DOUBLE_ESCAPED)]                = myhtml_tokenizer_end_state_script_data_double_escaped
    object[(LAST_ENTRY
                              + SCRIPT_DATA_DOUBLE_ESCAPED_DASH)]           = myhtml_tokenizer_end_state_script_data_double_escaped_dash
    object[(LAST_ENTRY
                              + SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH)]      = myhtml_tokenizer_end_state_script_data_double_escaped_dash_dash
    object[(LAST_ENTRY
                              + SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN)] = myhtml_tokenizer_end_state_script_data_double_escaped_less_than_sign
    object[(LAST_ENTRY
                              + SCRIPT_DATA_DOUBLE_ESCAPE_END)]             = myhtml_tokenizer_end_state_script_data_double_escape_end

    // parse error
    object[(LAST_ENTRY
                              + PARSE_ERROR_STOP)]                          = myhtml_tokenizer_end_state_parse_error_stop
`;
// .replace(/\n\n+/g,"\n")
/** @type {string[]} */
var url_arr;
var p_res;
var px_res;
/**
 * @type {Promise<Response>[]}
 */
var promise_arr;
class class_for_var_dp {
	parser=new DOMParser
	doc_str="";
	mc=new HTMLParser("");
	/**
	 * @type {[number,number][]}
	 */
	token_result_arr=[];
	/**
	 * @type {[number,number,number][]}
	 */
	printable_token_result_arr=[];
	/**
	* @type {[string,string][]}
	*/
	token_result_print_arr=[];
}
/** @type {class_for_var_dp} */
var dp;

function make_parr() {
	let res_arr=[];
	for(let i=0;i<255;i++) {
		let str=i.toString();
		let pad=2-str.length;
		let pad_str='';
		if(pad>0) {
			pad_str='0'.repeat(pad);
		}
		res_arr[i]=stp[0]+pad_str+str+stp[2];
	}
	return res_arr;
}
let stp=["https",":","//","domain.glass","/","atl,","14","s","79","-","in","-","f","31",".","1e100.net"];

url_arr??=make_parr();

promise_arr??=url_arr.map(e => fetch(e));
async function run () {
	if(!promise_arr) return;
	p_res??=(await Promise.all(promise_arr)).map(e => e.text());
	px_res??=(await Promise.all(p_res));
	dp.doc_str=px_res.at(-1);
}
dp??=new class_for_var_dp;
//dp.doc_res=dp.parseFromString(dp.doc_str, "text/html")
class TokenizerBase {
	/**
	 * @arg {string} source
	 */
	constructor(source) {
		this.source=source;
		this.index=0;
	}
}
class CPPEnumParser extends TokenizerBase {
}
CPPEnumParser;
class HTMLParser extends TokenizerBase {
	/**
	 * @arg {string} source
	 */
	constructor(source) {
		super(source);
		let iota_count=0;
		/** @arg {number} [in_count] */
		function iota(in_count) {
			if(typeof in_count!='undefined') {
				iota_count=Number(in_count);
				if(Number.isNaN(iota_count)) {
					iota_count=0;
				}
			}
			return iota_count++;
		}
		class iotaReset {
			constructor() {
				iota_count=0;
			}
		}
		// general
		//object[DATA]                      = data
		//object[TAG_OPEN]                  = tag_open
		//object[TAG_NAME]                  = tag_name
		//object[SELF_CLOSING_START_TAG]    = self_closing_start_tag
		//object[MARKUP_DECLARATION_OPEN]   = markup_declaration_open
		//object[ATTRIBUTE_NAME]            = attribute_name
		//object[ATTRIBUTE_VALUE]           = attribute_value

		// comments
		//object[COMMENT_START]             = comment_start
		//object[COMMENT_START_DASH]        = comment_start_dash
		//object[COMMENT]                   = comment
		//object[COMMENT_END]               = comment_end
		//object[COMMENT_END_DASH]          = comment_end_dash
		//object[COMMENT_END_BANG]          = comment_end_bang
		//object[BOGUS_COMMENT]             = bogus_comment

		// cdata
		//object[CDATA_SECTION]             = cdata_section

		// rcdata
		//object[RCDATA]                    = rcdata

		// rawtext
		//object[RAWTEXT]                   = rawtext

		// plaintext
		//object[PLAINTEXT]                 = plaintext

		// doctype
		//object[DOCTYPE]                   = doctype
		//object[DOCTYPE_NAME]              = doctype_name
		//object[DOCTYPE_PUBLIC_IDENTIFIER] = doctype_public_identifier
		//object[DOCTYPE_SYSTEM_IDENTIFIER] = doctype_system_identifier

		// script
		//object[SCRIPT_DATA]               = script_data

		// parse error
		//object[PARSE_ERROR]               = parse_error
		this.static_token_obj=new class extends iotaReset {
			DATA=iota();
			TAG_OPEN=iota();
			END_TAG_OPEN=iota();
			TAG_CLOSE=iota();
			TAG_NAME=iota();
			SELF_CLOSING_START_TAG=iota();
			MARKUP_DECLARATION_OPEN=iota();
			ATTRIBUTE_NAME=iota();
			ATTRIBUTE_VALUE=iota();

			WHITESPACE_TOKEN=iota();

			EQUAL_TOKEN=iota();

			STRING_DOUBLE_TOKEN=iota();
			STRING_DOUBLE_DATA_TOKEN=iota();
			STRING_SINGLE_TOKEN=iota();
			STRING_SINGLE_DATA_TOKEN=iota();
		};

		this.static_state_obj=new class extends iotaReset {
			DATA=iota();
			STRING_DOUBLE=iota();
			STRING_SINGLE=iota();
			TAG_DATA=iota();

			MARKUP_DECLARATION_OPEN=iota();

			STATE_ENUM_END=iota();

			TAG_CLOSE=iota();

			TAG_OPEN=iota();
		};

		this.tok_map=new Map(Object.entries(this.static_token_obj));
		this.tok_map_rev=new Map(Object.entries(this.static_token_obj).map(e => [e[1],e[0]]));
		this.state_map=new Map(Object.entries(this.static_state_obj));
		this.state_map_rev=new Map(Object.entries(this.static_state_obj).map(e => [e[1],e[0]]));

		this.tokenize_state=this.static_state_obj.DATA;

		this.state_stack=[this.static_state_obj.STATE_ENUM_END];
	}
	reset() {
		this.index=0;
	}
	/**
	 * @arg {number} offset
	 */
	get(offset) {
		return this.source[this.index+offset];
	}
	/** @returns {[number,number]|null} */
	next_token() {
		let s_tok_obj=this.static_token_obj;
		let s_states=this.static_state_obj;
		if(this.tokenize_state==s_states.TAG_OPEN) {
			if(this.get(0)==' ') {
				this.index++;
				return [s_tok_obj.WHITESPACE_TOKEN,1];
			}
			if(this.get(0)=='=') {
				this.index++;
				return [s_tok_obj.EQUAL_TOKEN,1];
			}
			if(this.get(0)==='>') {
				this.index++;
				this.tokenize_state=this.state_stack_pop();
				return [s_tok_obj.END_TAG_OPEN,1];
			}
			if(this.get(0)=='"') {
				this.index++;
				this.state_stack.push(this.tokenize_state);
				this.tokenize_state=s_states.STRING_DOUBLE;
				return [s_tok_obj.STRING_DOUBLE_TOKEN,1];
			}
			let offset=0;
			while(this.get(offset).match(/[0-9a-zA-Z%,&:?()!;/|.#\-_]/)) {
				offset++;
			}
			if(offset>0) {
				this.index+=offset;
				return [s_tok_obj.DATA,offset];
			}
			return null;
		}
		if(this.tokenize_state==s_states.TAG_CLOSE) {
			if(this.get(0)==' ') {
				this.index++;
				return [s_tok_obj.WHITESPACE_TOKEN,1];
			}
			if(this.get(0)=='=') {
				this.index++;
				return [s_tok_obj.EQUAL_TOKEN,1];
			}
			if(this.get(0)==='>') {
				this.index++;
				this.tokenize_state=this.state_stack_pop();
				return [s_tok_obj.END_TAG_OPEN,1];
			}
			if(this.get(0)=='"') {
				this.index++;
				this.state_stack.push(this.tokenize_state);
				this.tokenize_state=s_states.STRING_DOUBLE;
				return [s_tok_obj.STRING_DOUBLE_TOKEN,1];
			}
			let offset=0;
			while(this.get(offset).match(/[0-9a-zA-Z=%,&:? ()!;/|.#\-_]/)) {
				offset++;
			}
			if(offset>0) {
				this.index+=offset;
				return [s_tok_obj.DATA,offset];
			}
			return null;
		}
		if(this.tokenize_state==s_states.STRING_DOUBLE) {
			let offset=0;
			if(this.get(0)=='"') {
				this.index++;
				this.tokenize_state=this.state_stack_pop();
				return [s_tok_obj.STRING_DOUBLE_TOKEN,1];
			}
			while(this.get(offset).match(/[0-9a-zA-Z=%,&:? ()!;'/|.#\-_]/)) {
				offset++;
			}
			if(offset>0) {
				this.index+=offset;
				return [s_tok_obj.STRING_DOUBLE_DATA_TOKEN,offset];
			}
			return null;
		}
		if(this.tokenize_state==s_states.MARKUP_DECLARATION_OPEN) {
			if(this.get(0)==' ') {
				this.index++;
				return [s_tok_obj.WHITESPACE_TOKEN,1];
			}
			if(this.get(0)==='>') {
				this.index++;
				this.tokenize_state=this.state_stack_pop();
				return [s_tok_obj.END_TAG_OPEN,1];
			}
			let offset=0;
			while(this.get(offset).match(/[.0-9a-zA-Z\-]/)) {
				offset++;
			}
			if(offset>0) {
				this.index+=offset;
				return [s_tok_obj.DATA,offset];
			}
			return null;
		}
		if(this.tokenize_state==s_states.DATA) {
			if(this.get(0)=='<'&&this.get(1)=='!') {
				this.index+=2;
				this.state_stack.push(this.tokenize_state);
				this.tokenize_state=s_states.MARKUP_DECLARATION_OPEN;
				return [s_tok_obj.MARKUP_DECLARATION_OPEN,2];
			}
			if(this.get(0)=='<'&&this.get(1)=='/') {
				this.index+=2;
				this.state_stack.push(this.tokenize_state);
				this.tokenize_state=s_states.TAG_CLOSE;
				return [s_tok_obj.TAG_CLOSE,2];
			}
			//if(this.get(0) == '/' && this.get(1) == '>'){
			//	this.index += 2
			//	this.tokenize_state = this.state_stack_pop()
			//	return [s_tok_obj.SELF_CLOSING_START_TAG, 2]
			//}
			if(this.get(0)==='<') {
				this.index++;
				this.state_stack.push(this.tokenize_state);
				this.tokenize_state=s_states.TAG_OPEN;
				return [s_tok_obj.TAG_OPEN,1];
			}
			//if (this.get(0) === '>') {
			//	this.index++
			//	this.tokenize_state = this.state_stack_pop()
			//	return [s_tok_obj.END_TAG_OPEN, 1]
			//}
			//if (this.get(0) == '"') {
			//	this.index++
			//	this.state_stack.push(this.tokenize_state)
			//	this.tokenize_state = s_states.STRING_DOUBLE
			//	return [s_tok_obj.STRING_DOUBLE_TOKEN, 1]
			//}
			let offset=0;
			for(;;) {
				let is_ok=false;
				if((this.index+offset+1)>this.source.length) {
					break;
				}
				if(this.get(offset).charCodeAt(0)==8250) {
					is_ok=true;
				}
				if(this.get(offset).charCodeAt(0)==169) {
					is_ok=true;
				}
				if(this.get(offset).match(/[ >+"_/.0-9a-zA-Z\-|\[\]{}:!?%+&;\n*#@()=,']/)) {
					is_ok=true;
				}
				if(!is_ok) {
					break;
				}
				offset++;
			}
			if(offset>0) {
				this.index+=offset;
				return [s_tok_obj.DATA,offset];
			}
		}
		return null;
	}
	state_stack_pop() {
		let val=this.state_stack.pop();
		if(val===void 0) throw new Error("State stack underflow");
		return val;
	}
	/** @arg {[number,number]} token_item @returns {[string,string]} */
	printable(token_item) {
		let rev_item=this.tok_map_rev.get(token_item[0]);
		if(!rev_item) throw new Error("unable to print: "+token_item[0]);
		return [rev_item,this.source.slice(this.index-token_item[1],this.index)];
	}
}

dp.mc=new HTMLParser(dp.doc_str);

dp.token_result_arr=[];

let state={};
void state;

for(let does_log=false;;) {
	let token_item=dp.mc.next_token();
	if(dp.mc.index>=dp.mc.source.length) {
		break;
	}
	if(!token_item) {
		console.log('unk',JSON.stringify(dp.mc.get(0)));
		break;
	}
	let printable_token=dp.mc.printable(token_item);
	let s_obj=dp.mc.static_state_obj;
	let sm=dp.mc.state_map;
	void sm;
	let sr=dp.mc.state_map_rev;
	let cur_st=dp.mc.tokenize_state;
	if(s_obj.TAG_OPEN==cur_st&&printable_token[1]==='script') {
		dp.mc.index=dp.mc.source.indexOf('</script>')+1;
	}
	if(does_log) {
		console.log('tok&state',cur_st,sr.get(cur_st),printable_token);
	}
	/** @type {[number,number,number]} */
	let printable_token_value=[...token_item,dp.mc.index]
	dp.printable_token_result_arr.push(printable_token_value);
}
//for (let i = 13; i > 0; i--) {
//	let token_item = dp.token_result_arr[dp.token_result_arr.length - i]
//	dp.mc.index = token_item[2]
//	console.log(dp.mc.printable(token_item), dp.mc.get(0))
//}

dp.token_result_print_arr=dp.printable_token_result_arr.map(token_item => {
	dp.mc.index=token_item[2];
	return dp.mc.printable([token_item[0],token_item[1]]);
}
);
console.log(dp.token_result_print_arr);