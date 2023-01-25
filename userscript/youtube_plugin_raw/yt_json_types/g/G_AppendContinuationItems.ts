type G_AppendContinuationItems=
	|TA_Continuation<"watch-next-feed",G_WatchNext>
	|TA_Continuation<"comments-section",G_CommentsSection>
	|TA_Continuation<`comment-replies-item-${string}`,R_Comment>
	|TA_Continuation<"browse-feedFEwhat_to_watch",R_BrowseFeed>
	;
;