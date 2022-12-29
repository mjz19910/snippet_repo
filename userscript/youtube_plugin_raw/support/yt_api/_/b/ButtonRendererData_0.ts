import {IconExternalLink} from "../../_abc/i/IconExternalLink";
import {key_simpleText,SimpleText} from "../../_abc/s/SimpleText.js";
import {TrackingParams} from "../../_abc/t/TrackingParams.js";
export type StyleLightTextButton={
	trackingParams: string;
	style: "STYLE_LIGHT_TEXT";
	text: SimpleText<key_simpleText,"Visit site">;
	icon: IconExternalLink;
	iconPosition: "BUTTON_ICON_POSITION_TYPE_RIGHT_OF_TEXT";
};
export interface ButtonRendererData extends TrackingParams {
	style: "STYLE_LIGHT_TEXT";
	text: SimpleText<key_simpleText,"Visit site">;
	icon: IconExternalLink;
	iconPosition: "BUTTON_ICON_POSITION_TYPE_RIGHT_OF_TEXT";
}
