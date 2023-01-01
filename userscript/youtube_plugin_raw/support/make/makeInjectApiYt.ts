import {inject_api_yt} from "../../youtube_plugin.user.js";

declare global {
	type InjectApiYt=typeof inject_api_yt;
	const InjectApiYt:InjectApiYt;
}

export {}
