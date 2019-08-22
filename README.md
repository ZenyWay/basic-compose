# basic-compose
[![NPM](https://nodei.co/npm/basic-compose.png?compact=true)](https://nodei.co/npm/basic-compose/)

basic functional composition function. 214 ES5 bytes gziped.

returns a function that sequentially calls all given functions
from last to first:
```js
compose: (..., f3, f2, f1) =>
  (x, ...r) => ...(f3(f2(f1(x, ...r), ...r), ...r), ...r)
```
the composed function may be called with more than one argument `(x, ...r)`:
in that case, as described above, the rest arguments `...r` are applied
unchanged to each function.
this is useful, e.g. for composing reducers:
```js
const reducer = compose(reducerC, reducerB, reducerA)
reducer(previous, action) ===
  reducerC(reducerB(reducerA(previous, action), action), action)
```

# Example
see this [example](./example/index.ts) in this directory.
run this example [in your browser](https://cdn.rawgit.com/ZenyWay/basic-compose/v4.0.1/example/index.html).

```ts
import compose from 'basic-compose'
import log from './console'
const tap = fn => v => (fn(v), v)

const f = compose(
  tap(log('output:')),
  (s: string) => `${s.length}${s}`,
  (x: number) => '.'.repeat(x),
  x => 4 - x,
  tap(log('input:'))
)

;[0, 1, 2, 3, 4].forEach(f)
```

# API
```ts
export default compose;
declare function compose<A extends any[] = []>(
  ...fn: []
): <U>(v?: U, ...args: A) => U;
declare function compose<B, A extends any[] = []>(
  ...fn: []
): (v?: B, ...args: A) => B;
declare function compose<C, B = C, A extends any[] = []>(
  ...fn: [(v?: B, ...args: A) => C]
): (v?: B, ...args: A) => C;
declare function compose<D, C = D, B = C, A extends any[] = []>(
  ...fn: [
    (v?: C, ...args: A) => D,
    (v?: B, ...args: A) => C
  ]
): (v?: B, ...args: A) => D;
declare function compose<E, D = E, C = D, B = C, A extends any[] = []>(
  ...fn: [
    (v?: D, ...args: A) => E,
    (v?: C, ...args: A) => D,
    (v?: B, ...args: A) => C
  ]
): (v?: B, ...args: A) => E;
declare function compose<F, E = F, D = E, C = D, B = C, A extends any[] = []>(
  ...fn: [
    (v?: E, ...args: A) => F,
    (v?: D, ...args: A) => E,
    (v?: C, ...args: A) => D,
    (v?: B, ...args: A) => C
  ]
): (v?: B, ...args: A) => F;
declare function compose<
  G, F = G, E = F, D = E, C = D, B = C,
  A extends any[] = []
>(
  ...fn: [
    (v?: F, ...args: A) => G,
    (v?: E, ...args: A) => F,
    (v?: D, ...args: A) => E,
    (v?: C, ...args: A) => D,
    (v?: B, ...args: A) => C
  ]
): (v?: B, ...args: A) => G;
declare function compose<
  H, G = H, F = G, E = F, D = E, C = D, B = C,
  A extends any[] = []
>(
  ...fn: [
    (v?: G, ...args: A) => H,
    (v?: F, ...args: A) => G,
    (v?: E, ...args: A) => F,
    (v?: D, ...args: A) => E,
    (v?: C, ...args: A) => D,
    (v?: B, ...args: A) => C
  ]
): (v?: B, ...args: A) => H;
declare function compose<
  I, H = I, G = H, F = G, E = F, D = E, C = D, B = C,
  A extends any[] = []
>(
  ...fn: [
    (v?: H, ...args: A) => I,
    (v?: G, ...args: A) => H,
    (v?: F, ...args: A) => G,
    (v?: E, ...args: A) => F,
    (v?: D, ...args: A) => E,
    (v?: C, ...args: A) => D,
    (v?: B, ...args: A) => C
  ]
): (v?: B, ...args: A) => I;
declare function compose<
  J, I = J, H = I, G = H, F = G, E = F, D = E, C = D, B = C,
  A extends any[] = []
>(
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
): (v?: B, ...args: A) => J;
declare function compose<
  J, I = J, H = I, G = H, F = G, E = F, D = E, C = D, B = C,
  A extends any[] = []
>(
  f7: (v?: I, ...args: A) => J,
  f6: (v?: H, ...args: A) => I,
  f5: (v?: G, ...args: A) => H,
  f4: (v?: F, ...args: A) => G,
  f3: (v?: E, ...args: A) => F,
  f2: (v?: D, ...args: A) => E,
  f1: (v?: C, ...args: A) => D,
  f0: (v?: B, ...args: A) => C,
  ...fn: ((v?: any, ...args: A) => any)[]
): (v?: any, ...args: A) => J;
```
the current type definition provides strong typing
for up to eight composed functions, and relaxed typing beyond.

for a detailed specification of this API,
run the [unit tests](https://cdn.rawgit.com/ZenyWay/basic-compose/v4.0.1/spec/web/index.html)
in your browser.

# TypeScript
although this library is written in [TypeScript](https://www.typescriptlang.org),
it may also be imported into plain JavaScript code:
modern code editors will still benefit from the available type definition,
e.g. for helpful code completion.

# License
Copyright 2019 Stéphane M. Catala

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the [License](./LICENSE) for the specific language governing permissions and
Limitations under the License.
