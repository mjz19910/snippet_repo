type Constructor=new (...args: any[]) => any;
export type InstanceRecord=Constructor&Record<"type",symbol>;
