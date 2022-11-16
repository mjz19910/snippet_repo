import {TinyHTMLParserState} from "../../../tiny_html_parser/TinyHTMLParserState.js";
import {html_parser_callback} from "../../../tiny_html_parser/html_parser_callback.js";

export type HTMLParserCallback=(...args: Parameters<typeof html_parser_callback>) => Promise<{} | null>
