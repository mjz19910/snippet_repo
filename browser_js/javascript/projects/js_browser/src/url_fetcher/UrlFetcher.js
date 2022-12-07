import {parse} from 'node-html-parser';
import * as node_html_parser from "node-html-parser";


export class UrlFetcher {
	/** @param {import("../page_loader.js").PageLoaderState} state @param {typeof import("http")|typeof import("https")} cur_api */
	async_api_use_for_get(state,cur_api) {
		let t=this;
		cur_api.get(state.url,(resp) => {
			/**@type {Buffer[]} */
			let buffer_list=[];
			let data='';

			// A chunk of data has been received.
			resp.on('data',(chunk) => {
				buffer_list.push(chunk);
			});

			// The whole response has been received. Print out the result.
			resp.on('end',() => {
				data=Buffer.concat(buffer_list).toString();
				t.on_response_end(data);
			});
		}).on("error",(err) => {
			console.log("Error: "+err.message);
		});
	}

	/** @param {string} data */
	on_response_end(data) {
		/** @type {import("node-html-parser").HTMLElement} */
		const root=parse(data,{
			lowerCaseTagName: false,
			comment: true,
			voidTag: {
				closingSlash: true // optional, default false. void tag serialization, add a final slash <br/>
			},
			blockTextElements: {
				script: true,
				noscript: true,
				style: true,
				pre: true, // keep text content when parsing
			}
		});
		let state={depth:0};
		console.log(Object.keys(root));
		this.show_dom_node(state,root);
	}
	/**
	 * @param {ReturnType<typeof parse>['childNodes'][number]} element
	 * @param {{ depth: number; }} state
	 */
	show_dom_node(state,element) {
		if(element instanceof node_html_parser.HTMLElement) {
			let {childNodes,nodeType,rawTagName,classList,id}=element;
			/** @arg {import('./__global.js').DOMTokenListMore} cls */
			function simplify_class_list(cls) {
				return [...cls.values()];
			}
			let classList_=simplify_class_list(classList);
			if(state.depth > 1) {
				console.log({childNodes: childNodes.filter(/**@returns {e is node_html_parser.HTMLElement}*/e=>e instanceof node_html_parser.HTMLElement).map(e=>"<"+e.rawTagName+">"),nodeType,rawTagName,classList: classList_,id});
				return;
			} else {
				console.log({childNodes: [childNodes],nodeType,rawTagName,classList: classList_,id});
			}
			for(let i of childNodes) {
				state.depth++;
				this.show_dom_node(state,i);
				state.depth--;
			}
		}
	}
}
