
// cspell: ignore aitags requiressl initcwndbps vprv clen fvip lsparams lsig
type D_VideoPlaybackShape=D_VideoPlaybackShape_S_Params&D_VideoPlaybackShape_LS_Params&{
	itag: `${137}`;
	mt: `${number}`;
	fvip: "4";
	keepalive: "yes";
	fexp: `${24007246}`;
	c: "WEB";
	txp: `${number}`;
	n: string;
	sparams: "expire,ei,ip,id,aitags,source,requiressl,vprv,mime,ns,gir,clen,dur,lmt";
	sig?: string;
	lsparams: "mh,mm,mn,ms,mv,mvi,pl,initcwndbps";
	lsig: string;
	cnr?: "14";
	ratebypass?: "yes";
};
type D_VPS_Req=Required<D_VideoPlaybackShape>;
