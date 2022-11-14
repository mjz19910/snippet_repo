export class TimeoutIdNode {
	m_id: ReturnType<typeof setTimeout>|null;
	m_is_timeout: boolean;
	constructor(id: ReturnType<typeof setTimeout>|null=null,is_timeout_flag: boolean) {
		this.m_id=id;
		this.m_is_timeout=is_timeout_flag;
	}
}
