import {BaseDNS} from "../DNS.js"
export enum DNSClass {
	IN=0,
}
export enum DNSType {
	A=1,
	PTR=12,
}

type IPType=['IP',string]

export type DNS_IN_A_Type=["DNS",['hostname',string],number,DNSClass.IN,DNSType.A,IPType[]]
export type DNS_IN_PTR_Type=['DNS',['hostname',string],number,DNSClass.IN,DNSType.PTR,BaseDNS]

export type DNSAnyType=DNS_IN_A_Type|DNS_IN_PTR_Type

export type DNS_IN_A=(
	...a: [string,number,DNSClass.IN,DNSType.A,IPType|IPType[]]
) => DNS_IN_A_Type
export type DNS_IN_PTR=(
	...a: [string,number,DNSClass.IN,DNSType.PTR,BaseDNS]
) => DNS_IN_PTR_Type

export type DNS_FN=DNS_IN_A|DNS_IN_PTR
