!function(){return function t(e,n,o){function r(u,a){if(!n[u]){if(!e[u]){var c="function"==typeof require&&require;if(!a&&c)return c(u,!0);if(i)return i(u,!0);var f=new Error("Cannot find module '"+u+"'");throw f.code="MODULE_NOT_FOUND",f}var s=n[u]={exports:{}};e[u][0].call(s.exports,function(t){return r(e[u][1][t]||t)},s,s.exports,t,e,n,o)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<o.length;u++)r(o[u]);return r}}()({1:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function t(e){return void 0===e&&(e=-1),n.into=t,n;function n(){if(arguments.length>1)return n(arguments);var t=arguments[0];if(!t)return t;var o=typeof t.valueOf();return"function"===o||"string"===o||"number"!=typeof t.length?t:t.length<=1?t[0]:function(){for(var n=arguments.length,o=function(t,e){return e<t?e<0?0:e:t}(n-1,function(t,e){return e<0?t+e:e}(n,e)),r=new Array(n);n--;)r[n]=arguments[n];for(n=t.length;n--;)r[o]=t[n].apply(void 0,r);return r[o]}}}()},{}],2:[function(t,e,n){"use strict";const o=t(1).default;function r(t){const e=new Array(t);let n=e.length;for(;n--;)e[n]=i(n);return e}function i(t){return jasmine.createSpy(`f${t}`).and.returnValue(t+1)}describe("compose:",function(){it("is a function",function(){expect(o).toEqual(jasmine.any(Function))}),it("exposes an `into` method",function(){expect(o.into).toEqual(jasmine.any(Function))}),describe("when called with at least two arguments, or with an array-like object of at least two entries:",function(){let t,e;beforeEach(function(){t=r(21),(e=[]).push([t[1],t[0]]),o(...e[0])(0),o(e[0])(0),e.push([t[4],t[3],t[2]]),o(...e[1])(2),o(e[1])(2),e.push(t.slice(5).reverse()),o(...e[2])("foo","bar",5),o(e[2])("foo","bar",5)}),it("it calls all given functions, from last to first. all arguments to the resulting function are passed to each function as is, except the last, which is the result from the previous function call.",function(){Object.keys(t).forEach(function(e){e<5&&expect(t[e].calls.allArgs()).toEqual([[Number(e)],[Number(e)]]),e>=5&&expect(t[e].calls.allArgs()).toEqual([["foo","bar",Number(e)],["foo","bar",Number(e)]])})})}),describe("when called with no argument or an empty array-like object:",function(){const t=[];beforeEach(function(){t.push(o()),t.push(o([]))}),it("returns undefined",function(){expect(t).toEqual([void 0,void 0])})}),describe("when called with a single falsy or non array-like argument, or with a single function, or with a single string, or with a single array-like object with a single entry:",function(){const t=[void 0,null,!1,0,NaN,"","foo",function(){},Date.now(),/.*/i,{}],e=[[],[],[]];beforeEach(function(){t.forEach(function(t){e[0].push(o(t)),e[1].push(o([t]))}),e[2].push(o([["foo"]]))}),it("returns that argument or entry",function(){expect(e[0]).toEqual(t),expect(e[1]).toEqual(t),expect(e[2]).toEqual([["foo"]])})}),describe("compose.into:",function(){it("returns a function that exposes an `into` method",function(){expect(o.into()).toEqual(jasmine.any(Function)),expect(o.into().into).toEqual(jasmine.any(Function))}),describe("when called with an index offset:",function(){let t,e;beforeEach(function(){t=r(21),(e=[]).push(t.slice(5).reverse()),o.into(0)(...e[0])(5,"foo","bar"),o.into(0)(e[0])(5,"foo","bar"),o.into(-2)(...e[0])("foo",5,"bar"),o.into(-2)(e[0])("foo",5,"bar")}),it("returns a function that sequentially calls all given functions, from last to first. all arguments to the resulting function are passed to each function as is, except that at the defined offset: that argument is the result from the previous function call.",function(){Object.keys(t).filter(function(t){return t>=5}).forEach(function(e){expect(t[e].calls.allArgs()).toEqual([[Number(e),"foo","bar"],[Number(e),"foo","bar"],["foo",Number(e),"bar"],["foo",Number(e),"bar"]])})})})})})},{1:1}]},{},[2]);