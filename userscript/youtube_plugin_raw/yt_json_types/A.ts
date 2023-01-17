namespace A {
	type TestKeys=[
		"panelIdentifier,header,content,targetId,visibility,onShowCommands,loggingDirectives",
		"content,targetId,visibility,loggingDirectives"
	];
	type V<T extends Extract<keyof TestKeys,number>>=Split<TestKeys[T]>[number];
	export type Ut=Extract<EngagementPanelSectionList,{veType:number}>[V<1>];
	export type U2=Exclude<EngagementPanelSectionList,{veType:number}>[V<0>];
}
