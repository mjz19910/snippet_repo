type SP1<A extends [string,string]>=A[0] extends infer EA extends A[0]? EA extends infer I? {b: I; raw_id: A[1];}:never:never;
