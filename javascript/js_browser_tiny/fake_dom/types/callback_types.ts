import {HTMLState} from "../../page_loader/HTMLState";
import {NodeInternalData} from "../../page_loader/NodeInternalData";
export type HTMLParserCallback=(state: HTMLState, html: string) => NodeInternalData;
