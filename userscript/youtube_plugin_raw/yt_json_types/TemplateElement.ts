type TemplateElement={
	[x: `f_n${number}`]: number|bigint;
	[x: `f_o${number}`]: TemplateElement;
	[x: `f_s${number}`]: string;
};
