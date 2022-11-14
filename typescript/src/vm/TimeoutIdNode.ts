export class TimeoutIdNode {
	id: ReturnType<typeof setInterval>|ReturnType<typeof setTimeout>|null;
	m_is_timeout: boolean;
	constructor(id: ReturnType<typeof setInterval>|ReturnType<typeof setTimeout>|null=null,is_timeout_flag: boolean) {
		this.id=id;
		this.m_is_timeout=is_timeout_flag;
	}
}
