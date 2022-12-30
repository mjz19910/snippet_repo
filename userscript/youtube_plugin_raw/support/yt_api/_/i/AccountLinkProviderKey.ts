export type AccountLinkProviderKey={
	id: string;
	subject: "all";
}|{
	id: "gpg";
	subject: `${number}`;
};
