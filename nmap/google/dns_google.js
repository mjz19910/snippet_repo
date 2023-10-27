// deno-lint-ignore-file
import util from "util";
import {Status} from "../js/Status";
import {DigState} from "../js/DigState.js";
import {IP} from "../js/IP.js";
import {DNS} from "../js/DNS.js";
let state = new DigState;
state.nmap_result([DNS("dfw25s42-in-f0.1e100.net"), Status.Up, IP("142.251.32.192")]);
state.nmap_result([DNS("dfw25s43-in-f0.1e100.net"), Status.Up, IP("142.251.32.224")]);
state.nmap_result([DNS("dfw28s29-in-f0.1e100.net"), Status.Up, IP("142.251.32.128")]);
state.nmap_result([DNS("dfw28s30-in-f0.1e100.net"), Status.Up, IP("142.251.32.160")]);
state.nmap_result([DNS("lga25s77-in-f0.1e100.net"), Status.Up, IP("142.251.32.96")]);
state.nmap_result([DNS("ord38s33-in-f0.1e100.net"), Status.Up, IP("142.251.32.0")]);
state.nmap_result([DNS("sfo03s26-in-f0.1e100.net"), Status.Up, IP("142.251.32.32")]);
state.nmap_result([DNS("yyz12s07-in-f0.1e100.net"), Status.Up, IP("142.251.32.64")]);

console.log(util.inspect(state.m_dig_results, {colors: true, breakLength: 180}));
