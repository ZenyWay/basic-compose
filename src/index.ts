/**
 * @license
 * Copyright 2018 Stephane M. Catala
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
;
export default function compose <I,O>(...fns: Function[]): (v: I) => O
export default function compose <I,O>(fns: Function[]): (v: I) => O
export default function compose <I,O>(): (v: I) => O {
  if (arguments.length > 1) { return compose(<any>arguments) }
  const fs = arguments[0]
  if (!fs) { return fs }
  // single truthy argument
  const t = typeof fs.valueOf()
  return (t === 'function') || (t === 'string') || (typeof fs.length !== 'number')
    ? fs
    : fs.length <= 1
      ? fs[0]
      : function (v: I): O {
        let r = <any>v, i = fs.length
        while (i--) { r = fs[i](r) }
        return r
      }
}
