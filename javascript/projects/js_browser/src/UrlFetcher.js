import {parse} from 'node-html-parser';


export class UrlFetcher {
	/** @param {import("./page_loader").PageLoaderState} state @param {typeof import("http")} cur_api */
	async_api_use_for_get(state,cur_api) {
		let t=this;
		cur_api.get(state.url,(resp) => {
			/**@type {Buffer[]} */
			let buffer_list=[]
			let data='';

			// A chunk of data has been received.
			resp.on('data',(chunk) => {
				buffer_list.push(chunk)
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
		let {childNodes: root_child_nodes,nodeType,rawTagName,classList,id}=root;
		/** @arg {typeof root['classList']} cls */
		function simplify_class_list(cls) {
			return [...cls.values()];
		}
		let classList_=simplify_class_list(classList);
		console.log(Object.keys(root));
		console.log({childNodes: [root_child_nodes],nodeType,rawTagName,classList: classList_,id});
		for(let element of root_child_nodes) {
			console.log(element);
		}
	}
	/** @param {ReturnType<typeof parse>} element */
	show_dom_node(element) {
		let root=element;
		let {childNodes: root_child_nodes,nodeType,rawTagName,classList,id}=root;
		/** @arg {typeof root['classList']} cls */
		function simplify_class_list(cls) {
			return [...cls.values()];
		}
		let classList_=simplify_class_list(classList);
		console.log(Object.keys(root));
		console.log({childNodes: [root_child_nodes],nodeType,rawTagName,classList: classList_,id});
	}
}
