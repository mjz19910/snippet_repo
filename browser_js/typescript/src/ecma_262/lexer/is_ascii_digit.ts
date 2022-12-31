/*
 * Copyright (c) 2021, @mjz19910 <matthias291999@gmail.com>
 * Copyright (c) 2021, Max Wipfli <mail@maxwipfli.ch>
 * Copyright (c) 2022, the SerenityOS developers.
 *
 * SPDX-License-Identifier: BSD-2-Clause
 *
 *
 * Some code is close enough to the code on the SerenityOS repo, the copyright should be here too */
// constexpr bool is_ascii_digit(u32 code_point)

export function is_ascii_digit(code_point: string) {
	return code_point>='0'&&code_point<='9';
}
