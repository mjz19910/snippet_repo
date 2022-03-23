import {Badge} from "../std/Badge";
export type PageLoadStateType = {
	url?: string;
	href?: string;
	no_repl?:boolean;
	follow_redirects?:boolean;
	is_top_level?: boolean;
	dom_impl_badge?: Badge;
}
