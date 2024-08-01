// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]


// ============= Your Code Here =============

type KebabChar<S extends string, Prefix extends boolean> = Lowercase<S> extends S ? S : `${Prefix extends true ? '-' : ''}${Lowercase<S>}`;

type KebabCaseAux<S extends string, Prefix extends boolean> = S extends '' ? ''
  : (S extends `${infer Head}${infer Tail}` ? `${KebabChar<Head, Prefix>}${KebabCaseAux<Tail, true>}` : KebabChar<S, Prefix>);

type KebabCase<S extends string> = KebabCaseAux<S, false>;
