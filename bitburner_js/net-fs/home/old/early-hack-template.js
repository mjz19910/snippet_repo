/** @param {NS} ns */
export async function main(ns) {
    // Defines the "target server", which is the server
    // that we're going to hack. In this case, it's "n00dles"
    let target = ns.args[1] > 10 ? "joesguns" : "n00dles";
    if (ns.args[1] > 80) target = "harakiri-sushi";
    if (ns.args[1] > 95) target = "neo-net";

    // Defines how much money a server should have before we hack it
    // In this case, it is set to 75% of the server's max money
    const moneyThresh = ns.getServerMaxMoney(target) * 0.85;

    // Defines the maximum security level the target server can
    // have. If the target's security level is higher than this,
    // we'll weaken it before doing anything else
    const securityThresh = ns.getServerMinSecurityLevel(target) + .5;

    // If we have the BruteSSH.exe program, use it to open the SSH Port
    // on the target server
    if (ns.fileExists("BruteSSH.exe", "home")) {
        ns.brutessh(target);
    }

    // Get root access to target server
    ns.nuke(target);

    // Infinite loop that continously hacks/grows/weakens the target server
    while (true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            // If the server's security level is above our threshold, weaken it
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            // If the server's money is less than our threshold, grow it
            await ns.grow(target);
        } else {
            // Otherwise, hack it
            await ns.hack(target);
        }
    }
}