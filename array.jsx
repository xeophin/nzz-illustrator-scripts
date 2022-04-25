/**
 *
 * @param {Function} callback function to apply on each element
 * @param {Object} thisArg object to use as this when callback parameter is executed
 * @todo add forEach function for array and collection
 */
 Array.prototype.forEach = function forEach (callback, thisArg) {
  'use strict';
  var T, k;

  if (this == null) {
      throw new TypeError("this is null or not defined");
  }

  var kValue,
  // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
      O = Object(this),

  // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
  // 3. Let len be ToUint32(lenValue).
      len = O.length >>> 0; // Hack to convert O.length to a UInt32

  // 4. If IsCallable(callback) is false, throw a TypeError exception.
  // See: http://es5.github.com/#x9.11
  if ({}.toString.call(callback) !== "[object Function]") {
      throw new TypeError(callback + " is not a function");
  }

  // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
  if (arguments.length >= 2) {
      T = thisArg;
  }

  // 6. Let k be 0
  k = 0;

  // 7. Repeat, while k < len
  while (k < len) {

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

          // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
          kValue = O[k];

          // ii. Call the Call internal method of callback with T as the this value and
          // argument list containing kValue, k, and O.
          callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
  }
  // 8. return undefined
};

/**
* Function to check if the element is in array, no conversion of type
* @param {*} the parameter to find
* @return {number} count the number of occurrence or 0
*/
Array.prototype.is_in_array = function (parameter) {
  var count = 0;
  for (x in this) {
      if (parameter === this[x]) {
          count++;
      }
  }
  return count;
}

toArray = function(iteratable) {
    var _arr = []
    for(var i=0; i<iteratable.length; i++) {
        _arr.push(iteratable[i])
    }
    return _arr
}


Array.prototype.map = function (callback) {
    var that = Object(this)
    var _arr = []
    for(var i=0; i<that.length;i++) {
        _arr.push(callback(this[i]))
    }
    return _arr
}

Array.prototype.filter = function (callback) {
    var _arr = []
    for(var i=0; i<this.length;i++) {
        if(callback(this[i])) {
            _arr.push(this[i])
        }
    }
    return _arr 
}

/**
* Function to return the lower number in an array
* @return {number} lowest_number the lower number in the array
*/
Array.prototype.min = function () {
  return Math.min.apply(null, this);
}

/**
* Function to return the bigger number in an array
* @return {number} bigger_number the bigger number in the array
*/
Array.prototype.max = function () {
  return Math.max.apply(null, this);
}

/**
* Function to delete all duplicated item of an array
* @return {Array.<T>}
*/
Array.prototype.unique = function () {

  var a = this.concat();

  for (var i = 0; i < a.length; ++i) {

      for (var j = i + 1; j < a.length; ++j) {

          if (a[i] === a[j]) {
              a.splice(j--, 1);
          }

      }
  }

  return a;
};
