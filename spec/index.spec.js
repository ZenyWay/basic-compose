'use strict' /* eslint-env jasmine */
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
//
const compose = require('../').default

describe('compose:', function () {
  it('is a function', function () {
    expect(compose).toEqual(jasmine.any(Function))
  })

  describe('when called with at least two arguments,', function () {
    let fs, args

    beforeEach(function () {
      fs = createSpies(2 + 3 + 16)
      args = []
      args.push([fs[1], fs[0]])
      compose(...args[0])(0)
      args.push([fs[4], fs[3], fs[2]])
      compose(...args[1])(2)
      args.push(fs.slice(5).reverse())
      compose(...args[2])(5, 'foo', 'bar')
    })

    it(
      'it calls all given functions, from last to first. ' +
        'all arguments to the resulting function are passed to each function as is, ' +
        'except the first, which is the result from the previous function call.',
      function () {
        Object.keys(fs).forEach(function (n) {
          if (n < 5) {
            expect(fs[n].calls.allArgs()).toEqual([[Number(n)]])
          }
          if (n >= 5) {
            expect(fs[n].calls.allArgs()).toEqual([[Number(n), 'foo', 'bar']])
          }
        })
      }
    )
  })

  describe('when called with no argument:', function () {
    const res = []

    beforeEach(function () {
      res.push(compose())
    })

    it('returns the identity function', function () {
      expect(res).toEqual([jasmine.any(Function)])
      expect(res[0](42)).toEqual(42)
    })
  })
})

function createSpies (count) {
  const fs = new Array(count)
  let n = fs.length
  while (n--) {
    fs[n] = createSpy(n)
  }
  return fs
}

function createSpy (n) {
  return jasmine.createSpy(`f${n}`).and.returnValue(n + 1)
}
