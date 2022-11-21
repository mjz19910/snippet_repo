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
		this.show_dom_node(root);
		console.log(Object.keys(root));
		/** @arg {typeof root['classList']} cls */
		for(let element of root.childNodes) {
			this.show_dom_node(element);
		}
	}
	/** @param {ReturnType<typeof parse>['childNodes'][number]} element */
	show_dom_node(element) {
		if(element instanceof node_html_parser.HTMLElement) {
			let {childNodes: root_child_nodes,nodeType,rawTagName,classList,id}=element;
			/** @type {import("node-html-parser")|null} */
			let xx=null;
			/** @arg {DOMTokenList} cls */
			function simplify_class_list(cls) {
				return [...cls.values()];
			}
			let classList_=simplify_class_list(classList);
			console.log({childNodes: [root_child_nodes],nodeType,rawTagName,classList: classList_,id});
		}
	}
}
