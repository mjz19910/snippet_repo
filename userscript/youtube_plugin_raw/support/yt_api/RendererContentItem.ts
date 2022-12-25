import {RichSectionRendererHolder,CommentsHeaderRendererHolder,CommentThreadRendererHolder,ContinuationItemRendererHolder,CompactVideoRendererHolder,CompactPlaylistRendererHolder} from "./__global";


export type RendererContentItem=
	RichItemRendererHolder|
	RichSectionRendererHolder|
	CommentsHeaderRendererHolder|
	CommentThreadRendererHolder|
	ContinuationItemRendererHolder|
	CompactVideoRendererHolder|
	CompactPlaylistRendererHolder|
	never;
