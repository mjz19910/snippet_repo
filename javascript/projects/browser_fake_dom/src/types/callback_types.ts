import {html_parser_callback} from "../../../tiny_html_parser/html_parser_callback.js"

export type HTMLParserCallback=(...args: [HTMLState, Uint8Array]) => ReturnType<typeof html_parser_callback>
