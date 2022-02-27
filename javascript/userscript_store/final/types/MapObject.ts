export interface MapObject<Props extends {[key: string]: unknown;}> extends Map<keyof Props, Props[keyof Props]> {
	get<K extends keyof Props>(key: K): Props[K];
}
