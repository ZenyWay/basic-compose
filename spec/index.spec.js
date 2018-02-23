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

describe('compose', function () {
  describe('when called with any number of function arguments', function () {
    let f1, f2, f3

    beforeEach(function () {
      f1 = jasmine.createSpy('f1').and.returnValue(1)
      f2 = jasmine.createSpy('f1').and.returnValue(2)
      f3 = jasmine.createSpy('f1').and.returnValue(3)
      compose(f3, f2, f1)(0)
    })

    it('returns a function that recursively calls all given functions ' +
    'from the last to the first starting with its argument', function () {
      expect(f1).toHaveBeenCalledWith(0)
      expect(f2).toHaveBeenCalledWith(1)
      expect(f3).toHaveBeenCalledWith(2)
    })
  })
  describe('when called with an array of functions', function () {
    let f1, f2, f3

    beforeEach(function () {
      f1 = jasmine.createSpy('f1').and.returnValue(1)
      f2 = jasmine.createSpy('f1').and.returnValue(2)
      f3 = jasmine.createSpy('f1').and.returnValue(3)
      compose([ f3, f2, f1 ])(0)
    })

    it('returns a function that recursively calls all given functions ' +
    'from the last to the first starting with its argument', function () {
      expect(f1).toHaveBeenCalledWith(0)
      expect(f2).toHaveBeenCalledWith(1)
      expect(f3).toHaveBeenCalledWith(2)
    })
  })
})
