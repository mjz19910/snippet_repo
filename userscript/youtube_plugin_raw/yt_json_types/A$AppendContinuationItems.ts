type A$AppendContinuationItems=
	|T$A$Continuation<"watch-next-feed",G$WatchNext>
	|T$A$Continuation<"comments-section",G$CommentsSection>
	|A$CommentRepliesItem
	|A$BrowseFeedAction
	;
	type UU=T$A$Continuation<"comments-section",G$CommentsSection>;