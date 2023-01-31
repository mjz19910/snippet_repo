type G_Text=({
	runs: D_TextRun[];
}|{
	simpleText: string;
})&G_Text_Base;
type G_Text_Base={
	accessibility?: D_Accessibility;
};
