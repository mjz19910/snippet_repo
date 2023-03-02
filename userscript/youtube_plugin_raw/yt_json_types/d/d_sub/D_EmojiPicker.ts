type D_EmojiPicker={
	id: "emoji";
	categories: (R_EmojiPickerCategory|R_EmojiPickerUpsellCategory)[];
	categoryButtons: R_EmojiPickerCategoryButton[];
	searchPlaceholderText: G_Text;
	searchNoResultsText: G_Text;
	pickSkinToneText: G_Text;
	trackingParams: string;
	clearSearchLabel: "Clear search";
	skinToneGenericLabel: "Generic skin tone";
	skinToneLightLabel: "Light skin tone";
	skinToneMediumLightLabel: "Medium-light skin tone";
	skinToneMediumLabel: "Medium skin tone";
	skinToneMediumDarkLabel: "Medium-dark skin tone";
	skinToneDarkLabel: "Dark skin tone";
};
