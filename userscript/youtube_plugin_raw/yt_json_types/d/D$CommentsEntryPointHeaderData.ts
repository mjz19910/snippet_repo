type D_CommentsEntryPointHeader={
	headerText: R_TextWithRuns;
	onTap: E_CommandExecutorCommand;
	trackingParams: string;
	commentCount: R_SimpleText;
	contentRenderer: R_CommentsEntryPointTeaser;
	targetId: "comments-entry-point-header-identifier";
};