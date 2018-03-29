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

  it('exposes an `into` method', function () {
    expect(compose.into).toEqual(jasmine.any(Function))
  })

  describe('when called with at least two arguments, ' +
  'or with an array-like object of at least two entries:', function () {
    let fs, args

    beforeEach(function () {
      fs = createSpies(2 + 3 + 16)
      args = []
      args.push([ fs[1], fs[0] ])
      compose(...args[0])(0)
      compose(args[0])(0)
      args.push([ fs[4], fs[3], fs[2] ])
      compose(...args[1])(2)
      compose(args[1])(2)
      args.push(fs.slice(5).reverse())
      compose(...args[2])('foo', 'bar', 5)
      compose(args[2])('foo', 'bar', 5)
    })

    it('it calls all given functions, from last to first. ' +
    'all arguments to the resulting function are passed to each function as is, ' +
    'except the last, which is the result from the previous function call.', function () {
      Object.keys(fs).forEach(function (n) {
        if (n < 5) {
          expect(fs[n].calls.allArgs()).toEqual([ [ Number(n) ], [ Number(n) ] ])
        }
        if (n >= 5) {
          expect(fs[n].calls.allArgs()).toEqual([
            [ 'foo', 'bar', Number(n) ], [ 'foo', 'bar', Number(n) ]
          ])
        }
      })
    })
  })

  describe('when called with no argument or an empty array-like object:',
  function () {
    const res = []

    beforeEach(function () {
      res.push(compose())
      res.push(compose([]))
    })

    it('returns undefined', function () {
      expect(res).toEqual([ void 0, void 0 ])
    })
  })

  describe('when called with a single falsy or non array-like argument, ' +
  'or with a single function, or with a single string, ' +
  'or with a single array-like object with a single entry:', function () {
    function f () {}
    const d = Date.now()
    const r = /.*/i
    const o = {}
    const args = [
      void 0, null, false, 0, NaN, '', // falsy
      'foo', f, // string or function
      d, r, o // non array-like
    ]

    const res = [ [], [], [] ]

    beforeEach(function () {
      args.forEach(function (arg) {
        res[0].push(compose(arg))
        res[1].push(compose([ arg ]))
      })
      res[2].push(compose([ [ 'foo' ] ]))
    })

    it('returns that argument or entry', function () {
      expect(res[0]).toEqual(args)
      expect(res[1]).toEqual(args)
      expect(res[2]).toEqual([ [ 'foo' ] ])
    })
  })

  describe('compose.into:', function () {
    it('returns a function that exposes an `into` method', function () {
      expect(compose.into()).toEqual(jasmine.any(Function))
      expect(compose.into().into).toEqual(jasmine.any(Function))
    })

    describe('when called with an index offset:',
    function () {
      let fs, args

      beforeEach(function () {
        fs = createSpies(2 + 3 + 16)
        args = []
        args.push(fs.slice(5).reverse())
        compose.into(0)(...args[0])(5, 'foo', 'bar')
        compose.into(0)(args[0])(5, 'foo', 'bar')
        compose.into(-2)(...args[0])('foo', 5, 'bar')
        compose.into(-2)(args[0])('foo', 5, 'bar')
      })

      it('returns a function that sequentially calls all given functions, ' +
      'from last to first. all arguments to the resulting function ' +
      'are passed to each function as is, except that at the defined offset: ' +
      'that argument is the result from the previous function call.',
      function () {
        Object.keys(fs).filter(function (n) { return n >= 5 })
        .forEach(function (n) {
          expect(fs[n].calls.allArgs()).toEqual([
            [ Number(n), 'foo', 'bar' ], [ Number(n), 'foo', 'bar' ],
            [ 'foo', Number(n), 'bar' ], [ 'foo', Number(n), 'bar' ]
          ])
        })
      })
    })
  })
})

function createSpies (count) {
  const fs = new Array(count)
  let n = fs.length
  while (n--) { fs[n] = createSpy(n) }
  return fs
}

function createSpy (n) {
  return jasmine.createSpy(`f${n}`).and.returnValue(n + 1)
}
