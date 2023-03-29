import {ecma_parse_init} from "./ecma_parse_init.js";
import {parse_javascript_str} from "./ecma_parse_main.js";

ecma_parse_init();
parse_javascript_str("function main(){}");
