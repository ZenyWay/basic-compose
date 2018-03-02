!function(){return function e(t,n,r){function o(i,a){if(!n[i]){if(!t[i]){var c="function"==typeof require&&require;if(!a&&c)return c(i,!0);if(u)return u(i,!0);var f=new Error("Cannot find module '"+i+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[i]={exports:{}};t[i][0].call(l.exports,function(e){var n=t[i][1][e];return o(n||e)},l,l.exports,e,t,n,r)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<r.length;i++)o(r[i]);return o}}()({1:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function e(){if(arguments.length>1)return e(arguments);var t=arguments[0];if(!t)return t;var n=typeof t.valueOf();return"function"===n||"string"===n||"number"!=typeof t.length?t:t.length<=1?t[0]:function(){for(var e=[],n=arguments.length,r=n-1;n--;)e[n]=arguments[n];for(n=t.length;n--;)e[r]=t[n].apply(void 0,e);return e[r]}}},{}],2:[function(e,t,n){"use strict";const r=e(1).default;function o(e){return jasmine.createSpy(`f${e}`).and.returnValue(e+1)}describe("compose",function(){describe("when called with at least two arguments, or with an array-like object of at least two entries",function(){const e=function(e){const t=new Array(e);let n=t.length;for(;n--;)t[n]=o(n);return t}(21),t=[];beforeEach(function(){t.push([e[1],e[0]]),r(...t[0])(0),r(t[0])(0),t.push([e[4],e[3],e[2]]),r(...t[1])(2),r(t[1])(2),t.push(e.slice(5).reverse()),r(...t[2])("foo","bar",5),r(t[2])("foo","bar",5)}),it("returns a function that sequentially calls all given functions, from last to first. leading arguments to the resulting function are passed to each function as is, the trailing argument of each function being the result from the previous.",function(){Object.keys(e).forEach(function(t){t<5&&expect(e[t].calls.allArgs()).toEqual([[Number(t)],[Number(t)]]),t>=5&&expect(e[t].calls.allArgs()).toEqual([["foo","bar",Number(t)],["foo","bar",Number(t)]])})})}),describe("when called with no argument or an empty array-like object",function(){const e=[];beforeEach(function(){e.push(r()),e.push(r([]))}),it("returns undefined",function(){expect(e).toEqual([void 0,void 0])})}),describe("when called with a single falsy or non array-like argument, or with a single function, or with a single string, or with a single array-like object with a single entry",function(){const e=[void 0,null,!1,0,NaN,"","foo",function(){},Date.now(),/.*/i,{}],t=[[],[],[]];beforeEach(function(){e.forEach(function(e){t[0].push(r(e)),t[1].push(r([e]))}),t[2].push(r([["foo"]]))}),it("returns that argument or entry",function(){expect(t[0]).toEqual(e),expect(t[1]).toEqual(e),expect(t[2]).toEqual([["foo"]])})})})},{1:1}]},{},[2]);
