import {RichGridRenderer} from "./RichGridRenderer"

export class HandleRichGridRenderer {
	static debug=false;
	static run(path: string,object: RichGridRenderer) {
		let renderer=object
		if(this.debug)
			console.log('run handler',path)
		if(renderer.masthead) {
			if(renderer.masthead.videoMastheadAdV3Renderer) {
				let {videoMastheadAdV3Renderer: _,...masthead}=renderer.masthead
				console.log('masthead',masthead)
				renderer.masthead=masthead
			}
		}
		if(renderer.contents) {
			this.on_contents(object)
		}
	}
	static check_item_keys(path: string,keys: string[]) {
		/**@type {string[]|string|null} */
		let key: string[]|string|null=null
		if(keys.length===1) {
			key=keys[0]
		} else {
			key=keys
		}
		switch(path) {
			case 'richItemRenderer.content':
				if(key==='videoRenderer')
					return
			case 'richGridRenderer.contents[]':
				if(key==='richItemRenderer')
					return
		}
		if(this.debug)
			console.log('content keys',path,key)
	}
	static on_contents(renderer: RichGridRenderer) {
		renderer.contents=renderer.contents.filter(content_item => {
			let {richItemRenderer}=content_item
			this.check_item_keys('richGridRenderer.contents[]',Object.keys(content_item))
			// WARNING: This function is filtering an array (was just "return;")
			if(!richItemRenderer)
				return true
			let {content}=richItemRenderer
			if(!content)
				return true
			this.check_item_keys('richItemRenderer.content',Object.keys(content))
			if(content.displayAdRenderer)
				return false
			return true
		})
	}
}
