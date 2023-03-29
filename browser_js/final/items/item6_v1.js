/* spell: disable
-- version_list item 6 --
v1 (cur): snippet_repo/javascript/final/item6_v1.js
*/
`(function() {
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
}
)`
