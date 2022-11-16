
export class HTMLLexerResult {
	/**
	 * @param {HTMLLexerState} lexer
	 * @param {(HTMLSpecialLex | HTMLDataLex | HTMLEntityLex | HTMLTagLex)[]} elements
	 * @param {NodeInternalData} document_root
	 */
	constructor(lexer,elements,document_root) {
		this.lex_arr=lexer.lex_arr;
		this.elements=elements;
		this.doc_root=document_root;
	}
}
