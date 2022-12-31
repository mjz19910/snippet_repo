/**
 * @author mjz19910
 * @copyright MIT
 * @description Read the library-ms xml format into a json compatible format
 * created by iterating over the xml tree.
 * When a duplicate tag is found in the xml tree, convert the value corresponding to
 * that tag into an array */
async function x() {
	/** @type {import("./__global.js")} */
	let holder=1;
	holder;
	let r;
	const open_workspace=true;
	if(open_workspace) {
		r=await fetch("Workspaces.library-ms");
	} else {
		r=await fetch("Documents.library-ms");
	}
	let text=await r.text();
	let dom_parser=new DOMParser;
	let xml_document=dom_parser.parseFromString(text,"application/xml");
	/** @arg {{ [x: string]: any; }} obj
	 * @arg {(obj: {}, key: string, p: string[])=>{}} cb
	 * @returns {{}[][]} */
	function do_iter(obj,cb,c=0,/** @type {string[]} */kp=[]) {
		let out=[];
		if(typeof obj==='string') {
			return [];
		}
		let kl=Object.keys(obj);
		if(!c)
			out.push([kp.join("."),cb(obj,"",[])]);
		if(c>12) {
			console.log('deep',obj);
			return [];
		}
		for(let i of kl) {
			obj[i]=cb(obj,i,kp.slice());
			kp.push(i);
			let ret=do_iter(obj[i],cb,c+1,kp);
			out.push([kp.join("."),ret]);
			kp.pop();
		}
		return out;
	}
	let root_element=xml_document.firstElementChild;
	if(!root_element) {
		console.log("xml document missing child");
		return;
	}
	let obj={
		[root_element.tagName]: root_element.children
	};
	let res=do_iter(obj,function(/** @type {any} */ obj,/** @type {any} */ key,/** @type {any} */ p) {
		let e=obj[key];
		if(!p) {
			return e;
		}
		if(typeof e=='string')
			return e;
		if(typeof e=='boolean')
			return e;
		if(e instanceof Array) {
			return e;
		}
		if(obj instanceof Array) {
			return e;
		}
		if(e instanceof NodeList||e instanceof HTMLCollection) {
			let obj={};
			let count=0;
			if(e.length==1) {
				if(e[0] instanceof CDATASection)
					return e[0].nodeValue;
				if(e[0].nodeName==='#text') {
					return e[0].nodeValue;
				}
			}
			/** @arg {({[x:string]:HTMLCollection | NodeListOf<ChildNode>}[])|{[x:string]:HTMLCollection | NodeListOf<ChildNode>}} obj
			 * @arg {string} key
			 * @arg {HTMLCollection | NodeListOf<ChildNode>} list */
			function append_from_list(obj,key,list) {
				if(obj instanceof Array) {
					obj.push({
						[key]:list,
					});
				} else {
					obj[key]=list;
				}
			}
			/** @arg {Element} element
			 * @arg {{}} obj */
			function append_from_children(obj,element) {
				append_from_list(obj,element.tagName,element.children);
			}
			/** @argument {Node} node
			 * @arg {{}} obj */
			function append_from_childNodes(obj,node) {
				append_from_list(obj,node.nodeName,node.childNodes);
			}
			/** @arg {HTMLCollection | NodeList} e */
			function *iterator_of_html_array(e) {
				for(let i=0;i<e.length;i++) yield e[i];
			}
			for(let i of iterator_of_html_array(e)) {
				if(count++>0) {
					obj=[obj];
				}
				if(i instanceof CDATASection) {
					console.log(e);
					continue;
				}
				if(i instanceof Element) {
					append_from_children(obj,i);
					continue;
				}
				append_from_childNodes(obj,i);
			}
			return obj;
		}
		console.log('auto',e.tagName,e,p);
		obj[e.tagName]=e.children;
		return obj;
	});
	console.log("res",res);
	// const lib_desc=obj.libraryDescription;
	// const con_list=lib_desc.searchConnectorDescriptionList;
	// let binary_data,overflow,b32_data;
	// /** @arg {{ searchConnectorDescription: any; }} list_item */
	// function get_data_slice(list_item) {
	// 	let con_desc=list_item.searchConnectorDescription;
	// 	let simple_loc=con_desc.simpleLocation;
	// 	let ser=simple_loc.serialized;
	// 	let un_ser=atob(ser);
	// 	let un_ser_vec=[...un_ser];
	// 	let bin_ser_data=un_ser_vec.map(e => e.charCodeAt(0));
	// 	binary_data=new Uint8Array(bin_ser_data);
	// 	overflow=binary_data.length%4;
	// 	b32_data=new Uint32Array(binary_data.buffer,0,(binary_data.length-overflow)/4);
	// 	let offset=0;
	// 	//typeof b32_data.slice(offset,offset+6) == 'static'
	// 	offset+=6;
	// 	//typeof b32_data.slice(offset,offset+8) == 'dynamic'
	// 	offset+=8;
	// 	//typeof b32_data.slice(offset,offset+16) == 'static'
	// 	offset+=16;
	// 	//b32_data.slice(offset,offset+8); // disk description
	// 	//[1560281088, 2246618090, 609064146, 1217224307, 297022384, 50240, 0, 0] === C:
	// 	//[318767104,  1418456472, 539076172, 2638738344, 561747559, 50240, 0, 0] === D:
	// 	offset+=4;
	// 	// length is different
	// 	return b32_data.slice(offset,offset+32);
	// }
	// for(let list_item of con_list) {
	// 	let res=get_data_slice(list_item);
	// 	let max_idx=res.indexOf(3092);
	// 	/*
	// 	297022384, 50240, 0, 0, 3654636608, 4039168456, 66052,    3232939776, ---MISSING---  0,          2147680256, 128, 0, 0, 0, 0, 0, 0, 3426763009, 2164267284,                       1100992, 1077936129, 3092, 0,
	// 	561747559, 50240, 0, 0, 2648511296, 2241535419, 16882717, 16786432,    11520771,     0,          185073664,  0,   0, 0, 0, 0, 0, 0, 3238203648, 454614144,  3162505475, 16848916, 1100928, 1480589314, 3092, 0,
	// 	*/
	// 	console.log([...res].slice(0,max_idx+4));
	// 	// after 1073741824 is probably the library name
	// 	//1100992, 1346371585, 3092
	// 	// ^ probably url type? === [val]::{[GUID]}
	// }
}
x();
