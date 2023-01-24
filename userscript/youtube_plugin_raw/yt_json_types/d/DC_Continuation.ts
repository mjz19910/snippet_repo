type DC_Continuation={
	token: ST_EncodedURIComponent;
	request: "CONTINUATION_REQUEST_TYPE_REEL_WATCH_SEQUENCE";
}|{
	token: ST_EncodedURIComponent;
	request: "CONTINUATION_REQUEST_TYPE_BROWSE";
	command: C_ShowReloadUi;
};