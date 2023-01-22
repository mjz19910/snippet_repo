type G$AppendContinuationItems=
	|T$A$Continuation<"watch-next-feed",G$WatchNext>
	|T$A$Continuation<"comments-section",G$CommentsSection>
	|T$A$Continuation<`comment-replies-item-${string}`,R$Comment>
	|T$A$Continuation<"browse-feedFEwhat_to_watch",R$BrowseFeed>
	;
;