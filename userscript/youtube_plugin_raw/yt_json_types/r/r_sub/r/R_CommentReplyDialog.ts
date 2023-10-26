import {R_Button,D_Thumbnail} from "../../../d/group_D.ts";
import {G_Text} from "../../../ghi/group_G.ts";
import {R_EmojiPicker} from "../../group_R.ts";

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
