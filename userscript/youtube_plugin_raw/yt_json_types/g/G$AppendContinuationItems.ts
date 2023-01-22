type G_AppendContinuationItems=
	|T$A_Continuation<"watch-next-feed",G_WatchNext>
	|T$A_Continuation<"comments-section",G_CommentsSection>
	|T$A_Continuation<`comment-replies-item-${string}`,R_Comment>
	|T$A_Continuation<"browse-feedFEwhat_to_watch",R_BrowseFeed>
	;
;