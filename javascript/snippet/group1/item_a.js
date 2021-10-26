/*
workch_msg_1=eval_onmessage

hostch_msg_1=do_terminate

*/
var dofn = function() {
    if (onmessage) {
        return postMessage({
            t: 1
        })
    }
    if (window.wk) {
        if (window.wk.bur) {
            window.wk.wk.terminate();
            window.URL.revokeObjectURL(window.wk.bur);
            clearTimeout(window.wk.sto)
            delete wk;
        }
    }
    var blob = new Blob(["h={};h.sp;postMessage({t:2});onmessage = function({data:e}) {if (e.t == 1){eval('onmessage='+e.fn);postMessage({t:3});return}}"]);
    var w_url = window.URL.createObjectURL(blob);
    var wk = {}
      , m = new Worker(w_url);
    wk.wk = m
    wk.bur = w_url
    window.wk = wk
    m.onmessage = function(msg) {
        var e = msg.data
        switch (e.t) {
        case 1:
            m.terminate();
            break;
        case 2:
            m.postMessage({
                t: 1,
                fn: m.onmessage_w.toString()
            });
            break;
        case 3:
            console.log("eval_sec")
            break;
        case 4:
            wk.fn()
            break;
        }
    }
    m.onmessage_w = function(msg) {
        var e = msg.data;
        if (e.t == 1) {
            eval('onmessage=' + e.fn);
            debugger ;postMessage({
                t: 3
            });
            return
        }
        if (e.t == 2) {
            postMessage({
                t: 4
            })
        }

    }
}
dofn();
(function() {
    var absldec = (v)=>{
        return Math.abs(Math.log10(v))
    }
    var abslbin = (v)=>{
        return Math.abs(Math.log1p(v))
    }
    var absl = (v)=>{
        return Math.abs(Math.log(v))
    }
    function cbl() {
        var val = absldec(player.money)
        return val
    }
    function aml_10() {
        var val = absldec(player.money)/2
        if (val < 1) {
            return 1
        }
        return val
    }
    function aml() {
        var val = absl(player.money)/2
        if (val < 1) {
            return 1
        }
        return val
    }
    var cur=1
    var e=0
    function tfn() {
        if (so.stl < 0) {
            so.stl = 1
        }
        var newcp = ((cbl() - so.stl) * aml_10() * aml());
        while (newcp < 1) {
            newcp=Math.abs(newcp)
            newcp*=100
            newcp+=0.0001
        }
        var div=absl(player.money)/4
        if(div < 2){
            div=2
        }
        var cp = Math.floor(player.clickPower * (newcp/div))
        if (cp > cur){
            var oc=cur;
            cur=cp;
            document.querySelector("#version").innerHTML="count:"+e+"<br>%pow gain:"+(((cp/oc)-1)*100).toFixed(4)+"%"
            e=0
        }
        if(Math.abs(cp-cur)>4){
            document.querySelector("#version").innerHTML="RESET<br>used_"+(cur-cp)
            cur=cp;
            e=0
        }
        e+=1;
        moneyButtonClick(cp)
        player.totalManualClicks += cp
    }
    var so = {
        stl: -1
    }
    var efn = function() {
        tfn()
        wk.sto = setTimeout(efn, 500)
    }
    efn();
    if (player.money === 0.1) {
        moneyButtonClick(1)
    }
    return so;
}
)()
