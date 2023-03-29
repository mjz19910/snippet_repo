// ==UserScript==
// @name         aarextiaokhiao Universal-Attractor
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://aarextiaokhiao.github.io/Universal-Attractor/game.html
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck
/*eslint-disable no-undef*/

(function() {
	'use strict';
	(function() {
		if(window.hasOwnProperty("cint")) {
			clearTimeout(window.cint);
		}
		var i=0,nxfn,presfn;
		var noteval=Function("","return eval")();
		var getraw=function(e) {return e.raw[0];};
		var outctr_prestr="(function(){out=[]";
		var outctr_endstr="return out})()//# sourceURL=$_7";
		var domfn_str=getraw`out.push(function() {
	updateElement('stars', showTooMuch ? 'Infinite' : formatCosts(player.stars))
	updateElement('sPS', showTooMuch ? 0 : formatCosts(player.generators[0].amount.times(getGeneratorMultiplier(0))))
	if (player.prestiges[1] > 0 || player.transferPoints.gt(0) || player.transferUpgrades.length > 0) {
			showElement('transferTabButton', (oldDesign) ? 'inline-block' : 'table-cell')
	} else {
			hideElement('transferTabButton')
			if (tab == 'transfer')
					tab = 'gen'
	}
	if (player.prestiges[2] > 0 || player.neutronStars.gt(0)) {
			showElement('supernovaTabButton', (oldDesign) ? 'inline-block' : 'table-cell')
			if (player.supernovaTabsUnlocked == streqs.length) {
					hideElement('requirement' + ((oldDesign) ? '' : 'Child'))
			} else {
					showElement('requirement' + ((oldDesign) ? '' : 'Child'), (oldDesign) ? 'table-cell' : 'inline-block')
					moveElement('requirement' + ((oldDesign) ? '' : 'Child'), ((player.supernovaTabsUnlocked == 3) ? 'genTabs' : 'supernovaTabs') + ((oldDesign) ? '' : 'Row'))
					updateElement('requirement', 'Next requires ' + format(streqs[player.supernovaTabsUnlocked]) + ' NS')
			}
			for (a = 1; a <= streqs.length; a++) {
					if (player.supernovaTabsUnlocked >= a) {
							showElement('supernovaLockedTab' + a, (oldDesign) ? 'inline-block' : 'table-cell')
					} else {
							hideElement('supernovaLockedTab' + a)
					}
			}
	} else {
			hideElement('supernovaTabButton')
	}

	if (tab != oldTab) {
			showElement('tab' + tab, 'block')
			hideElement('tab' + oldTab)
			oldTab = tab
	}
	if (showTooMuch != showedTooMuch) {
			showedTooMuch = showTooMuch
			if (showedTooMuch) {
					showElement('tooMuch', 'inline-block')
					setTimeout(function() {
							if (showedTooMuch)
									document.getElementById('tooMuch').style.opacity = 1
					}, 50)
			} else {
					document.getElementById('tooMuch').style.opacity = 0
					setTimeout(function() {
							hideElement('tooMuch')
					}, 500)
			}
	}
	if (!oldDesign && player.layout != oldLayout) {
			showElement('layout' + player.layout, 'table')
			hideElement('layout' + oldLayout)
			oldLayout = player.layout
	}
	if (player.stars.gte(Number.MAX_VALUE) && player.breakLimit) {
			if (oldDesign) {
					showElement('prestige3bl', 'inline')
			} else {
					showElement('prestige3bl', 'table-cell')
			}
			updateElement('prestige3bl', 'Explode your stars and get undead stars.<br>+' + format(getPostPrestigePoints(3)) + ' NS')
			enableTooltip('p3tt')
			updateTooltip('p3tt', (player.explanations ? explainList.supernova + '<br>' : '') + 'NS gain rate: ' + format(gainRate[1]) + ' NS/s<br>Peak: ' + format(player.gainPeak[1]) + ' NS/s')
	} else {
			disableTooltip('p3tt')
			hideElement('prestige3bl')
	}

	if (tab == 'gen') {
			if (player.supernovaTabsUnlocked > 2) {
					showElement('genTabs', 'block')
			} else {
					hideElement('genTabs')
			}

			if (genTab != oldGenTab) {
					showElement('gen' + genTab, 'block')
					hideElement('gen' + oldGenTab)
					oldGenTab = genTab
			}
			if (genTab == 'tiers') {
					for (a = 0; a < 10; a++) {
							if (!oldDesign) {
									if (a > 0 && player.layout == 1) {
											if (player.highestTierPrestiges[0] >= a && (a < 9 || player.currentChallenge != 3)) {
													showElement('t' + (a + 1) + 'GenRow', 'table-row')
											} else {
													hideElement('t' + (a + 1) + 'GenRow')
											}
									}
									if (a > 0 && player.layout == 2) {
											if (player.highestTierPrestiges[0] >= a && (a < 9 || player.currentChallenge != 3)) {
													visibleElement('t' + (a + 1) + 'GenCell')
													visibleElement('t' + (a + 1) + 'GenCell2')
											} else {
													invisibleElement('t' + (a + 1) + 'GenCell')
													invisibleElement('t' + (a + 1) + 'GenCell2')
											}
									}
							}
							var name = 't' + (a + 1) + 'Gen' + ((player.layout == 2 && !oldDesign) ? '2' : '')
							var currentText = '<b>Tier ' + (a + 1) + ' generator</b><br>'
							var tooltipText = ''
							if (player.explanations)
									tooltipText = explainList.gens
							if (player.generators[a].amount.eq(player.generators[a].bought) || a == player.highestTierPrestiges[0] - 1) {
									currentText = currentText + format(player.generators[a].amount, 0, 1)
							} else {
									currentText = currentText + format(player.generators[a].amount) + ' (' + format(getGeneratorMultiplier(a + 1).times(player.generators[a + 1].amount)) + '/s), ' + format(player.generators[a].bought, 2, 1) + ' bought'
									tooltipText = (tooltipText == '' ? '' : tooltipText + '<br>') + 'Growth rate: ' + format(getGeneratorMultiplier(a + 1).times(player.generators[a + 1].amount).div(player.generators[a].amount).times(100), 2, 0, false) + '%'
							}
							var genMultiplier = getGeneratorMultiplier(a)
							if (genMultiplier.gt(1))
									tooltipText = (tooltipText == '' ? '' : tooltipText + '<br>') + 'Production for 1 generator: ' + format(genMultiplier, 2, 0, false) + '/s'
							if (tooltipText == '')
									disableTooltip('t' + (a + 1) + 'Gen' + ((player.layout == 2 && !oldDesign) ? '2' : ''))
							else {
									enableTooltip('t' + (a + 1) + 'Gen' + ((player.layout == 2 && !oldDesign) ? '2' : ''))
									updateTooltip('t' + (a + 1) + 'Gen' + ((player.layout == 2 && !oldDesign) ? '2' : ''), tooltipText)
							}
							var lastLine = ''
							var cost = costs.tiers[a]
							if (keysPressed.includes(16)) {
									var multiplier = getCostMultiplier(a + 1)
									var resource = (player.currentChallenge == 4 && a > 0) ? player.generators[a - 1].amount : player.stars
									var maxBulk = resource.div(cost).times(multiplier - 1).plus(1).max(1).log(multiplier)
									if (maxBulk < 0)
											maxBulk = 0
									if (maxBulk < 9007199254740992)
											maxBulk = Math.floor(maxBulk)
									lastLine = 'Buy ' + format(maxBulk, 3, 0) + ' (' + formatCosts(getCost(a + 1, maxBulk)) + ')'
							} else if (Decimal.eq(cost, 0)) {
									lastLine = 'Cost: ???'
							} else {
									lastLine = 'Cost: ' + formatCosts(cost)
							}
							if (oldDesign) {
									updateElement(name, currentText + '<br>' + lastLine)
							} else {
									updateTooltipBase(name, currentText)
									var name = 't' + (a + 1) + 'GenButton' + ((player.layout == 2) ? '2' : '')
									updateElement(name, lastLine)
							}
							if (Decimal.gt(cost, 0) && isWorthIt(a + 1)) {
									if (oldDesign) {
											updateClass(name, 'shopButton')
									} else {
											updateClass(name, 'longButton')
									}
							} else {
									updateClass(name, 'shopUnafford')
							}
					}
					if (player.prestigePower.gt(1)) {
							updateTooltipBase('prestigePower', '<b>x' + format(player.prestigePower, 3, 0, false) + '</b> (prestige power) for all production<br>')
							if (player.explanations) {
									enableTooltip('prestigePower')
									updateTooltip('prestigePower', explainList.prestige)
							} else {
									disableTooltip('prestigePower')
							}
					} else {
							updateTooltipBase('prestigePower', '')
					}
					if (!showTooMuch && player.stars.gte(player.transferUpgrades.includes(7) ? 1e38 : 1e39) && player.prestigePower.lt(getPrestigePower())) {
							if (oldDesign) {
									showElement('prestige1', 'inline')
							} else {
									showElement('p1row', 'table-cell')
							}
							updateElement('prestige1', 'Reset this game and get the boost.<br>x' + format(getPrestigePower().div(player.prestigePower), 3, 0, false) + ' production')
							enableTooltip('p1tt')
							updateTooltip('p1tt', (player.explanations ? explainList.prestige + '<br>' : '') + 'Total multiplier for next prestige: x' + format(getPrestigePower(), 3, 0, false) + '<br>Growth rate: ' + format(getPrestigePower().div(player.prestigePower).root(player.prestigePlaytime).sub(1).times(100), 3, 0, false) + '%')
							if (oldDesign) {
									hideElement('losereset')
							} else {
									hideElement('lrrow')
							}
							disableTooltip('lrtt')
					} else {
							if (oldDesign) {
									hideElement('prestige1')
							} else {
									hideElement('p1row')
							}
							disableTooltip('p1tt')
							if (!showTooMuch && player.currentChallenge == 8) {
									if (oldDesign) {
											showElement('losereset', 'inline')
									} else {
											showElement('lrrow', 'table-cell')
									}
									enableTooltip('lrtt')
									updateTooltip('lrtt', 'While losing a reset, you will have half of prestige power.<br>x' + format(player.prestigePower, 3, 0, false) + ' -> x' + format(player.prestigePower.div(2).max(1), 3, 0, false))
							} else {
									if (oldDesign) {
											hideElement('losereset')
									} else {
											hideElement('lrrow')
									}
									disableTooltip('lrtt')
							}
					}
					if (!showTooMuch && player.prestigePower.gte(100)) {
							if (oldDesign) {
									showElement('prestige2', 'inline')
							} else {
									showElement('p2row', 'table-cell')
							}
							updateElement('prestige2', 'Transfer your power and upgrade this game.<br>+' + format(getTransferPoints()) + ' TP')
							enableTooltip('p2tt')
							updateTooltip('p2tt', (player.explanations ? explainList.transfer + '<br>' : '') + 'TP gain rate: ' + format(gainRate[0]) + ' TP/s<br>Peak: ' + format(player.gainPeak[0]) + ' TP/s')
					} else {
							if (oldDesign) {
									hideElement('prestige2')
							} else {
									hideElement('p2row')
							}
							disableTooltip('p2tt')
					}
					if (player.challPow.lt(1) || player.challenge == 1) {
							showElement('challPow', 'block')
							updateElement('challPow', 'Challenge ' + player.currentChallenge + ' power: <b>x' + format(player.challPow, 3, 0, false) + '</b>')
					} else {
							hideElement('challPow')
					}
					if (!showTooMuch && player.showProgress && (player.stars.lt(player.transferUpgrades.includes(7) ? 1e38 : 1e39) || player.prestigePower.gt(getPrestigePower()))) {
							if (player.prestigePower.gt(1)) {
									var percentage = (getPrestigePower().log10() - getPrestigePower(10).log10()) / (player.prestigePower.log10() - getPrestigePower(10).log10())
							} else {
									var percentage = player.stars.add(1).log10() / (player.transferUpgrades.includes(7) ? 38 : 39)
							}
							showElement('prestigeProgress', 'block')
							if (percentage >= 0.99995) {
									if (player.prestigePower.gt('1e500'))
											updateElement('prestigeProgress', '<b>Progress till prestige</b>: ' + format(Decimal.sub(player.prestigePower.log10(), getPrestigePower().log10()).ceil()) + ' OoM left')
									else
											updateElement('prestigeProgress', '<b>Progress till prestige</b>: ' + (percentage * 100).toFixed(2) + '%')
							} else {
									updateElement('prestigeProgress', '<b>Progress till prestige</b>: ' + (percentage * 100).toFixed(2) + '%')
							}
					} else {
							hideElement('prestigeProgress')
					}
					if (!showTooMuch && player.showProgress && player.prestigePower.lt(100)) {
							showElement('transferProgress', 'block')
							updateElement('transferProgress', '<b>Progress till transfer</b>: ' + Math.floor(player.prestigePower.log10() * 5000) / 100 + '%')
					} else {
							hideElement('transferProgress')
					}
					if (!showTooMuch && player.showProgress && player.stars.lt(Number.MAX_VALUE)) {
							showElement('supernovaProgress', 'block')
							updateElement('supernovaProgress', '<b>Progress till ' + ((player.currentChallenge > 0) ? 'challenge goal' : 'supernova') + '</b>: ' + Math.floor(player.stars.add(1).log10() / Math.log10(Number.MAX_VALUE) * 10000) / 100 + '%')
					} else {
							hideElement('supernovaProgress')
					}
					if (player.showProgress && player.breakLimit && player.neutronStars.lt(Number.MAX_VALUE)) {
							showElement('hypernovaProgress', 'block')
							updateElement('hypernovaProgress', '<b>Progress till hypernova</b>: ' + Math.floor(player.neutronStars.add(1).log10() / Math.log10(Number.MAX_VALUE) * 10000) / 100 + '%')
					} else {
							hideElement('hypernovaProgress')
					}
			}
			if (genTab == 'neutronTiers') {
					updateElement('neutrons', 'You have <b>' + format(player.neutrons) + '</b> neutrons which reduced the cost by <b>' + format(neutronPower) + 'x</b>')
					updateElement('neutronsRate', '<b>' + format(getNeutronTierMultiplier(0).times(player.neutronTiers[0].amount)) + '</b> neutrons/s')
					for (a = 0; a < 10; a++) {
							var currentText = '<b>Neutron tier ' + (a + 1) + ' generator</b><br>'
							if (player.neutronTiers[a].amount.eq(player.neutronTiers[a].bought) || a == 9) {
									currentText = currentText + format(player.neutronTiers[a].amount, 0, 1)
							} else {
									currentText = currentText + format(player.neutronTiers[a].amount) + ' (' + format(getNeutronTierMultiplier(a + 1).times(player.neutronTiers[a + 1].amount)) + '/s), ' + format(player.neutronTiers[a].bought, 2, 1) + ' bought'
							}
							var name = 'nt' + (a + 1) + 'Gen'
							var lastLine = 'Cost: ' + formatNSCosts(costs.neutronTiers[a])
							if (oldDesign) {
									updateElement(name + 'Button', currentText + '<br>' + lastLine)
							} else {
									updateTooltipBase(name, currentText)
									updateElement(name + 'Button', lastLine)
							}
							var tooltipText = ''
							if (player.explanations)
									tooltipText = explainList.neutronTiers
							if (a == 9 || player.neutronTiers[a].amount.eq(player.neutronTiers[a].bought)) {
									currentText = currentText + format(player.neutronTiers[a].amount, 0, 1)
							} else {
									currentText = currentText + format(player.neutronTiers[a].amount) + ' (' + format(getNeutronTierMultiplier(a + 1).times(player.neutronTiers[a + 1].amount)) + '/s), ' + format(player.neutronTiers[a].bought, 2, 1) + ' bought'
									tooltipText = (tooltipText == '' ? '' : tooltipText + '<br>') + 'Growth rate: ' + format(getNeutronTierMultiplier(a + 1).times(player.neutronTiers[a + 1].amount).div(player.neutronTiers[a].amount).times(100), 2, 0, false) + '%'
							}
							var genMultiplier = getNeutronTierMultiplier(a)
							if (genMultiplier.gt(1))
									tooltipText = (tooltipText == '' ? '' : tooltipText + '<br>') + 'Production for 1 generator: ' + format(genMultiplier, 2, 0, false) + '/s'
							if (tooltipText == '')
									disableTooltip('nt' + (a + 1) + 'Gen')
							else {
									enableTooltip('nt' + (a + 1) + 'Gen')
									updateTooltip('nt' + (a + 1) + 'Gen', tooltipText)
							}
							if (player.neutronStars.gte(costs.neutronTiers[a])) {
									updateClass('nt' + (a + 1) + 'GenButton', (oldDesign) ? 'supernovaUpgrade' : 'supernovaButton')
							} else {
									updateClass('nt' + (a + 1) + 'GenButton', 'shopUnafford')
							}
					}
			}
	}
	if (tab == 'stats') {
			updateElement('statsPlaytime', 'You have played for ' + formatTime(player.playtime) + '.')
			if (player.updateRate == Math.round(1000 / tickspeed)) {
					hideElement('statsTPS')
			} else {
					showElement('statsTPS', 'inline')
					updateElement('statsTPS', 'You are running this game in ' + format(1000 / tickspeed, 0, 1) + ' ticks per second.')
			}
			updateElement('statsTotal', 'You have gained ' + format(player.totalStars) + ' stars in total.')
			if (player.prestiges[0] > 0) {
					showElement('statsPrestige', 'block')
					updateElement('statsPrestige', 'You have prestige ' + format(player.prestiges[0], 2, 2) + ' times.')
			} else {
					hideElement('statsPrestige')
			}
			if (player.prestigePeak[0].gt(1)) {
					showElement('statsPP', 'block')
					updateElement('statsPP', 'Your highest prestige power ever got is x' + format(player.prestigePeak[0], 3, 0, true) + '.')
			} else {
					hideElement('statsPP')
			}
			if (player.prestiges[1] > 0) {
					showElement('statsTransfer', 'block')
					showElement('statsTransferTime', 'block')
					updateElement('statsTransfer', 'You have transferred ' + format(player.prestiges[1], 2, 2) + ' times.')
					updateElement('statsTransferTime', 'Your time in this transfer is ' + formatTime(player.transferPlaytime) + '.')
			} else {
					hideElement('statsTransfer')
					hideElement('statsTransferTime')
			}
			if (player.totalTP.gt(0)) {
					showElement('statsTP', 'block')
					updateElement('statsTP', 'You have gained ' + format(player.totalTP) + ' transfer points in total.')
			} else {
					hideElement('statsTP')
			}
			if (player.prestigePeak[1].gt(1)) {
					showElement('statsTPPeak', 'block')
					updateElement('statsTPPeak', 'Your highest amount of transfer points you got is ' + format(player.prestigePeak[1]) + ' TP.')
			} else {
					hideElement('statsTPPeak')
			}
			if (player.prestiges[2] > 0) {
					showElement('statsSupernova', 'block')
					showElement('statsSupernovaTime', 'block')
					updateElement('statsSupernova', 'You have supernova ' + format(player.prestiges[2], 2, 2) + ' times.')
					updateElement('statsSupernovaTime', 'Your time in this supernova is ' + formatTime(player.supernovaPlaytime) + '.')
			} else {
					hideElement('statsSupernova')
					hideElement('statsSupernovaTime')
			}
			if (player.fastestSupernova < Number.MAX_VALUE) {
					showElement('statsSupernovaFastest', 'block')
					updateElement('statsSupernovaFastest', 'Your fastest supernova is in ' + formatTime(player.fastestSupernova) + '.')
			} else {
					hideElement('statsSupernovaFastest')
			}
			if (player.totalNS.gt(0)) {
					showElement('statsNS', 'block')
					updateElement('statsNS', 'You have gained ' + format(player.totalNS) + ' neutron stars in total.')
			} else {
					hideElement('statsNS')
			}
			if (player.rewardBoxes[2] > 0 && player.rewardBoxes[2] < 12) {
					showElement('statsRewardBoxes', 'block')
					updateElement('statsRewardBoxes', 'You opened ' + player.rewardBoxes[2] + ' reward box' + (player.rewardBoxes[2] > 0 ? 'es' : '') + '.')
			} else {
					hideElement('statsRewardBoxes')
			}
			for (a = 0; a < 10; a++) {
					if (player.lastSupernovas[a] == undefined) {
							hideElement('statsPrevSupernova' + (a + 1))
					} else {
							showElement('statsPrevSupernova' + (a + 1), 'block')
							var message = 'The ' + ((a > 0) ? ordinals[a] + ' ' : '') + 'previous supernova took '
							if (player.lastSupernovas[a][3] > 1) {
									var message = message + format(player.lastSupernovas[a][3] - 1, 0, 2) + ' supernovas and '
							}
							message = message + formatTime(player.lastSupernovas[a][0])
							if (player.lastSupernovas[a][1].gt(Number.MAX_VALUE)) {
									var message = message + ' with ' + format(player.lastSupernovas[a][1]) + ' stars'
							}
							if (player.lastSupernovas[a][2].gt(1)) {
									var message = message + ' and gained ' + format(player.lastSupernovas[a][2]) + ' NS'
							}
							message = message + '.'
							if (player.lastSupernovas[a][2].gt(1)) {
									var message = message + ' (' + format(player.lastSupernovas[a][2].div(player.lastSupernovas[a][0])) + ' NS/s)'
							}
							updateElement('statsPrevSupernova' + (a + 1), message)
					}
			}
	}
	if (tab == 'options') {
			updateElement('notationOption', 'Notation:<br>' + player.notation)
			if (player.updateRate == Number.MAX_VALUE) {
					updateElement('urOption', 'Update rate:<br>Unlimited')
			} else {
					updateElement('urOption', 'Update rate:<br>' + player.updateRate + ' TPS')
			}
			updateElement('exOption', 'Explanations:<br>' + (player.explanations ? 'On' : 'Off'))
			updateElement('msOption', 'Use monospaced:<br>' + (player.useMonospaced ? 'On' : 'Off'))
			updateElement('hkOption', 'Hotkeys:<br>' + (player.hotkeys ? 'On' : 'Off'))
			updateElement('spOption', 'Show progress:<br>' + (player.showProgress ? 'On' : 'Off'))
			updateElement('ccOption', 'Challenge confirmation:<br>' + (player.challConfirm ? 'On' : 'Off'))
			if (!oldDesign)
					updateElement('stOption', 'Theme:<br>' + player.theme)
	}
	if (tab == 'transfer') {
			updateTooltipBase('transferPoints', 'You have <b>' + format(player.transferPoints) + '</b> transfer points')
			explainList.tupg7 = '<b>Transfer upgrade <span style="font-size:66.6%">#7</span></b><br>This upgrade lets you prestige at ' + format(1e38) + ' stars.<br>Prestige power gain was changed too if you buy this upgrade.'
			updateElement('tupg14button', ((oldDesign) ? 'You gain more prestige power over transfer points<br>' : '') + 'Cost: ' + format(3000) + ' TP')
			for (a = 1; a < 15; a++) {
					var tooltipText = ''
					if (player.explanations)
							tooltipText = explainList['tupg' + a]
					if (player.transferUpgrades.includes(a)) {
							var mult = getUpgradeMultiplier('tupg' + a)
							if (mult != undefined)
									tooltipText = (tooltipText == '' ? '' : tooltipText + '<br>') + 'Current multiplier: ' + format(mult) + 'x'
					}
					if (tooltipText == '') {
							disableTooltip('tupg' + a)
					} else {
							enableTooltip('tupg' + a)
							updateTooltip('tupg' + a, tooltipText)
					}
					if (player.transferUpgrades.includes(a)) {
							updateClass('tupg' + a + 'button', 'boughtUpgrade')
					} else if (a > 12 && player.transferUpgrades.length < 12) {
							updateClass('tupg' + a + 'button', 'lockedUpgrade')
					} else if (player.transferPoints.gte(costs.tupgs[a - 1])) {
							updateClass('tupg' + a + 'button', (oldDesign) ? 'upgradeButton' : 'longButton')
					} else {
							updateClass('tupg' + a + 'button', (oldDesign) ? 'unaffordUpgrade' : 'shopUnafford')
					}
			}
	}
	if (tab == 'supernova') {
			updateTooltipBase('neutronStars', 'You have <b>' + format(player.neutronStars) + '</b> neutron stars')
			if (player.supernovaUpgrades.length > 15) {
					updateClass('supernovaUpgradesTabButton', 'boughtUpgrade')
			} else {
					updateClass('supernovaUpgradesTabButton', (oldDesign) ? 'supernovaTabButton' : 'longButton')
			}
			if (player.supernovaTabsUnlocked > 0) {
					if (player.buyinshopFeatures.length > 5) {
							if (oldDesign)
									updateClass('supernovaLockedTab2', 'boughtUpgrade')
							else
									updateClass('buyinshopTabButton', 'boughtUpgrade')
					} else {
							if (oldDesign)
									updateClass('supernovaLockedTab2', 'supernovaTabButton')
							else
									updateClass('buyinshopTabButton', 'longButton')
					}
			}
			if (player.supernovaTabsUnlocked > 2) {
					if (player.neutronBoosts.powers[0] == 20 && player.neutronBoosts.powers[1] == 20 && player.neutronBoosts.powers[2] == 30 && player.neutronBoosts.basePower == 10 && player.neutronBoosts.ppPower == 0.15) {
							if (oldDesign)
									updateClass('supernovaLockedTab3', 'boughtUpgrade')
							else
									updateClass('neutronBoostTabButton', 'boughtUpgrade')
					} else {
							if (oldDesign)
									updateClass('supernovaLockedTab3', 'supernovaTabButton')
							else
									updateClass('neutronBoostTabButton', 'longButton')
					}
			}
			if (SNTab != oldSNTab) {
					showElement('supernova' + SNTab, 'block')
					hideElement('supernova' + oldSNTab)
					oldSNTab = SNTab
			}
			if (SNTab == 'upgrades') {
					updateElement('headstart', 'Headstart:<br>' + (player.headstarts ? 'On' : 'Off'))
					var disabledUpgrades = [2, 3, 6, 7, 8, 9, 11, 12, 14]
					for (a = 1; a < 17; a++) {
							var tooltipText = ''
							if (player.explanations)
									tooltipText = explainList['snupg' + a]
							if (player.supernovaUpgrades.includes(a)) {
									var mult = getUpgradeMultiplier('snupg' + a)
									if (mult != undefined)
											tooltipText = (tooltipText == '' ? '' : tooltipText + '<br>') + 'Current multiplier: ' + format(mult) + 'x'
							}
							if (tooltipText == '') {
									disableTooltip('snupg' + a)
							} else {
									enableTooltip('snupg' + a)
									updateTooltip('snupg' + a, tooltipText)
							}
							if (player.supernovaUpgrades.includes(a)) {
									if (disabledUpgrades.includes(a) && player.currentChallenge > 0) {
											updateClass('snupg' + a + 'button', 'lockedUpgrade')
									} else {
											updateClass('snupg' + a + 'button', 'boughtUpgrade')
									}
							} else if (player.neutronStars.gte(costs.snupgs[a - 1])) {
									updateClass('snupg' + a + 'button', (oldDesign) ? 'supernovaUpgrade' : 'supernovaButton')
							} else {
									updateClass('snupg' + a + 'button', (oldDesign) ? 'unaffordUpgrade' : 'shopUnafford')
							}
					}
			}
			if (SNTab == 'challenges') {
					if (player.challengeUnlocked < 12) {
							showElement('nextChall', 'inline-block')
							updateElement('nextChall', 'Next challenge unlock at ' + format(challreqs[player.challengeUnlocked]) + ' NS')
					} else {
							hideElement('nextChall')
					}
					if (player.currentChallenge == 0) {
							hideElement('exitChall')
					} else {
							showElement('exitChall', 'inline-block')
					}
					for (a = 1; a < 13; a++) {
							if (a > player.challengeUnlocked) {
									hideElement('chall' + a)
							} else {
									showElement('chall' + a, 'table-cell')
									var timesCompleted = (player.challengesCompleted[a] == undefined) ? 0 : player.challengesCompleted[a]
									if (player.currentChallenge == a) {
											updateElement('chall' + a + 'button', 'Running')
											updateClass('chall' + a + 'button', (oldDesign) ? 'challRunning' : 'shopUnafford')
									} else if (timesCompleted > 0) {
											updateElement('chall' + a + 'button', 'Completed')
											updateClass('chall' + a + 'button', (oldDesign) ? 'challCompleted' : 'boughtUpgrade')
									} else {
											updateElement('chall' + a + 'button', 'Start')
											updateClass('chall' + a + 'button', (oldDesign) ? 'tabButton' : 'longButton')
									}
									updateElement('chall' + a + 'comp', (timesCompleted == 0) ? '' : 'Completed ' + format(timesCompleted) + ' time' + ((timesCompleted == 1) ? '' : 's'))
							}
					}
			}
			if (SNTab == 'autobuyers') {
					var currentText = 'Interval: ' + formatTime(player.autobuyers.interval) + '<br>'
					updateElement((oldDesign) ? 'intReduceCost' : 'interval', currentText)
					if (!oldDesign)
							currentText = ''
					if (player.autobuyers.interval > 0.05 || oldDesign) {
							if (!oldDesign)
									showElement('intervalReduction', 'block')
							updateElement('intReduceCost', currentText + ((player.autobuyers.interval == 0.05) ? '' : ((oldDesign) ? 'Reduce the interval by 20%<br>' : '') + 'Cost: ' + formatNSCosts(costs.intReduceCost)))
							if (player.autobuyers.interval == 0.05) {
									updateClass('intReduceCost', 'boughtUpgrade')
							} else if (player.neutronStars.gte(costs.intReduceCost)) {
									updateClass('intReduceCost', (oldDesign) ? 'supernovaUpgrade' : 'supernovaButton')
							} else {
									updateClass('intReduceCost', (oldDesign) ? 'unaffordUpgrade' : 'shopUnafford')
							}
					} else {
							if (!oldDesign)
									hideElement('intervalReduction', currentText)
					}
					if (player.rewardBoxes[0] > 0) {
							showElement('rewardBoxes', 'inline-block')
							currentText = 'You have <b>' + player.rewardBoxes[0] + '</b> unopened reward boxes' + ((oldDesign) ? '<br><br>' : '')
							updateElement((oldDesign) ? 'openRewardBox' : 'rewardBoxAmount', currentText)
							if (!oldDesign)
									currentText = ''
							if (player.rewardBoxes[1] > 0) {
									updateClass('openRewardBox', (oldDesign) ? 'unaffordUpgrade' : 'shopUnafford')
									updateElement('openRewardBox', currentText + 'Opening in ' + formatTime(player.rewardBoxes[1]))
							} else {
									updateClass('openRewardBox', (oldDesign) ? 'supernovaUpgrade' : 'supernovaButton')
									updateElement('openRewardBox', currentText + 'Open')
							}
					} else {
							hideElement('rewardBoxes')
					}
					if (player.autobuyers.transfer == undefined) {
							hideElement('autotransfer')
					} else {
							showElement('autotransfer', 'table-cell')
					}
					if (player.autobuyers.prestige == undefined) {
							hideElement('autoprestige')
					} else {
							showElement('autoprestige', 'table-cell')
					}
					if (player.autobuyers.gens == undefined) {
							hideElement('autogenerator')
					} else {
							showElement('autogenerator', 'table-cell')
					}
					if (!player.buyinshopFeatures.includes(1)) {
							hideElement('bisBulkBuy')
					} else {
							showElement('bisBulkBuy', 'table-cell')
							currentText = 'Bulk: ' + format(player.autobuyers.gens.bulk) + 'x<br>'
							updateElement((oldDesign) ? 'bbIncreaseCost' : 'bulkBuy', currentText)
							if (!oldDesign)
									currentText = ''
							if (player.autobuyers.gens.bulk == 256 && !player.breakLimit) {
									hideElement('bulkBuyIncrease')
							} else {
									showElement('bulkBuyIncrease', 'block')
									updateElement('bbIncreaseCost', currentText + ((player.autobuyers.gens.bulk == 256 && !player.breakLimit) ? '' : ((oldDesign) ? 'Increase the bulk by 2x.<br>' : '') + 'Cost: ' + formatNSCosts(costs.bbCost)))
									if (player.neutronStars.gte(costs.bbCost)) {
											updateClass('bbIncreaseCost', (oldDesign) ? 'supernovaUpgrade' : 'supernovaButton')
									} else {
											updateClass('bbIncreaseCost', (oldDesign) ? 'unaffordUpgrade' : 'shopUnafford')
									}
							}
					}
					if (!player.buyinshopFeatures.includes(2)) {
							hideElement('bisPriorities')
					} else {
							showElement('bisPriorities', 'table-cell')
					}
					if (!player.buyinshopFeatures.includes(3)) {
							invisibleElement('bisPrestigeOptions')
					} else {
							visibleElement('bisPrestigeOptions')
					}
					if (!player.buyinshopFeatures.includes(4)) {
							invisibleElement('bisTransferOptions')
					} else {
							visibleElement('bisTransferOptions')
					}
					if (!player.buyinshopFeatures.includes(5)) {
							invisibleElement('bisTransferOptions2')
					} else {
							visibleElement('bisTransferOptions2')
					}
					if (!player.buyinshopFeatures.includes(6)) {
							hideElement('autonova')
					} else {
							showElement('autonova', 'table-cell')
					}
			}
			if (SNTab == 'buyinshop') {
					var descriptions = {
							1: 'Autogenerator bulk buy',
							2: 'Autogenerator priorities',
							3: 'Autoprestige options',
							4: 'Autotransfer options',
							5: 'Autotransfer options II',
							6: 'Autonova'
					}
					var odbrValues = {
							1: 2,
							2: 2,
							3: 2,
							4: 2,
							5: 2,
							6: 2
					}
					for (a in descriptions) {
							updateElement('bisfeature' + a + 'button', ((oldDesign) ? descriptions[a] + '<br>'.repeat(odbrValues[a]) : '') + 'Cost: ' + formatNSCosts(costs.bisfeatures[a - 1]))
					}
					for (a = 1; a < 7; a++) {
							if (player.explanations) {
									enableTooltip('bisfeature' + a)
									updateTooltip('bisfeature' + a, explainList['bisfeature' + a])
							} else {
									disableTooltip('bisfeature' + a)
							}
							if (player.buyinshopFeatures.includes(a)) {
									updateClass('bisfeature' + a + 'button', 'boughtUpgrade')
							} else if (player.neutronStars.gte(costs.bisfeatures[a - 1])) {
									updateClass('bisfeature' + a + 'button', (oldDesign) ? 'supernovaUpgrade' : 'supernovaButton')
							} else {
									updateClass('bisfeature' + a + 'button', (oldDesign) ? 'unaffordUpgrade' : 'shopUnafford')
							}
					}
			}
			if (SNTab == 'neutronboosts') {
					if (player.breakLimit) {
							updateElement('breakLimit', 'Fix limit')
					} else {
							updateElement('breakLimit', 'Break limit')
					}
					updateTooltipBase('neutronboost', 'x' + (Math.round(1e3 + 100 * Math.sqrt(player.neutronBoosts.basePower)) / 100) + '<sup>' + format(Decimal.add(player.neutronBoosts.powers[0], player.neutronBoosts.powers[1]).add(player.neutronBoosts.powers[2]), 2, 1) + '</sup> = <b>x' + format(neutronBoost) + '</b> for all production')

					var items = ['powerStars', 'powerTP', 'powerNS', 'basePower', 'ppPower']
					var boostType = ['stars', 'transfer points', 'neutron stars']

					for (a = 0; a < 5; a++) {
							var currentText = ''
							switch (a) {
							case 0:
									currentText = 'Power (stars): +' + player.neutronBoosts.powers[0] + (player.neutronBoosts.powers[0] < 20 ? ' (+1)' + ((oldDesign) ? '<br><br>' : '') : '')
									break
							case 1:
									currentText = 'Power (transfer points): +' + format(player.neutronBoosts.powers[a], 2, 1) + (player.neutronBoosts.powers[1] < 20 ? ' (+1)' + ((oldDesign) ? '<br><br>' : '') : '')
									break
							case 2:
									currentText = 'Power (neutron stars): +' + format(player.neutronBoosts.powers[a], 2, 1) + (player.neutronBoosts.powers[2] < 30 ? ' (+1)' + ((oldDesign) ? '<br><br>' : '') : '')
									break
							case 3:
									currentText = 'Base: ' + (Math.round(1e3 + 100 * Math.sqrt(player.neutronBoosts.basePower)) / 100) + ((player.neutronBoosts.basePower < 10) ? ' (+' + (Math.round(100 * (Math.sqrt(player.neutronBoosts.basePower + 1) - Math.sqrt(player.neutronBoosts.basePower))) / 100) + ')' + ((oldDesign) ? '<br><br>' : '') : '')
									break
							case 4:
									currentText = '<b>x' + format(neutronBoostPP) + '</b> for PP gain increase<br>Power (prestige): ' + player.neutronBoosts.ppPower + ((player.neutronBoosts.ppPower < 0.15) ? ' (+0.0375)' + ((oldDesign) ? '<br>' : '') : '')
									break
							}
							updateElement(items[a] + ((oldDesign) ? 'Cost' : ''), currentText)
							if (!oldDesign)
									currentText = ''
							if (oldDesign || ((a == 2) ? (player.neutronBoosts.powers[2] < 30) : (a == 3) ? (player.neutronBoosts.basePower < 10) : (a == 4) ? (player.neutronBoosts.ppPower < 0.15) : (player.neutronBoosts.powers[a] < 20))) {
									showElement(items[a] + 'Cost', 'inline-block')
									if ((a == 2) ? (player.neutronBoosts.powers[2] < 30) : (a == 3) ? (player.neutronBoosts.basePower < 10) : (a == 4) ? (player.neutronBoosts.ppPower < 0.15) : (player.neutronBoosts.powers[a] < 20))
											currentText = currentText + 'Cost: ' + ((a == 0) ? formatCosts(costs.neutronBoosts[a]) : (a == 1) ? (format(costs.neutronBoosts[a]) + ' TP') : formatNSCosts(costs.neutronBoosts[a]))
									updateElement(items[a] + 'Cost', currentText)
									if ((a == 2) ? (player.neutronBoosts.powers[2] == 30) : (a == 3) ? (player.neutronBoosts.basePower == 10) : (a == 4) ? (player.neutronBoosts.ppPower == 0.15) : (player.neutronBoosts.powers[a] == 20)) {
											updateClass(items[a] + 'Cost', 'boughtUpgrade')
									} else if ((a == 0) ? player.stars.gte(costs.neutronBoosts[0]) : (a == 1) ? player.transferPoints.gte(costs.neutronBoosts[1]) : player.neutronStars.gte(costs.neutronBoosts[a])) {
											updateClass(items[a] + 'Cost', (oldDesign) ? 'supernovaUpgrade' : 'supernovaButton')
									} else {
											updateClass(items[a] + 'Cost', (oldDesign) ? 'unaffordUpgrade' : 'shopUnafford')
									}
							} else {
									hideElement(items[a] + 'Cost', 'block')
							}
					}
			}
	}
})`;
		var tickfn_str=getraw`out.push(function(){
	var currentTime = performance.timeOrigin+performance.now()
if (player.lastUpdate>0) {
	if (currentTime/1000-lastSave>=60) {
		save()
	}

	var diff=(currentTime-player.lastUpdate)/1000
	player.playtime+=diff
	player.prestigePlaytime+=diff
	player.transferPlaytime+=diff
	player.supernovaPlaytime+=diff
	if (!showTooMuch) {
		for (a=0;a<player.highestTierPrestiges[0];a++) {
			var addAmount=player.generators[a].amount.times(getGeneratorMultiplier(a)).times(diff)
			if (a==0) {
				player.stars=player.stars.add(addAmount)
				player.totalStars=player.totalStars.add(addAmount)
			} else if (player.currentChallenge!=5) {
				player.generators[a-1].amount=player.generators[a-1].amount.add(addAmount)
			}
		}
		for (a=0;a<10;a++) {
			var addAmount=player.neutronTiers[a].amount.times(getNeutronTierMultiplier(a)).times(diff)
			if (a==0) {
				player.neutrons=player.neutrons.add(addAmount)
			} else {
				player.neutronTiers[a-1].amount=player.neutronTiers[a-1].amount.add(addAmount)
			}
		}
	}

	if (player.currentChallenge==8&&!(player.generators[0].bought==0)) player.challPow=player.challPow.times(Decimal.pow(0.99,diff*2))
	if (player.currentChallenge==11) player.challPow=player.challPow.times(Decimal.pow(1.03,diff)).min(1)
	if (player.stars.lt(0)) player.stars=new Decimal(0)
	if (player.stars.gte(150)) newStory(2)
	if (player.stars.gte(1e39)) newStory(8)
	if (player.stars.gte(1e81)) newStory(15)
	if (player.stars.gte(1e100)) newStory(17)
	if (player.stars.gte('1e1000')) newStory(31)
	if (player.stars.gte('1e3003')) newStory(33)
	if (player.stars.gte('1e5000')) newStory(36)
	if (player.transferPlaytime>0&&player.prestigePower.gte(1e3)) {
		gainRate[0]=getTransferPoints().div(player.transferPlaytime)
		if (gainRate[0].gt(player.gainPeak[0])) player.gainPeak[0]=gainRate[0]
	}
	if (player.supernovaPlaytime>0&&player.stars.gt(Number.MAX_VALUE)) {
		gainRate[1]=Decimal.div(getPostPrestigePoints(3),player.supernovaPlaytime)
		if (gainRate[1].gt(player.gainPeak[1])) player.gainPeak[1]=gainRate[1]
	}
	if ((player.stars.gte(Number.MAX_VALUE))&&(!player.breakLimit||player.currentChallenge>0||player.preSupernova)&&!showTooMuch) {
		player.stars=new Decimal(Number.MAX_VALUE)
		if (player.supernovaPlaytime>60||showTooMuch) showTooMuch=true
		else reset(3)
	}
	if (player.prestigePower.eq(0)) player.prestigePower=new Decimal(1) //Because I need to fix bugs from autobuyers.
	if (player.transferPoints.lt(0)) player.transferPoints=new Decimal(0)
	if (player.neutronStars.lt(0)) player.neutronStars=new Decimal(0)
	if (player.neutronStars.gt(1e100)) player.neutronStars=new Decimal(1e100)

	if (player.prestiges[2]>0||player.neutronStars.gt(0)) {
		while (streqs.length>player.supernovaTabsUnlocked && player.neutronStars.gte(streqs[player.supernovaTabsUnlocked])) {
			player.supernovaTabsUnlocked++
		}
		while (challreqs.length>player.challengeUnlocked && player.neutronStars.gte(challreqs[player.challengeUnlocked])) {
			player.challengeUnlocked++
		}
	}

	if (player.autobuyers.interval!=undefined&&!player.preSupernova) {
		var occurrences=0
		if (!showTooMuch&&!player.autobuyers.upgrade.disabled) {
			occurrences=Math.floor((player.playtime-player.autobuyers.upgrade.lastTick)/player.autobuyers.interval)
			if (occurrences>0) {
				player.autobuyers.upgrade.lastTick+=occurrences*player.autobuyers.interval
				var a=0
				while (a<14&&occurrences>0) {
					if (!player.transferUpgrades.includes(a+1)) {
						if (player.transferPoints.gte(costs.tupgs[a])) {
							buyTransferUpgrade(a+1)
							occurrences--
						} else {
							occurrences=0
						}
					}
					a++
				}
			}
		}
		if (player.autobuyers.supernova!=undefined?!player.autobuyers.supernova.disabled:false) {
			occurrences=Math.floor((player.playtime-player.autobuyers.supernova.lastTick)/player.autobuyers.interval)
			if (occurrences>0) {
				player.autobuyers.supernova.lastTick+=occurrences*player.autobuyers.interval
				if (Decimal.gte(getPostPrestigePoints(3),player.currentChallenge>0?1:player.autobuyers.supernova.ns)) checkToReset(3)
			}
		}
		if (!showTooMuch&&player.autobuyers.prestige!=undefined?!player.autobuyers.prestige.disabled:false) {
			occurrences=Math.floor((player.playtime-player.autobuyers.prestige.lastTick)/player.autobuyers.interval)
			if (occurrences>0) {
				player.autobuyers.prestige.lastTick+=occurrences*player.autobuyers.interval
				if (getPrestigePower().div(player.prestigePower).gte(player.autobuyers.prestige.times)) checkToReset(1)
			}
		}
		if (!showTooMuch&&player.autobuyers.transfer!=undefined?!player.autobuyers.transfer.disabled:false) {
			occurrences=Math.floor((player.playtime-player.autobuyers.transfer.lastTick)/player.autobuyers.interval)
			if (occurrences>0) {
				player.autobuyers.transfer.lastTick+=occurrences*player.autobuyers.interval
				if (getTransferPoints().div(player.transferPoints.max(1)).gte(player.autobuyers.transfer.times.sub(1))||getTransferPoints().gte(player.autobuyers.transfer.tp)) checkToReset(2)
			}
		}
		if (!showTooMuch&&player.autobuyers.gens!=undefined) {
			occurrences=Math.floor((player.playtime-player.autobuyers.gens.lastTick)/player.autobuyers.interval)
			if (occurrences>0) {
				player.autobuyers.gens.lastTick+=occurrences*player.autobuyers.interval
				for (a=0;a<(player.currentChallenge==3?9:10);a++) {
					var genTier=player.autobuyerPriorities[a]
					if (player.autobuyers.gens.tiers[genTier]!=undefined?player.autobuyers.gens.tiers[genTier]:false) {
						if (player.highestTierPrestiges[0]>genTier-2) buyGen(genTier,BigInteger.multiply(occurrences,player.autobuyers.gens.bulk))
					}
				}
			}
		}
	}

	if (player.rewardBoxes[1]>0) {
		player.rewardBoxes[1]=Math.max(player.rewardBoxes[1]-diff,0)
		if (player.rewardBoxes[1]==0) {
			unlockAutobuyer()
		}
	}

	neutronBoost=Decimal.pow(10+Math.sqrt(player.neutronBoosts.basePower),BigInteger.add(player.neutronBoosts.powers[0],BigInteger.add(player.neutronBoosts.powers[1],player.neutronBoosts.powers[2])))
	neutronBoostPP=neutronBoost.pow(player.neutronBoosts.ppPower)

	neutronPower=Decimal.pow(player.neutrons.add(1),Math.min(Math.max(15+player.neutrons.log10(),20),25)+Math.max(player.neutrons.log10()-10,0)/(Math.max(player.neutrons.log10()-10,0)/5+1))
	if (neutronPower.gt(1)) updateCosts('gens')

	notOnShift=1
	if (keysPressed.length>0&&notOnFocus&&player.hotkeys) {
		if (keysPressed.includes(16)) notOnShift=0
		for (a=1;a<11;a++) {
			var keyid=48+(a%10)
			if (keysPressed.includes(keyid)) {
				if (keysPressed.includes(16)) {
					buyGen(a,0)
				} else if (keysPressed.includes(17)) {
					buyNeutronGen(a)
					keysPressed=[]
				} else {
					buyGen(a)
					keysPressed=[]
				}
			}
		}
		if (keysPressed.includes(68)) {
			if (player.autobuyers.interval!=undefined) {
				var disabled=0
				if (player.autobuyers.upgrade!=undefined) if (player.autobuyers.upgrade.disabled) disabled++
				if (player.autobuyers.transfer!=undefined) if (player.autobuyers.transfer.disabled) disabled++
				if (player.autobuyers.prestige!=undefined) if (player.autobuyers.prestige.disabled) disabled++
				if (player.autobuyers.gens!=undefined) {
					for (a=1;a<11;a++) {
						if (player.autobuyers.gens.tiers[a]!=undefined) if (!player.autobuyers.gens.tiers[a]) disabled++
					}
				}
				if (player.autobuyers.supernova!=undefined) if (player.autobuyers.supernova.disabled) disabled++
				if (disabled==0) {
					if (player.autobuyers.upgrade!=undefined) player.autobuyers.upgrade.disabled=true
					if (player.autobuyers.transfer!=undefined) player.autobuyers.transfer.disabled=true
					if (player.autobuyers.prestige!=undefined) player.autobuyers.prestige.disabled=true
					if (player.autobuyers.gens!=undefined) {
						for (a=1;a<11;a++) {
							if (player.autobuyers.gens.tiers[a]!=undefined) player.autobuyers.gens.tiers[a]=false
						}
					}
					if (player.autobuyers.supernova!=undefined) player.autobuyers.supernova.disabled=true
				} else {
					if (player.autobuyers.upgrade!=undefined) player.autobuyers.upgrade.disabled=false
					if (player.autobuyers.transfer!=undefined) player.autobuyers.transfer.disabled=false
					if (player.autobuyers.prestige!=undefined) player.autobuyers.prestige.disabled=false
					if (player.autobuyers.gens!=undefined) {
						for (a=1;a<11;a++) {
							if (player.autobuyers.gens.tiers[a]!=undefined) player.autobuyers.gens.tiers[a]=true
						}
					}
					if (player.autobuyers.supernova!=undefined) player.autobuyers.supernova.disabled=false
				}
				updateAutobuyers()
			}
			keysPressed=[]
		}
		if (keysPressed.includes(77)) maxAll()
		if (keysPressed.includes(80)) {checkToReset(1);keysPressed=[];}
		if (keysPressed.includes(83)) {checkToReset(3);keysPressed=[];}
		if (keysPressed.includes(84)) {checkToReset(2);keysPressed=[];}
	}
}
player.lastUpdate=currentTime
})`;
		var [domfn,tickfn]=noteval([outctr_prestr,domfn_str,tickfn_str,outctr_endstr].join(";"));
		var dom_count=0;
		if(localStorage.tk_save) {
			window.mtickspeed=parseFloat(localStorage.tk_save);
			window.tickspeed=parseFloat(localStorage.tk_save);
		} else {
			window.tickspeed=1;
		}
		presfn=function() {
			if(getPrestigePower(player.stars).div(player.prestigePower).toNumber()>10) {
				//checkToReset(1);
				//maxAll();
				if(player.stars.toNumber()==10) {
					//console.log("r1", player.supernovaPlaytime.toFixed(3))
				}
				nxfn();
			} else if(showTooMuch) {
				console.log("r3");
				reset(3);
				nxfn();
			} else {
				//maxAll()
				nxfn();
			}
		};
		var perf_time=function() {return performance.timeOrigin+performance.now();};
		var endTime,duration,log_diff,log_size,curmul=0.0001,tikmul=1-curmul,startTime;
		var new_bg=1,new_bg_on=0,dbody;
		var dbs,rng,cntr=1,incr=1,cntg=1,incg=1,cntb=1,incb=1,ani_end=1;
		var bg_reset;
		var bgfn=function(rv) {
			cntr=(rv*255)*0.05+cntr*0.95;
			cntg=(rv*255)*0.05+cntg*0.95;
			cntb=(rv*255)*0.05+cntb*0.95;
			if(ani_end&&(cntr-incr>2||cntg-incg>2||cntb-incb>2||incr-cntr>2||incg-cntg>2||incb-cntb>2)) {
				new_bg_on=1;
				incr=cntr; incg=cntg; incb=cntb;
				dbs.background="rgb("+(25+cntr/2.25)+","+(11+cntg/3.75)+","+(34+cntb/2.75)+")";
				ani_end=0;
			}
		};
		nxfn=function() {
			var starlog=player.lastSupernovas[0][1].log(10)-player.stars.log(10);
			if(starlog>150) {
				//if(dom_count > 7){dom_count=0;domfn()};dom_count+=1;
				//window.cint = setTimeout(presfn, 25+20*Math.random())
				startTime=performance.timeOrigin+performance.now();
				//console.log("upg");
				tickfn();
				maxAll();
				if(++dom_count>25) {
					rng=Math.random();
					bgfn(rng*1.5);
					dom_count=0;
					domfn();
				};
				window.postMessage("");
			} else if(starlog>45) {
				startTime=performance.timeOrigin+performance.now();
				//console.log("upg");
				tickfn();
				//if(dom_count > 4){dom_count=0;domfn()};dom_count+=1;
				//window.cint = setTimeout(presfn, 25+20*Math.random())
				if(++dom_count>30) {
					rng=Math.random();
					bgfn(rng*1.3);
					dom_count=0;
					domfn();
					maxAll();
				}
				window.postMessage("");
			} else if(starlog>-0.5) {
				startTime=performance.timeOrigin+performance.now();
				//console.log("upg");
				tickfn();
				if(++dom_count>35) {
					rng=Math.random();
					bgfn(rng/1.5);
					dom_count=0;
					maxAll();
					domfn();
				}
				//window.cint = setTimeout(presfn, 25+20*Math.random())
				window.postMessage("");
			} else {
				if(++dom_count>40) {
					rng=Math.random();
					if(new_bg_on) {new_bg_on=0; bg_reset();}
					startTime=performance.timeOrigin+performance.now();
					//console.log("upg");
					tickfn();
					dom_count=0;
					domfn();
					window.postMessage("");
					endTime=performance.timeOrigin+performance.now();
					duration=endTime-startTime;
					log_diff=-1;
					log_size=-Math.log10((1/tickspeed)*1000)+log_diff;
					curmul=Math.pow(10,log_size)*4;
					tikmul=1-curmul;
					tickspeed=Math.max(duration*curmul+tickspeed*tikmul,1000/player.updateRate);
					//startTime=perf_time()
				} else {
					startTime=performance.timeOrigin+performance.now();
					//console.log("upg");
					tickfn();
					window.postMessage("");
					endTime=performance.timeOrigin+performance.now();
					duration=endTime-startTime;
					tickspeed=Math.max(duration*curmul+tickspeed*tikmul,1000/player.updateRate);
				};
				//window.cint = setTimeout(presfn, 25+20*Math.random())
			}

		};
		var to_done,waitfn=function() {
			if(window.hasOwnProperty("player")) {
				setTimeout(to_done,140);
			} else {
				window.cint=setTimeout(waitfn,70);
				return;
			}
		};
		var tkspeed_update=function() {
			tickspeed=mtickspeed;
		};
		bg_reset=function() {
			setTimeout(e => {
				dbs.transitionDuration="21s";
				dbs.background="";
				var cna=cntr+cntg+cntb; cna/=2.75;
				cntr=cntg=cntb=cna/3;
				if(!keysPressed.includes(16)) {keysPressed.push(16);};
				setTimeout(e => {
					checkToReset(3);
					dbs.transitionDuration="1.5s";
					ani_end=1;
				},22.5*1000);
			},1*1000);
		};
		to_done=function() {
			clearInterval(gameLoopInterval);
			setTimeout(tkspeed_update,20);
			if(!keysPressed.includes(16)) {keysPressed.push(16);};
			dbody=document.body;
			dbody.onanimationend=function() {
				ani_end=1;
			};
			dbs=dbody.style;
			dbs.transitionProperty="background-color";
			dbs.transitionDuration="1.5s";
			nxfn();
		};
		var msgfn=function() {setTimeout(presfn);};
		window.addEventListener("message",msgfn);
		var lisfn=function() {localStorage.tk_save=tickspeed;};
		window.addEventListener("unload",lisfn);
		waitfn();
	}
	)();
	//# sourceURL=UA_user_auto.js

	// Your code here...
})();