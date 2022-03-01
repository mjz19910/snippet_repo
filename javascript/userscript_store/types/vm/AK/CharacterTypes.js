"use strict";
exports.__esModule = true;
exports.is_ascii_digit = void 0;
/*
 * Copyright (c) 2021, @mjz19910 <matthias291999@gmail.com>
 * Copyright (c) 2021, Max Wipfli <mail@maxwipfli.ch>
 * Copyright (c) 2022, the SerenityOS developers.
 *
 * SPDX-License-Identifier: BSD-2-Clause
 *
 *
 * Some code is close enough to the code on the SerenityOS repo, the copyright should be here too
 */
// constexpr bool is_ascii_digit(u32 code_point)
function is_ascii_digit(code_point) {
    return code_point.charCodeAt(0) >= '0'.charCodeAt(0) &&
        code_point.charCodeAt(0) <= '9'.charCodeAt(0);
}
exports.is_ascii_digit = is_ascii_digit;
