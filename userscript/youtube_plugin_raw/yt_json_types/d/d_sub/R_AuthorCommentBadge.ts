type D_BasicColorPaletteData={
	backgroundColor: 4287137928;
	foregroundTitleColor: 4294967295;
};
type R_BasicColorPaletteData={basicColorPaletteData: D_BasicColorPaletteData;};
type D_AuthorCommentBadge={
	icon: T_Icon<"CHECK_CIRCLE_THICK">;
	color: R_BasicColorPaletteData;
	authorText: G_Text;
	authorEndpoint: E_VE3611;
	iconTooltip: "Verified";
};
type R_AuthorCommentBadge={authorCommentBadgeRenderer: D_AuthorCommentBadge;};
