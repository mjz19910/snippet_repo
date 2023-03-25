/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	const t1_money = ns.getServerMoneyAvailable("home");
	await ns.sleep(1000);
	const t2_money = ns.getServerMoneyAvailable("home");
	const cost_diff = ns.getPurchasedServerCost(8) - t1_money;
	const per_second_rate = (t2_money - t1_money);
	ns.print(ns.formatNumber(t2_money - t1_money));
	ns.print(ns.formatNumber(cost_diff / per_second_rate, 0));
	await ns.sleep(4000);
	ns.closeTail();
}