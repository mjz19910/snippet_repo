import {HandleRichGridRenderer} from "./HandleRichGridRenderer"
import {InitialData} from "./InitialData"
import {RichGridRenderer} from "./RichGridRenderer"
import {YTIterateAllBase} from "./YTIterateAllBase"

export class YTFilterHandlers extends YTIterateAllBase {
	richGridRenderer(path: string,renderer: RichGridRenderer) {
		HandleRichGridRenderer.run(path,renderer)
	}
	itemSectionRenderer(path: string,renderer: {contents: {}[]}) {
		this.default_iter(path,renderer)
		if(renderer.contents===void 0)
			return
		renderer.contents=renderer.contents.filter((item) => {
			let keys=Object.keys(item)
			for(let key of keys) {
				switch(key) {
					case 'promotedSparklesWebRenderer': return false
					case 'compactPromotedVideoRenderer': return false
				}
			}
			return true
		})
	}
	on_v1_player(_path: string,data: {playerAds?: any[]; adPlacements?: any[]}) {
		if(data.playerAds) {
			data.playerAds=[]
		}
		if(data.adPlacements) {
			data.adPlacements=[]
		}
	}
	on_handle_api(data: {},url_as_URL: URL) {
		const debug=false
		let path_url=url_as_URL.pathname
		if(path_url==="/getDatasyncIdsEndpoint")
			return
		let api_parts=url_as_URL.pathname.slice(1).split("/")
		if(api_parts[0]!=='youtubei') {
			console.log('unknown api path',url_as_URL.pathname)
			return
		}
		if(api_parts[1]!=='v1') {
			console.log('unknown api path',url_as_URL.pathname)
			return
		}
		let api_path=api_parts.slice(2).join(".")
		debug&&console.log('on_handle_api api_path',api_parts.slice(0,2).join("/"),api_path)
		this.default_iter(api_path,data)
		switch(api_parts[2]) {
			case 'player': this.on_v1_player(api_path,data); break
		}
	}
	handle_page_type(data: {},page_type: string,response_type: string) {
		const debug=false
		debug&&console.log('handle_page_type with page_type and response_type',page_type,response_type)
		this.default_iter(page_type,data)
		switch(response_type) {
			case 'response': break
			case 'playerResponse': switch(page_type) {
				case 'watch': this.on_v1_player(page_type,data); break
			}
		}
	}
	on_initial_data<A extends InitialData, B, C extends (this:B) => A>([target, thisArgument, argumentsList]: [C,B,Parameters<C>]) {
		let ret=target.apply(thisArgument, argumentsList)
		if(ret.response) {
			console.log('initial page info:',ret)
			try {
				if(window.ytPageType) {
					if(ret.page==="browse") {
						this.handle_page_type(ret.response,window.ytPageType,'response')
						if(ret.playerResponse) {
							console.log("playerResponse in ret.page === 'browse'")
							debugger
						}
					} else {
						console.log('page info ret type',ret.page)
						this.handle_page_type(ret.response,window.ytPageType,'response')
						this.handle_page_type(ret.playerResponse,window.ytPageType,'playerResponse')
					}
				}
			} catch(err) {
				console.log('init filter error')
				console.log(err)
			}
		} else {
			console.log("Can't handle return value",ret)
		}
		return ret
	}
}
