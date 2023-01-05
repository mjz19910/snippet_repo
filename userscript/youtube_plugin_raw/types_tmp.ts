type TemplateElement={
	[x: `f${number}`]: number;
	[x: `s${number}`]: TemplateElement;
};