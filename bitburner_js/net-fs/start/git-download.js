/** @param {NS} ns **/
export async function main(ns) {
  let list=[
    'ap-hacknet-node.js',
    'aps-lite.js',
    'auto-deploy.js',
    'auto-purchase-server.js',
    'auto-starter.js',
    'book-keeper.js',
    'captain.js',
    'corp-division-manager.js',
    'corp-product-manager.js',
    'corp-recruiter.js',
    'corp-researcher.js',
    'dev-tools-v2.js',
    'dev-tools.js',
    'diamond-hands.js',
    'find-server.js',
    'find-targets.js',
    'get-yt-comments.js',
    'gimme-money.js',
    'gimme-more-money.js',
    'grow-pirate.js',
    'gtfo.js',
    'hack-pirate.js',
    'kill-network-scripts.js',
    'launch-fleets.js',
    'pirate.js',
    'port-utils.js',
    'probe.js',
    'queue-service.js',
    'strategist.js',
    'utils.js',
    'warmonger.js',
    'watchtower.js',
    'weaken-pirate.js',
    'wgetCS.js'
  ];
  for(const script of list) {
    ns.tprintf('Pulling '+script+' off gitHub');
    await ns.wget('https://raw.githubusercontent.com/chrisrabe/bitburner-automation/main/_stable/'+script,"/chris_r/"+script,"home");
  }
}
