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
import compose from '../'
import log from './console'
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