"use strict";
exports.__esModule = true;
exports.url_parse_0 = void 0;
function url_parse_0() {
    var pagead = new /** @class */ (function () {
        function class_1() {
            this.adview = new /** @class */ (function () {
                function class_2() {
                    this.ai = null;
                }
                return class_2;
            }());
        }
        return class_1;
    }());
    pagead.adview = { ai: new URLSearchParams(new URL("https://www.youtube.com/pagead/adview?ai=CR9DJiI6lY62vDMm7n88Pnre6kAngxfL9bfCOlrycEWQQASAAYP2Q9oDMA4IBF2NhLXB1Yi02MjE5ODExNzQ3MDQ5MzcxoAHLt6f4A6gDBMgDCqoEyAFP0EC2FSEYx70zuAUppUfEkYi_mOxY9ayL2TsEqmuwqQ2uR52X5F8mREDx148616YrlzJGcdfwasaotiQufJZQh_1P-F5EUxNcTrvVkGAoIHM-E6HcARQOzmMpiHURkEuWhENDfN2plBxHA5lui-nCj1tpA07TYASPOdBjxm-rT6PJyNg5mzjomgxxcY4JpG3rnZbC1TQ_an4StPQ5YOx-FCxGyY58dQA2TCk1vQwtBzqiGbOgOwWxy0tPKdPvQ51LcGX2i_nxJ8AEyNr865sEiAWjkqTnR5IFCQgTaAF47fX5BqAGboAHncjYB4gHAZAHAqgHgqqxAqgHhAioB6jSG6gHtgeoB-DPG6gH6dQbqAeMzRuoB7HcG6gHpJqxAqgHkZ-xAqgHsJuxAqgH36GxAqgHpqqxAqgHgcYbqAerxRuoB-PZG6gHt6mxAqgH6auxApIIC0FBQUFBQUFBQUFB0ggYCIDAgEAQAhgAMgSBgoAOOgeAgICAgIEEyAkAugs-CAIQBRgWIAgoATADQAFIAFABWCVgAGgAcAGIAQCYAQGiARIKAggBKAH4AQGQAgKoAgXAAgLYAQGAAgGIAgW4E____________wGwFALAFYGAgECKFwoIAxgBKAEwATgBoBcBqReJBEg1yjlletIXDhIK7E7vTqtctFyTaRhu&sigh=f6Ah-ilTPVs&cid=CAESD-D2saJYt_ikQ_sicNcKDQ").search).get("ai") };
    var xx = "https://i.ytimg.com/vi/OAIqCpqszVw/hqdefault.jpg?sqp=-oaymwE1CKgBEF5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AH-CYAC0AWKAgwIABABGB8gZShWMA8=&rs=AOn4CLCpqrflce1_k2te4K_5kNbCpjCm6Q";
    function clone_urlparse(v) {
        var hash = v.hash, host = v.host, hostname = v.hostname, href = v.href, origin = v.origin, password = v.password, path = v.path, pathname = v.pathname, port = v.port, protocol = v.protocol, search = v.search, searchParams = v.searchParams;
        return {
            hash: hash,
            host: host,
            hostname: hostname,
            href: href,
            origin: origin,
            password: password,
            path: path,
            pathname: pathname,
            port: port,
            protocol: protocol,
            search: search,
            searchParams: searchParams
        };
    }
    var xyt = {};
    var cc = xyt;
    var vv = new URL(xx);
    var rt_u = vv;
    rt_u;
    cc;
    console.log(clone_urlparse(vv));
}
exports.url_parse_0 = url_parse_0;
url_parse_0();
