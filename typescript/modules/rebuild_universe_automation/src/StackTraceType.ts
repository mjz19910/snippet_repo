// eslint-disable no-undef,no-lone-blocks,no-eval
// Download all images
// await Promise.all(arUnit.slice(0, -1).map(e=>"images/"+e[11]).map(async e=>{try{let f=await fetch(e);let t=await f.text();return t.length}catch(e){return e}}))
// Download all imagesFull
// arrayNames.map(e=>e.indexOf('cat')>-1?'cats-eye-nebula':e).map(e=>"imagesFull/"+e.replace(/\s+/g, '-')+".jpg").map(e=>fetch(e))
// Download all specs
// allspec.map((e,i)=>"specs/"+(i+1)+".jpg").map(e=>fetch(e))
// tampermonkey is overwriting console and
// I want the real log fn so the line numbers show up
export type StackTraceType={
	stack: string
}
