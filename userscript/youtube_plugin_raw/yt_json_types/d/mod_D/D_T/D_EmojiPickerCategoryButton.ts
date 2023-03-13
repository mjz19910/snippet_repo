type D_EmojiPickerCategoryButton={
	categoryId: T_IdTemplate<"UC",D_UserIdStr>;
	icon: T_Icon<"SPONSORSHIP_STAR">;
	tooltip: "Custom emoji";
	accessibility: TD_Accessibility<"Custom emoji">;
}|{
	categoryId: T_IdTemplate<"UC",D_UserIdStr>;
	icon: T_Icon<"VIDEO_YOUTUBE">;
	tooltip: "YouTube";
	accessibility: TD_Accessibility<"YouTube">;
}|{
	categoryId: "people";
	icon: T_Icon<"EMOJI_PEOPLE">;
	tooltip: "People";
	accessibility: TD_Accessibility<"People">;
	targetId: "emoji-picker-category-button-people";
}|{
	categoryId: "nature";
	icon: T_Icon<"EMOJI_NATURE">;
	tooltip: "Nature";
	accessibility: TD_Accessibility<"Nature">;
}|{
	categoryId: "food";
	icon: T_Icon<"EMOJI_FOOD">;
	tooltip: "Food";
	accessibility: TD_Accessibility<"Food">;
}|{
	categoryId: "travel";
	icon: T_Icon<"EMOJI_TRAVEL">;
	tooltip: "Travel";
	accessibility: TD_Accessibility<"Travel">;
}|{
	categoryId: "activities";
	icon: T_Icon<"EMOJI_ACTIVITIES">;
	tooltip: "Activities";
	accessibility: TD_Accessibility<"Activities">;
}|{
	categoryId: "objects";
	icon: T_Icon<"EMOJI_OBJECTS">;
	tooltip: "Objects";
	accessibility: TD_Accessibility<"Objects">;
}|{
	categoryId: "symbols";
	icon: T_Icon<"EMOJI_SYMBOLS">;
	tooltip: "Symbols";
	accessibility: TD_Accessibility<"Symbols">;
};
