## chef input
```input
CCsQ48AHGAMiEwjNgbrBjJv8AhXVEH0KHUFmBoE=
CCkQgdoEIhMIzYG6wYyb_AIV1RB9Ch1BZgaB
CDYQ-N4BGAEiEwi4zZHmv5v8AhWh5cQKHRwzAsk=
CAAQumkiEwi1u-211538AhVqEa0GHdPXBLQ=
// notification.get_notification_menu.trackingParams;
CAAQt7wCIhMIp8j0oPKd_AIVcQx9Ch1HiwZr
// notification.get_notification_menu.trackingParams & actions[].clickTrackingParams;
CAAQt7wCIhMIp8j0oPKd_AIVcQx9Ch1HiwZr
// a=(click distance)
CAEQ_6sBIhMIp8j0oPKd_AIVcQx9Ch1HiwZr
CAsQ8FsYASITCKfI9KDynfwCFXEMfQodR4sGaw==
```
```js
Fork('\\n','\\n',false)
Conditional_Jump('^(#|//|$)',false,'end',1)
From_Base64('A-Za-z0-9-_',true,false)
Protobuf_Decode('message TrackingParams {oneof x {\n\toption (comment) = "a might be click count";\n\tint32 a = 1;\n\tint32 b = 2;\n\tint32 c = 3;\t\n\tDateTime datetime = 4;\n}}\n\nmessage DateTime {\n\trequired uint64 ts = 1;\n\trequired fixed32 a = 2;\n\trequired fixed32 b = 3;\n}\n',true,false)
JSON_Minify()
JPath_expression('$.*','\\n',true)
Find_/_Replace({'option':'Regex','string':'\\n^{}$'},'',true,false,true,false)
Label('end')
```
```js
From_Base64('A-Za-z0-9+/=',true,false)
Drop_bytes(0,4,false)
Protobuf_Decode('message RequestToken {\noptional TokenInfo token_value=0;\n}\nmessage TokenInfo {\noptional string v=2;\noptional string token=3;\n}\n',false,false)
JPath_expression('$.tokenValue[((((x)=>{x.token=[":"+x.token]})(@),"token"))]','\\n',false/breakpoint)
CBOR_Encode()
Find_/_Replace({'option':'Regex','string':'[^:]+?:(.+)'},'$1',true,false,true,true)
URL_Decode()
From_Base64('A-Za-z0-9+/=',true,false)
Drop_bytes(0,3,false)
Protobuf_Decode('message CommentShortsInnerToken {\noptional VideoInfo a=4;\noptional int32 b=6;\noptional string c=8;\n}\nmessage VideoInfo {\noptional string a=4;\noptional int32 b=6;\noptional int32 c=15;\noptional int32 d=25;\n}\n',false,false)
```
```input
4qmFsgJ4Eh5GRWNvbW1lbnRfc2hvcnRzX3dlYl90b3BfbGV2ZWwaVnFnTTdJaFFpQ3paSmIwb3phV0ZVWHpKUk1BQjRBc2dCQURBQlFpRmxibWRoWjJWdFpXNTBMWEJoYm1Wc0xXTnZiVzFsYm5SekxYTmxZM1JwYjI0JTNE
```
```json
[
  { "op": "From Base64",
    "args": ["A-Za-z0-9+/=", true, false] },
  { "op": "Drop bytes",
    "args": [0, 4, false] },
  { "op": "Protobuf Decode",
    "args": ["message RequestToken {\noptional TokenInfo token_value=0;\n}\nmessage TokenInfo {\noptional string v=2;\noptional string token=3;\n}\n", false, false] },
  { "op": "JPath expression",
    "args": ["$.tokenValue.token", "\\n", true] },
  { "op": "Find / Replace",
    "args": [{ "option": "Regex", "string": "\"(.+)\"" }, "$1", true, false, true, true] },
  { "op": "URL Decode",
    "args": [] },
  { "op": "From Base64",
    "args": ["A-Za-z0-9+/=", true, false] },
  { "op": "Drop bytes",
    "args": [0, 3, false] },
  { "op": "Protobuf Decode",
    "args": ["message CommentShortsInnerToken {\noptional VideoInfo a=4;\noptional int32 b=6;\noptional string c=8;\n}\nmessage VideoInfo {\noptional string a=4;\noptional int32 b=6;\noptional int32 c=15;\noptional int32 d=25;\n}\n", false, false] }
]
```
