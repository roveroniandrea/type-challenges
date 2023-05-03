// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MyCapitalize<'foobar'>, 'Foobar'>>,
  Expect<Equal<MyCapitalize<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<MyCapitalize<'foo bar'>, 'Foo bar'>>,
  Expect<Equal<MyCapitalize<''>, ''>>,
  Expect<Equal<MyCapitalize<'a'>, 'A'>>,
  Expect<Equal<MyCapitalize<'b'>, 'B'>>,
  Expect<Equal<MyCapitalize<'c'>, 'C'>>,
  Expect<Equal<MyCapitalize<'d'>, 'D'>>,
  Expect<Equal<MyCapitalize<'e'>, 'E'>>,
  Expect<Equal<MyCapitalize<'f'>, 'F'>>,
  Expect<Equal<MyCapitalize<'g'>, 'G'>>,
  Expect<Equal<MyCapitalize<'h'>, 'H'>>,
  Expect<Equal<MyCapitalize<'i'>, 'I'>>,
  Expect<Equal<MyCapitalize<'j'>, 'J'>>,
  Expect<Equal<MyCapitalize<'k'>, 'K'>>,
  Expect<Equal<MyCapitalize<'l'>, 'L'>>,
  Expect<Equal<MyCapitalize<'m'>, 'M'>>,
  Expect<Equal<MyCapitalize<'n'>, 'N'>>,
  Expect<Equal<MyCapitalize<'o'>, 'O'>>,
  Expect<Equal<MyCapitalize<'p'>, 'P'>>,
  Expect<Equal<MyCapitalize<'q'>, 'Q'>>,
  Expect<Equal<MyCapitalize<'r'>, 'R'>>,
  Expect<Equal<MyCapitalize<'s'>, 'S'>>,
  Expect<Equal<MyCapitalize<'t'>, 'T'>>,
  Expect<Equal<MyCapitalize<'u'>, 'U'>>,
  Expect<Equal<MyCapitalize<'v'>, 'V'>>,
  Expect<Equal<MyCapitalize<'w'>, 'W'>>,
  Expect<Equal<MyCapitalize<'x'>, 'X'>>,
  Expect<Equal<MyCapitalize<'y'>, 'Y'>>,
  Expect<Equal<MyCapitalize<'z'>, 'Z'>>,
]

// ============= Your Code Here =============
type MyCapitalize<S extends string> = S extends `${infer Head}${infer Tail}` ?
  ('' extends Tail ? (
    Head extends 'a' ? 'A' :
    Head extends 'b' ? 'B' :
    Head extends 'c' ? 'C' :
    Head extends 'd' ? 'D' :
    Head extends 'e' ? 'E' :
    Head extends 'f' ? 'F' :
    Head extends 'g' ? 'G' :
    Head extends 'h' ? 'H' :
    Head extends 'i' ? 'I' :
    Head extends 'j' ? 'J' :
    Head extends 'k' ? 'K' :
    Head extends 'l' ? 'L' :
    Head extends 'm' ? 'M' :
    Head extends 'n' ? 'N' :
    Head extends 'o' ? 'O' :
    Head extends 'p' ? 'P' :
    Head extends 'q' ? 'Q' :
    Head extends 'r' ? 'R' :
    Head extends 's' ? 'S' :
    Head extends 't' ? 'T' :
    Head extends 'u' ? 'U' :
    Head extends 'v' ? 'V' :
    Head extends 'w' ? 'W' :
    Head extends 'x' ? 'X' :
    Head extends 'y' ? 'Y' :
    Head extends 'z' ? 'Z' :
    Head
  ) : `${MyCapitalize<Head>}${Tail}`
  ) : '';
