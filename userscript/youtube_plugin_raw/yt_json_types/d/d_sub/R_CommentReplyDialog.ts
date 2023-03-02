type D_CommentReplyDialog={
	replyButton: R_Button;
	cancelButton: R_Button;
	authorThumbnail: D_Thumbnail;
	editableText?: G_Text;
	placeholderText: G_Text;
	errorMessage: G_Text;
	emojiButton: R_Button;
	emojiPicker: R_EmojiPicker;
	aadcGuidelinesStateEntityKey: string;
};
type R_CommentReplyDialog={commentReplyDialogRenderer: D_CommentReplyDialog;};
