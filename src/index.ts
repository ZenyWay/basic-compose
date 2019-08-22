/**
 * @license
 * Copyright 2019 Stephane M. Catala
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * Limitations under the License.
 */
export default compose

function compose<A extends any[] = []> (
  ...fn: []
): <U>(v?: U, ...args: A) => U
function compose<B, A extends any[] = []> (
  ...fn: []
): (v?: B, ...args: A) => B
function compose<C, B = C, A extends any[] = []> (
  ...fn: [(v?: B, ...args: A) => C]
): (v?: B, ...args: A) => C
function compose<D, C = D, B = C, A extends any[] = []> (
  ...fn: [
    (v?: C, ...args: A) => D,
    (v?: B, ...args: A) => C
  ]
): (v?: B, ...args: A) => D
function compose<E, D = E, C = D, B = C, A extends any[] = []> (
  ...fn: [
    (v?: D, ...args: A) => E,
    (v?: C, ...args: A) => D,
    (v?: B, ...args: A) => C
  ]
): (v?: B, ...args: A) => E
function compose<F, E = F, D = E, C = D, B = C, A extends any[] = []> (
  ...fn: [
    (v?: E, ...args: A) => F,
    (v?: D, ...args: A) => E,
    (v?: C, ...args: A) => D,
    (v?: B, ...args: A) => C
  ]
): (v?: B, ...args: A) => F
function compose<G, F = G, E = F, D = E, C = D, B = C, A extends any[] = []> (
  ...fn: [
    (v?: F, ...args: A) => G,
    (v?: E, ...args: A) => F,
    (v?: D, ...args: A) => E,
    (v?: C, ...args: A) => D,
    (v?: B, ...args: A) => C
  ]
): (v?: B, ...args: A) => G
function compose<H, G = H, F = G, E = F, D = E, C = D, B = C, A extends any[] = []> (
  ...fn: [
    (v?: G, ...args: A) => H,
    (v?: F, ...args: A) => G,
    (v?: E, ...args: A) => F,
    (v?: D, ...args: A) => E,
    (v?: C, ...args: A) => D,
    (v?: B, ...args: A) => C
  ]
): (v?: B, ...args: A) => H
function compose<I, H = I, G = H, F = G, E = F, D = E, C = D, B = C, A extends any[] = []> (
  ...fn: [
    (v?: H, ...args: A) => I,
    (v?: G, ...args: A) => H,
    (v?: F, ...args: A) => G,
    (v?: E, ...args: A) => F,
    (v?: D, ...args: A) => E,
    (v?: C, ...args: A) => D,
    (v?: B, ...args: A) => C
  ]
): (v?: B, ...args: A) => I
function compose<J, I = J, H = I, G = H, F = G, E = F, D = E, C = D, B = C, A extends any[] = []> (
  ...fn: [
    (v?: I, ...args: A) => J,
    (v?: H, ...args: A) => I,
    (v?: G, ...args: A) => H,
    (v?: F, ...args: A) => G,
    (v?: E, ...args: A) => F,
    (v?: D, ...args: A) => E,
    (v?: C, ...args: A) => D,
    (v?: B, ...args: A) => C
  ]
): (v?: B, ...args: A) => J
function compose<J, I = J, H = I, G = H, F = G, E = F, D = E, C = D, B = C, A extends any[] = []> (
  f7: (v?: I, ...args: A) => J,
  f6: (v?: H, ...args: A) => I,
  f5: (v?: G, ...args: A) => H,
  f4: (v?: F, ...args: A) => G,
  f3: (v?: E, ...args: A) => F,
  f2: (v?: D, ...args: A) => E,
  f1: (v?: C, ...args: A) => D,
  f0: (v?: B, ...args: A) => C,
  ...fn: ((v?: any, ...args: A) => any)[]
): (v?: any, ...args: A) => J
function compose (...fs: any[]) {
  return function (...args: any[]): any {
    let i = fs.length
    while (i--) {
      args[0] = fs[i].apply(void 0, args)
    }
    return args[0]
  }
}
