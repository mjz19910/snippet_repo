// deno-lint-ignore-file
import {YtCurrentPage} from "./YtCurrentPage.ts";

export interface YtdPageManagerElementInterface extends HTMLElement {
	getCurrentPage(): YtCurrentPage;
	getCurrentData(): {};
}
