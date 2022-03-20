import {HTMLState} from "../../page_loader/HTMLState";
export type HTMLParserCallback=(state: HTMLState, html: string) => NodeInternalData;
