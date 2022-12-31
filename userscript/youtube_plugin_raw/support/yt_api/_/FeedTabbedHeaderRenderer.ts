import {TextRunsSimpleT} from "../t/TextRunsSimple.js";
import {valid_titles_for_tabbed_header_renderer_t} from "./valid_titles_for_tabbed_header_renderer_t";

export type FeedTabbedHeaderRenderer={
	feedTabbedHeaderRenderer: {
		title: TextRunsSimpleT<valid_titles_for_tabbed_header_renderer_t[number]>;
	};
};
