import {R_Button,D_Thumbnail} from "../../../d/group_D.js";
import {G_Text} from "../../../ghi/group_G.js";
import {R_EmojiPicker} from "../../group_R.js";

export type D_CommentReplyDialog={
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
export type R_CommentReplyDialog={commentReplyDialogRenderer: D_CommentReplyDialog;};
