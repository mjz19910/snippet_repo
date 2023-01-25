type D_TextInputFormField={
	label: R_TextRuns;
	maxCharacterLimit: 150;
	placeholderText: string;
	validValueRegexp: "[^<>]*";
	invalidValueErrorMessage: R_TextRuns;
	required: true;
};