type ReplyMsg=ReplyMsg1|ReplyMsg2|ReplyMsg3|ReplyMsg4|ReplyMsg5|ReplyMsg6;

type ReplyMsg1={call: "getServerMaxMoney"; id: string; uid: number; reply: number;};
type ReplyMsg2={call: "getServerMinSecurityLevel"; id: string; uid: number; reply: number;};
type ReplyMsg3={call: "getServerSecurityLevel"; id: string; uid: number; reply: number;};
type ReplyMsg4={call: "getServerMoneyAvailable"; id: string; uid: number; reply: number;};
type ReplyMsg5={call: "get_server"; id: string; uid: number; reply: Server;};
type ReplyMsg6={call: "get_hack_target"; id: string; uid: number; reply: Server;};
type ReplyMsgPending={call: "pending"; reply: ReplyMsg[];};

type CallMsg=CallMsg1|CallMsg2|CallMsg3|CallMsg4|CallMsg5|CallMsg6;
type CallMsg1={call: "getServerMaxMoney",args: [string];};
type CallMsg2={call: "getServerMinSecurityLevel",args: [string];};
type CallMsg3={call: "getServerSecurityLevel",args: [string];};
type CallMsg4={call: "getServerMoneyAvailable",args: [string];};
type CallMsg5={call: "get_server",args: [string];};
type CallMsg6={call: "get_hack_target",args: [string];};
