type P$tracking$param<T extends string>=[
	`${T}.trackingParams.f1`,
	`${T}.trackingParams.f2`,
	`${T}.trackingParams.f3`,
	`${T}.trackingParams.f4.f1`,
	`${T}.trackingParams.f4.f2`,
	`${T}.trackingParams.f4.f3`,
	`${T}.trackingParams.f4`,
	`${T}.trackingParams.f6`,
	`${T}.trackingParams.f9`,
	`${T}.trackingParams`
][number];
