import {TextDecoderExt} from "../zb_plugin_types/TextDecoderExt.js";

export type D_JsonReplacerArgs={
	text_decoder: TextDecoderExt;
	cf: string;
	keys: string[];
	is_root: boolean;
};
