import {check_item_keys} from "./check_item_keys.js"
import {RichGridRenderer} from "./RichGridRenderer.js"

export class HandleRichGridRenderer {
	static debug=false
	static run(path: string,renderer: RichGridRenderer) {
		let path_parts=path.split(".")
		let sub_path=path_parts.slice(-3).join(".")
		check_item_keys(sub_path,Object.keys(renderer))
		if(this.debug) console.log('run handler',path)
		if(renderer.masthead) {
			if(renderer.masthead.videoMastheadAdV3Renderer) {
				let {videoMastheadAdV3Renderer: _,...masthead}=renderer.masthead
				console.log('masthead',masthead)
				renderer.masthead=masthead
			}
		}
		if(renderer.contents) this.on_contents(renderer)
	}
	static on_contents(renderer: RichGridRenderer) {
		renderer.contents=renderer.contents.filter(content_item => {
			let {richItemRenderer}=content_item
			check_item_keys('richGridRenderer.contents[]',Object.keys(content_item))
			// WARNING: This function is filtering an array (was just "return;")
			if(!richItemRenderer) return true
			check_item_keys('richGridRenderer.contents[].richItemRenderer',Object.keys(content_item))
			let {content}=richItemRenderer
			if(!content) return true
			check_item_keys('richItemRenderer.content',Object.keys(content))
			if(content.adSlotRenderer) return false
			return true
		})
	}
}
