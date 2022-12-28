import {key_simpleText,SimpleText} from "../s/SimpleText.js";
import {TrackingParams} from "../t/TrackingParams.js";
import {IconExternalLink} from "../i/IconExternalLink";


export interface ButtonRendererData extends TrackingParams {
	"style": "STYLE_LIGHT_TEXT";
	"text": SimpleText<key_simpleText,"Visit site">;
	"icon": IconExternalLink;
	"iconPosition": "BUTTON_ICON_POSITION_TYPE_RIGHT_OF_TEXT";
}
