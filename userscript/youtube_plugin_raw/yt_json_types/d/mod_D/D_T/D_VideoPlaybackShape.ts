type D_VideoPlayback_Itag="137"|"140";

type D_VideoPlaybackShape_Other={
	itag?: D_VideoPlayback_Itag;
	gcr?: "ca";
	mt: `${number}`;
	fvip: "4";
	keepalive?: "yes";
	fexp: `${24007246}`;
	c: "WEB";
	txp?: `${number}`;
	n: string;
	sig?: string;
	lsig: string;
};

// cspell: ignore aitags requiressl initcwndbps vprv clen fvip lsparams lsig
type D_VideoPlaybackShape=D_VideoPlaybackShape_S_Params&D_VideoPlaybackShape_LS_Params&D_VideoPlaybackShape_Other&{
	lsparams: "mh,mm,mn,ms,mv,mvi,pl,initcwndbps";
	sparams: "expire,ei,ip,id,itag,source,requiressl,vprv,mime,ns,cnr,ratebypass,dur,lmt"|"expire,ei,ip,id,aitags,source,requiressl,vprv,mime,ns,gir,clen,dur,lmt"|"expire,ei,ip,id,itag,source,requiressl,vprv,mime,ns,gir,clen,dur,lmt";
};
type D_VPS_Req=Required<D_VideoPlaybackShape>;
