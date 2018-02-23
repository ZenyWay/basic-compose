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
  const fns = arguments[0]
	if (typeof fns === 'function') {
		return compose(<any>arguments)
	}
	return function (v: I): O {
		let r = <any>v, i = fns.length
		while (i--) {
			r = fns[i](r)
		}
		return r
	}
}