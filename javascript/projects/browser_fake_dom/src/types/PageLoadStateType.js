import {Badge} from "../Badge.js/index.js";

export class PageLoadStateType {
    /**@type {Badge|undefined} */
    dom_impl_badge;
    no_repl=false;
    /**@type {string|undefined} */
    url;
    /**@type {string|undefined} */
    href;
    /**@type {boolean|undefined} */
    follow_redirects;
    /**@type {boolean|undefined} */
    is_top_level;
}
