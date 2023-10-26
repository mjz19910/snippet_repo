// ==UserScript==
// @name         youtube plugin
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// eslint-disable no-native-reassign,no-implicit-globals,no-undef,no-lone-blocks,no-sequences

import {entry_point} from "./entry_point.ts"

entry_point()
