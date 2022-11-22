/**
 * @author mjz19910
 * @copyright MIT
 * @description Read the library-ms xml format into a json compatible format
 * created by iterating over the xml tree.
 * When a duplicate tag is found in the xml tree, convert the value corresponding to
 * that tag into an array
 */
async function x() {
	/** @type {import("./__global.js").Holder} */
	let holder={
		use() {}
	};
	holder.use();
	let r;
	const open_workspace=true;
	if(open_workspace) {
		r=await fetch("Workspaces.library-ms");
	} else {
		r=await fetch("Documents.library-ms");
	}
	let text=await r.text();
	let dom_parser=new DOMParser;
	xml_document=dom_parser.parseFromString(text,"application/xml");
	function do_iter(obj,cb,c=0,kp=[]) {
		if(typeof obj==='string') {
			return;
		}
		let kl=Object.keys(obj);
		if(!c)
			cb(obj);
		if(c>12) {
			console.log('deep',obj);
			return;
		}
		for(let i of kl) {
			obj[i]=cb(obj,i,kp.slice());
			kp.push(i);
			do_iter(obj[i],cb,c+1,kp);
			kp.pop();
		}
	}
	window.obj??={};
	let obj=window.obj;
	let root_element=xml_document.firstElementChild;
	obj[root_element.tagName]=root_element.children;
	do_iter(obj,function(obj,key,p) {
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
			function append_from_list(obj,key,list) {
				let cur;
				if(obj instanceof Array) {
					obj.push(cur={});
				} else {
					cur=obj;
				}
				cur[key]=list;
			}
			/**@param {Element} element */
			function append_from_children(obj,element) {
				append_from_list(obj,element.tagName,element.children);

			}
			/**@argument {Node} node */
			function append_from_childNodes(obj,node) {
				append_from_list(obj,node.nodeName,node.childNodes);
			}
			for(let i of e) {
				if(count++>0) {
					obj=[obj];
				}
				if(i instanceof CDATASection) {
					console.log(e);
					continue;
				}

				if(i instanceof Element) {
					let cur_value_vec=i.children;
					append_from_children(obj,cur_value_vec);
					continue;
				}
				append_from_childNodes(obj,cur_value_vec);
			}
			return obj;
		}
		console.log('auto',e.tagName,e,p);
		obj[e.tagName]=e.children;
		return obj;
	});
	const con_list=obj.libraryDescription.searchConnectorDescriptionList;
	let binary_data,overflow,b32_data;
	function get_data_slice(list_item) {
		let con_desc=list_item.searchConnectorDescription;
		let simple_loc=con_desc.simpleLocation;
		let ser=simple_loc.serialized;
		let un_ser=atob(ser);
		let un_ser_vec=[...un_ser];
		let bin_ser_data=un_ser_vec.map(e => e.charCodeAt(0));
		binary_data=new Uint8Array(bin_ser_data);
		overflow=binary_data.length%4;
		b32_data=new Uint32Array(binary_data.buffer,0,(binary_data.length-overflow)/4);
		let offset=0;
		//typeof b32_data.slice(offset,offset+6) == 'static'
		offset+=6;
		//typeof b32_data.slice(offset,offset+8) == 'dynamic'
		offset+=8;
		//typeof b32_data.slice(offset,offset+16) == 'static'
		offset+=16;
		//b32_data.slice(offset,offset+8); // disk description
		//[1560281088, 2246618090, 609064146, 1217224307, 297022384, 50240, 0, 0] === C:
		//[318767104,  1418456472, 539076172, 2638738344, 561747559, 50240, 0, 0] === D:
		offset+=4;
		// length is different
		return b32_data.slice(offset,offset+32);
	}
	for(let list_item of con_list) {
		let res=get_data_slice(list_item);
		let max_idx=res.indexOf(3092);
		/*
		297022384, 50240, 0, 0, 3654636608, 4039168456, 66052,    3232939776, ---MISSING---  0,          2147680256, 128, 0, 0, 0, 0, 0, 0, 3426763009, 2164267284,                       1100992, 1077936129, 3092, 0,
		561747559, 50240, 0, 0, 2648511296, 2241535419, 16882717, 16786432,    11520771,     0,          185073664,  0,   0, 0, 0, 0, 0, 0, 3238203648, 454614144,  3162505475, 16848916, 1100928, 1480589314, 3092, 0,
		*/
		console.log([...res].slice(0,max_idx+4));
		// after 1073741824 is probably the library name
		//1100992, 1346371585, 3092
		// ^ probably url type? === [val]::{[GUID]}
	}
}
x();
