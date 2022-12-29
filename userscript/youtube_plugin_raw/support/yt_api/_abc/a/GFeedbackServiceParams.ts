export type GFeedbackServiceParams={
	service: 'GFEEDBACK';
	params: [
		{
			key: 'logged_in';
			value: '0'|'1';
		},
		{
			key: 'e';
			value: string;
		}
	];
};
