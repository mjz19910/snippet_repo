// ['submitButton', 'cancelButton', 'authorThumbnail', 'placeholderText', 'trackingParams', 'avatarSize', 
//  'emojiButton', 'emojiPicker', 'aadcGuidelinesStateEntityKey']
export type CommentSimpleboxRendererData={
	submitButton: {
		buttonRenderer: {
			style:"STYLE_PRIMARY";
			size:"SIZE_DEFAULT";
			text:{};
			serviceEndpoint:{
				createCommentEndpoint: {
					createCommentParams: {};
				};
			};
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
