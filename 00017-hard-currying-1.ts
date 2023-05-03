// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)
const curried3 = Currying(() => true)

type cases = [
  Expect<Equal<
    typeof curried1, (a: string) => (b: number) => (c: boolean) => true
  >>,
  Expect<Equal<
    typeof curried2, (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
  >>,
  Expect<Equal<typeof curried3, () => true>>,
]


// ============= Your Code Here =============
/** Curries arguments and return type, optionally returning a function with no params in case Args is empty array */
type Curried<Args, Return, AcceptEmpty extends 1 | 0> = Args extends [infer Head, ...infer Tail] ? (
  // Calling recursively, explicitly converting empty params as return type to in order to prevent a final empty parenthesis i.e. myFunc(a)(b)()
  (arg: Head) => Curried<Tail, Return, 0>
) : AcceptEmpty extends 1 ? () => Return : Return

// Using Args extends any[] and typing ...args: Args makes sure to infer right elements' types
declare function Currying<Args extends any[], Return extends boolean>(fn: (...args: Args) => Return): Curried<Args, Return, 1>
