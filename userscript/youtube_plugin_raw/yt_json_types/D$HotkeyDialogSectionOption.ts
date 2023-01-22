type D$HotkeyDialogSectionOption={
	label: D$TextWithRuns;
	hotkey: string&{tag:""};
}|{
	label: D$TextWithRuns;
	hotkey: ",";
	hotkeyAccessibilityLabel: A$Accessibility;
};