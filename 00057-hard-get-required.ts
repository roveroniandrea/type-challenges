// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>>,
]


// ============= Your Code Here =============
type GetRequired<T> = {
  [K in keyof T]: T[K]
}

type A = GetRequired<{ foo: number; bar?: string }>;
