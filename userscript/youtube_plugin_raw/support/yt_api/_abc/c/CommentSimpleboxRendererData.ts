// ['submitButton', 'cancelButton', 'authorThumbnail', 'placeholderText', 'trackingParams', 'avatarSize', 

import {ServiceEndpointCreateComment} from "./ServiceEndpointCreateComment";
import {TextRunsSimple} from "./TextRunsSimple.js";

//  'emojiButton', 'emojiPicker', 'aadcGuidelinesStateEntityKey']
export type CommentSimpleboxRendererData={
	submitButton: {
		buttonRenderer: {
			style:"STYLE_PRIMARY";
			size:"SIZE_DEFAULT";
			text:TextRunsSimple;
			serviceEndpoint:ServiceEndpointCreateComment;
			accessibility:{
				label: "Comment";
			};
			trackingParams:string;
		};
	};
	cancelButton:{};
	authorThumbnail: {};
	placeholderText: {};
	trackingParams: string;
	avatarSize: "SIMPLEBOX_AVATAR_SIZE_TYPE_DEFAULT";
	emojiButton: {};
	emojiPicker: {};
	aadcGuidelinesStateEntityKey: string;
};
