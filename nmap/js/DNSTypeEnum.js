export class DNSTypeEnum {
    /**@readonly*/ static 1 = "A";
    /**@readonly*/ static 2 = "NS";
    /**@readonly*/ static 5 = "CNAME";
    /**@readonly*/ static 6 = "SOA";
    /**@readonly*/ static 12 = "PTR";
    /**@readonly*/ static 13 = "HINFO";
    /**@readonly*/ static 15 = "MX";
    /**@readonly*/ static 16 = "TXT";
    /**@readonly*/ static 17 = "RP";
    /**@readonly*/ static 18 = "AFSDB";
    /**@readonly*/ static 24 = "SIG";
    /**@readonly*/ static 25 = "KEY";
    /**@readonly*/ static 28 = "AAAA";
    /**@readonly*/ static 29 = "LOC";
    /**@readonly*/ static 33 = "SRV";
    /**@readonly*/ static 35 = "NAPTR";
    /**@readonly*/ static 36 = "KX";
    /**@readonly*/ static 37 = "CERT";
    /**@readonly*/ static 39 = "DNAME";
    /**@readonly*/ static 42 = "APL";
    /**@readonly*/ static 43 = "DS";
    /**@readonly*/ static 44 = "SSHFP";
    /**@readonly*/ static 45 = "IPSECKEY";
    /**@readonly*/ static 46 = "RRSIG";
    /**@readonly*/ static 47 = "NSEC";
    /**@readonly*/ static 48 = "DNSKEY";
    /**@readonly*/ static 49 = "DHCID";
    /**@readonly*/ static 50 = "NSEC3";
    /**@readonly*/ static 51 = "NSEC3PARAM";
    /**@readonly*/ static 52 = "TLSA";
    /**@readonly*/ static 53 = "SMIMEA";
    /**@readonly*/ static 55 = "HIP";
    /**@readonly*/ static 59 = "CDS";
    /**@readonly*/ static 60 = "CDNSKEY";
    /**@readonly*/ static 61 = "OPENPGPKEY";
    /**@readonly*/ static 62 = "CSYNC";
    /**@readonly*/ static 63 = "ZONEMD";
    /**@readonly*/ static 64 = "SVCB";
    /**@readonly*/ static 65 = "HTTPS";
    /**@readonly*/ static 108 = "EUI48";
    /**@readonly*/ static 109 = "EUI64";
    /**@readonly*/ static 249 = "TKEY";
    /**@readonly*/ static 250 = "TSIG";
    /**@readonly*/ static 256 = "URI";
    /**@readonly*/ static 257 = "CAA";
    /**@readonly*/ static 32768 = "TA";
    /**@readonly*/ static 32769 = "DLV";
    /**@type {import("./types/mod.js").DNSType.A} */
    /**@readonly*/ static A = 1;
    /**@readonly*/ static NS = 2;
    /**@readonly*/ static CNAME = 5;
    /**@readonly*/ static SOA = 6;
    /**@type {import("./types/mod.js").DNSType.PTR} */
    /**@readonly*/ static PTR = 12;
    /**@readonly*/ static HINFO = 13;
    /**@readonly*/ static MX = 15;
    /**@readonly*/ static TXT = 16;
    /**@readonly*/ static RP = 17;
    /**@readonly*/ static AFSDB = 18;
    /**@readonly*/ static SIG = 24;
    /**@readonly*/ static KEY = 25;
    /**@readonly*/ static AAAA = 28;
    /**@readonly*/ static LOC = 29;
    /**@readonly*/ static SRV = 33;
    /**@readonly*/ static NAPTR = 35;
    /**@readonly*/ static KX = 36;
    /**@readonly*/ static CERT = 37;
    /**@readonly*/ static DNAME = 39;
    /**@readonly*/ static APL = 42;
    /**@readonly*/ static DS = 43;
    /**@readonly*/ static SSHFP = 44;
    /**@readonly*/ static IPSECKEY = 45;
    /**@readonly*/ static RRSIG = 46;
    /**@readonly*/ static NSEC = 47;
    /**@readonly*/ static DNSKEY = 48;
    /**@readonly*/ static DHCID = 49;
    /**@readonly*/ static NSEC3 = 50;
    /**@readonly*/ static NSEC3PARAM = 51;
    /**@readonly*/ static TLSA = 52;
    /**@readonly*/ static SMIMEA = 53;
    /**@readonly*/ static HIP = 55;
    /**@readonly*/ static CDS = 59;
    /**@readonly*/ static CDNSKEY = 60;
    /**@readonly*/ static OPENPGPKEY = 61;
    /**@readonly*/ static CSYNC = 62;
    /**@readonly*/ static ZONEMD = 63;
    /**@readonly*/ static SVCB = 64;
    /**@readonly*/ static HTTPS = 65;
    /**@readonly*/ static EUI48 = 108;
    /**@readonly*/ static EUI64 = 109;
    /**@readonly*/ static TKEY = 249;
    /**@readonly*/ static TSIG = 250;
    /**@readonly*/ static URI = 256;
    /**@readonly*/ static CAA = 257;
    /**@readonly*/ static TA = 32768;
    /**@readonly*/ static DLV = 32769;
    /** @arg {Extract<keyof typeof this, number>} value
     * @arg {boolean} short */
    static stringify(value, short) {
        if(short) {
            return this[value];
        }
        return "DNSTypeEnum." + this[value];
    }
}
