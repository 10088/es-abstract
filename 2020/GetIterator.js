'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $asyncIterator = GetIntrinsic('%Symbol.asyncIterator%', true);

var inspect = require('object-inspect');
var hasSymbols = require('has-symbols')();

var getIteratorMethod = require('../helpers/getIteratorMethod');
var AdvanceStringIndex = require('./AdvanceStringIndex');
var Call = require('./Call');
var CreateAsyncFromSyncIterator = require('./CreateAsyncFromSyncIterator');
var GetMethod = require('./GetMethod');
var GetV = require('./GetV');
var IsArray = require('./IsArray');
var Type = require('./Type');

// https://262.ecma-international.org/9.0/#sec-getiterator
module.exports = function GetIterator(obj, hint, method) {
	var actualHint = hint;
	if (arguments.length < 2) {
		actualHint = 'sync';
	}
	if (actualHint !== 'sync' && actualHint !== 'async') {
		throw new $TypeError("Assertion failed: `hint` must be one of 'sync' or 'async', got " + inspect(hint));
	}

	var actualMethod = method;
	if (arguments.length < 3) {
		if (actualHint === 'async') {
			if (hasSymbols && $asyncIterator) {
				actualMethod = GetMethod(obj, $asyncIterator);
			}
			if (actualMethod === undefined) {
				throw new $TypeError("async from sync iterators aren't currently supported");
			}
		} else {
			actualMethod = getIteratorMethod(
				{
					AdvanceStringIndex: AdvanceStringIndex,
					GetMethod: GetMethod,
					IsArray: IsArray,
					Type: Type
				},
				obj
			);
		}
	}
	var method;
	if (arguments.length < 3) {
		if (hint === 'async') {
			method = GetMethod(obj, Symbol.asyncIterator);
			if (typeof method !== 'undefined') {
				var syncMethod = getIteratorMethod(
					{
						AdvanceStringIndex: AdvanceStringIndex,
						GetMethod: GetMethod,
						IsArray: IsArray,
						Type: Type
					},
					obj
				);
				var syncIteratorRecord = GetIterator(obj, 'sync', syncMethod);
				return CreateAsyncFromSyncIterator(syncIteratorRecord);
			}
		} else {
			method = getIteratorMethod(
				{
					AdvanceStringIndex: AdvanceStringIndex,
					GetMethod: GetMethod,
					IsArray: IsArray,
					Type: Type
				},
				obj
			);
		}
	}
	var iterator = Call(method, obj);
	if (Type(iterator) !== 'Object') {
		throw new $TypeError('iterator must return an object');
	}

	var nextMethod = GetV(iterator, 'next');

	var iteratorRecord = {
		'[[Iterator]]': iterator,
		'[[NextMethod]]': nextMethod,
		'[[Done]]': false
	};

	return iteratorRecord;
};
