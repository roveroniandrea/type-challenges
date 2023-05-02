// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Sum<2, 3>, '5'>>,
  Expect<Equal<Sum<'13', '21'>, '34'>>,
  Expect<Equal<Sum<'328', 7>, '335'>>,
  Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
  Expect<Equal<Sum<9999, 1>, '10000'>>,
  Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
  Expect<Equal<Sum<728, 0>, '728'>>,
  Expect<Equal<Sum<'0', 213>, '213'>>,
  Expect<Equal<Sum<0, '0'>, '0'>>,
]


// ============= Your Code Here =============

/** Type che somma due cifre tra loro, ritornando decine e unità separatamente */
type Sum2<A, B> =
  A extends "0" ? B extends "0" ? ["0", "0"] : B extends "1" ? ["0", "1"] : B extends "2" ? ["0", "2"] : B extends "3" ? ["0", "3"] : B extends "4" ? ["0", "4"] : B extends "5" ? ["0", "5"] : B extends "6" ? ["0", "6"] : B extends "7" ? ["0", "7"] : B extends "8" ? ["0", "8"] : B extends "9" ? ["0", "9"] : never : A extends "1" ? B extends "0" ? ["0", "1"] : B extends "1" ? ["0", "2"] : B extends "2" ? ["0", "3"] : B extends "3" ? ["0", "4"] : B extends "4" ? ["0", "5"] : B extends "5" ? ["0", "6"] : B extends "6" ? ["0", "7"] : B extends "7" ? ["0", "8"] : B extends "8" ? ["0", "9"] : B extends "9" ? ["1", "0"] : never : A extends "2" ? B extends "0" ? ["0", "2"] : B extends "1" ? ["0", "3"] : B extends "2" ? ["0", "4"] : B extends "3" ? ["0", "5"] : B extends "4" ? ["0", "6"] : B extends "5" ? ["0", "7"] : B extends "6" ? ["0", "8"] : B extends "7" ? ["0", "9"] : B extends "8" ? ["1", "0"] : B extends "9" ? ["1", "1"] : never : A extends "3" ? B extends "0" ? ["0", "3"] : B extends "1" ? ["0", "4"] : B extends "2" ? ["0", "5"] : B extends "3" ? ["0", "6"] : B extends "4" ? ["0", "7"] : B extends "5" ? ["0", "8"] : B extends "6" ? ["0", "9"] : B extends "7" ? ["1", "0"] : B extends "8" ? ["1", "1"] : B extends "9" ? ["1", "2"] : never : A extends "4" ? B extends "0" ? ["0", "4"] : B extends "1" ? ["0", "5"] : B extends "2" ? ["0", "6"] : B extends "3" ? ["0", "7"] : B extends "4" ? ["0", "8"] : B extends "5" ? ["0", "9"] : B extends "6" ? ["1", "0"] : B extends "7" ? ["1", "1"] : B extends "8" ? ["1", "2"] : B extends "9" ? ["1", "3"] : never : A extends "5" ? B extends "0" ? ["0", "5"] : B extends "1" ? ["0", "6"] : B extends "2" ? ["0", "7"] : B extends "3" ? ["0", "8"] : B extends "4" ? ["0", "9"] : B extends "5" ? ["1", "0"] : B extends "6" ? ["1", "1"] : B extends "7" ? ["1", "2"] : B extends "8" ? ["1", "3"] : B extends "9" ? ["1", "4"] : never : A extends "6" ? B extends "0" ? ["0", "6"] : B extends "1" ? ["0", "7"] : B extends "2" ? ["0", "8"] : B extends "3" ? ["0", "9"] : B extends "4" ? ["1", "0"] : B extends "5" ? ["1", "1"] : B extends "6" ? ["1", "2"] : B extends "7" ? ["1", "3"] : B extends "8" ? ["1", "4"] : B extends "9" ? ["1", "5"] : never : A extends "7" ? B extends "0" ? ["0", "7"] : B extends "1" ? ["0", "8"] : B extends "2" ? ["0", "9"] : B extends "3" ? ["1", "0"] : B extends "4" ? ["1", "1"] : B extends "5" ? ["1", "2"] : B extends "6" ? ["1", "3"] : B extends "7" ? ["1", "4"] : B extends "8" ? ["1", "5"] : B extends "9" ? ["1", "6"] : never : A extends "8" ? B extends "0" ? ["0", "8"] : B extends "1" ? ["0", "9"] : B extends "2" ? ["1", "0"] : B extends "3" ? ["1", "1"] : B extends "4" ? ["1", "2"] : B extends "5" ? ["1", "3"] : B extends "6" ? ["1", "4"] : B extends "7" ? ["1", "5"] : B extends "8" ? ["1", "6"] : B extends "9" ? ["1", "7"] : never : A extends "9" ? B extends "0" ? ["0", "9"] : B extends "1" ? ["1", "0"] : B extends "2" ? ["1", "1"] : B extends "3" ? ["1", "2"] : B extends "4" ? ["1", "3"] : B extends "5" ? ["1", "4"] : B extends "6" ? ["1", "5"] : B extends "7" ? ["1", "6"] : B extends "8" ? ["1", "7"] : B extends "9" ? ["1", "8"] : never : never;


/** Type che somma due cifre tra loro e una cifra di riporto, ritornando decine e unità separatamente */
type Sum3<A, B, CarryIN> =
  // Sommo le due cifre in input
  Sum2<A, B> extends [infer Rip1, infer Unit1] ?
  // Successivamente sommo il risultato precedente con il carryIN
  (
    Sum2<Unit1, CarryIN> extends [infer Rip2, infer Unit2] ?
    // Quindi sommo i due riporti appena ottenuti
    (
      Sum2<Rip1, Rip2> extends [string, infer CarryOUT] ?
      // In questo modo posso ritornare decine e unità
      [CarryOUT, Unit2]
      : never
    )
    : never
  )
  : never;


/** Ritorna true se in input vi è una stringa vuota */
type IsEmptyString<T extends string> = "" extends T ? 1 : 0;

/** Ritorna l'ultima cifra di una stringa */
type Last<T extends string, Acc extends string = ""> =
  T extends `${infer Head}${infer Tail}` ?
  (
    IsEmptyString<Tail> extends 1 ? [Acc, Head] : Last<Tail, `${Acc}${Head}`>
  )
  : [Acc, T];


/** Type che effettua la somma dati due numeri in forma di stringhe, con eventuale cifra di riporto */
type SumStrings<A extends string, B extends string, CarryIN extends string> =
  IsEmptyString<A> extends 1 ?
  (
    IsEmptyString<B> extends 1 ? CarryIN :
    (
      // Recupero la cifra meno significativa di B
      Last<B> extends [infer BHead, infer B0] ?
      (
        BHead extends string ?
        (
          // Sommo la cifra meno significativa di B con il CarryIN
          Sum2<B0, CarryIN> extends [infer CarryOUT, infer Res0] ?
          (
            CarryOUT extends string ?
            (
              Res0 extends string ?
              (
                // Ho calcolato la cifra meno significativa risultante e il riporto
                // Quindi procedo ricorsivamente, concatenando in testa la chiamata ricorsiva
                `${SumStrings<"", BHead, CarryOUT>}${Res0}`
              ) : never
            ) : never
          ) : never
        ) : never
      ) : never
    )
  ) :
  (
    IsEmptyString<B> extends 1 ?
    // In caso solo B sia vuota, mi riconduco al caso di solo A vuota
    SumStrings<B, A, CarryIN> :
    (
      // In questo caso A e B hanno almeno una cifra ciascuno
      // Procedo a recuperarle e sommarle
      Last<A> extends [infer AHead, infer A0] ?
      (
        AHead extends string ?
        (
          Last<B> extends [infer BHead, infer B0] ?
          (
            BHead extends string ?
            (
              // In questo caso effettuo le somme corrette
              // Sommo tra loro A0, B0 e CarryIN
              Sum3<A0, B0, CarryIN> extends [infer CarryOUT, infer Res0] ?
              (
                CarryOUT extends string ?
                (
                  Res0 extends string ?
                  (
                    // Ho calcolato la cifra meno significativa risultante e il riporto
                    // Quindi procedo ricorsivamente, concatenando in testa la chiamata ricorsiva
                    `${SumStrings<AHead, BHead, CarryOUT>}${Res0}`
                  ) : never
                ) : never
              ) : never
            ) : never
          ) : never
        ) : never
      ) : never
    )
  )

/** Type che rimuove i trailing zeros */
type ClearZeros<T extends string> = T extends `0${infer Tail}` ?
  IsEmptyString<Tail> extends 1 ? "0" : ClearZeros<Tail>
  : T;


type Sum<A extends string | number | bigint, B extends string | number | bigint> = ClearZeros<SumStrings<`${A}`, `${B}`, "0">>
