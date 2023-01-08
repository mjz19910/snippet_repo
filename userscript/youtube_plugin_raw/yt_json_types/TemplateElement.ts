type TemplateElement={
	[x: `f_n${number}`]: number|bigint;
	[x: `f_o${number}`]: TemplateElement;
	[x: `f_s${number}`]: string;
	map: Map<number,"f_s"|"f_o"|"f_n">;
	set_key(a:[l:"f_s",x:number,y:string]):void;
	set_key(a:[l:"f_n",x:number,y:number|bigint]):void;
	set_key(a:[l:"f_o",x:number,y:TemplateElement]):void;
};
