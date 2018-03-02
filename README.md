# basic-compose
[![NPM](https://nodei.co/npm/basic-compose.png?compact=true)](https://nodei.co/npm/basic-compose/)

basic functional composition function. 283 ES5 bytes gziped.

returns a function that sequentially calls all given functions
from last to first:
```js
compose: (..., f3, f2, f1) => {
  x => ...(f3(f2(f1(x))))
  (...c, x) => compose(..., f3.curry(...c), f2.curry(...c), f1.curry(...c))(x)
}
```
when the composed function is called with more than one argument `(...c, x)`,
it acts as if all given functions had been curried
with the leading context arguments `...c`,
without the overhead of actually currying each function.
this is useful, e.g. for composing reducers:
```js
const reducer = compose(reducerC, reducerB, reducerA)
reducer(previous, current) ===
  reducerC(previous, reducerB(previous, reducerA(previous, current)))
```

# Example
see this [example](./example/index.ts) in this directory.
run this example [in your browser](https://cdn.rawgit.com/ZenyWay/basic-compose/v2.1.0/example/index.html).

```ts
import compose from 'basic-compose'
import { map, take, tap } from 'rxjs/operators'
import { interval } from 'rxjs/observable/interval'
import { Observable } from 'rxjs/Observable';

interval(1000).pipe(
  take(5),
  tap(log('input:')),
  compose<Observable<string>>(
    map((s: string) => `${s.length}${s}`),
    map((x: number) => '.'.repeat(x)),
    map((x: number) => 4 - x)
  )
)
.subscribe(log('output:'), log('error:'), log('done'))
```
# API
```ts
declare function compose <O>(...fns: Function[]): (...args: any[]) => O
declare function compose <O>(fns: Function[]): (...args: any[]) => O
```
for a detailed specification of this API,
in particular for handling of corner cases,
run the [unit tests](https://cdn.rawgit.com/ZenyWay/basic-compose/v2.1.0/spec/web/index.html)
in your browser.

# TypeScript
although this library is written in [TypeScript](https://www.typescriptlang.org),
it may also be imported into plain JavaScript code:
modern code editors will still benefit from the available type definition,
e.g. for helpful code completion.

# License
Copyright 2018 Stéphane M. Catala

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the [License](./LICENSE) for the specific language governing permissions and
Limitations under the License.
