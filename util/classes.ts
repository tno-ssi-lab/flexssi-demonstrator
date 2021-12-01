/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

/**
 * A simple javascript function for conditionally joining classNames together.
 * It takes any number of arguments which can be a string or object.
 * The argument 'foo' is short for {foo: true}.
 * If the value of the key is falsy, it won't be included in the output.
 */

type ClassValue =
  | string
  | number
  | ClassDictionary
  | ClassArray
  | undefined
  | null
  | false;

interface ClassDictionary {
  [id: string]: boolean | undefined | null;
}

// This is the only way I found to break circular references between ClassArray and ClassValue
// https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540
interface ClassArray extends Array<ClassValue> {} // tslint:disable-line no-empty-interface

var hasOwn = {}.hasOwnProperty;

export default function classes(...inputs: ClassValue[]) {
  var inputs: ClassValue[] = [];

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;

    var argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      inputs.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      var inner = classes.apply(null, arg);
      if (inner) {
        inputs.push(inner);
      }
    } else if (argType === 'object') {
      for (var key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          inputs.push(key);
        }
      }
    }
  }

  return inputs.join(' ');
}
