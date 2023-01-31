type R_TextRun_Endpoint=E_Url|GE_Browse|E_Watch;

type R_TextRun={
	text: string;
	navigationEndpoint?: R_TextRun_Endpoint;
	loggingDirectives?: D_LoggingDirectives;
	bold?: boolean;
};