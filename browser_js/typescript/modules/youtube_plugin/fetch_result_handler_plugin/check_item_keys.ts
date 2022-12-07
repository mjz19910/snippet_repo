export function check_item_keys(path:string,keys:(string | number | symbol)[]) {
	if(keys.length===1) {
		let key=keys[0]
		switch(path) {
			case 'richGridRenderer.contents[]': switch(key) {
				case 'richItemRenderer': return
				case 'continuationItemRenderer': return
			} break;
			case 'richGridRenderer.contents[].richItemRenderer': switch(key) {
				case 'richItemRenderer': return
			} break;
			case 'richItemRenderer.content': switch(key) {
				case 'videoRenderer': return
				case 'radioRenderer': return
				case 'adSlotRenderer': return
			} break;
			case 'appendContinuationItemsAction.continuationItems[]': switch(key) {
				case 'richItemRenderer': return
			} break;
			case 'appendContinuationItemsAction.continuationItems[]': switch(key) {
				case 'continuationItemRenderer': return
			} break;
		}
		console.log('content key',path,key)
	} else {
		switch(path) {
			case 'tabRenderer.content.richGridRenderer': {
				for(let key of keys) {
					switch(key) {
						case 'contents': continue
						case 'trackingParams': continue
						case 'header': continue
						case 'targetId': continue
						case 'reflowOptions': continue
					}
					console.log('iter content key',path,key)
				}
			} return
			case 'appendContinuationItemsAction': {
				for(let key of keys) {
					switch(key) {
						case 'continuationItems': continue
						case 'targetId': continue
					}
					console.log('iter content key',path,key)
				}
			} return
			case 'continuationItems[].richItemRenderer': {
				for(let key of keys) {
					switch(key) {
						case 'content': continue
						case 'trackingParams': continue
					}
					console.log('iter content key',path,key)
				}
			} return
		}
		console.log('content path',path)
	}
}
