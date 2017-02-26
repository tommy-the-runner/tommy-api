/**
 * Sample usage:
 *   four = getFour()
 *   console.log('4 = ', four)
 *
 * 'Async' usage:
 *   getFour(function (err, four) {
 *     console.log('4 = ', four)
 *   })
 */
function getFour(cb) {
  if (cb) {
    // Well, it is not THAT async though :)
    cb(null, 4);
    return;
  }
  return 4;
}

module.exports = getFour
