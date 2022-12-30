import {FilterHandlers} from "../../../../youtube_plugin.user.js";

export type UrlTypes=ReturnType<FilterHandlers["get_url_type"]>["name"];
