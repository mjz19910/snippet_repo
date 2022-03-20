import {NodeInternalData} from "page-loader/NodeInternalData";
import {HTMLState} from "../../tiny_html_parser/HTMLState";
export type HTMLParserCallback=(state: HTMLState, html: string) => NodeInternalData;
