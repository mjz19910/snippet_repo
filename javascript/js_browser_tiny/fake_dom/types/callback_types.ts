import {HTMLState} from "mjz-html-parser/HTMLState";
import {NodeInternalData} from "page-loader/NodeInternalData";
export type HTMLParserCallback=(state: HTMLState, html: string) => NodeInternalData;
