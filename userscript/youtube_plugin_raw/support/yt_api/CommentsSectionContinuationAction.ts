import {CommentsSectionItem} from "./CommentsSectionItem";


export type CommentsSectionContinuationAction={
	targetId: "comments-section";
	continuationItems: CommentsSectionItem[];
};
