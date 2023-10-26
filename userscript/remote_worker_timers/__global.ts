declare global {
	export interface Window {
		old_local: Record<never,never>;
		g_remote_timer_api: Record<never,never>;
	}
}

export {};