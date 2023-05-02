// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]


// ============= Your Code Here =============
type TrimLeft<S extends string> = S extends ` ${infer Tail}` ? TrimLeft<Tail>
  : (
    S extends `\n${infer Tail}` ? TrimLeft<Tail>
    : (
      S extends `\t${infer Tail}` ? TrimLeft<Tail> : S
    )
  );
