/**
 * Sample usage:
 *   four = Util.getFour()
 *   console.log('4 = ', four)
 */
function getFour() {
  return 4;
}

/**
 * Sample usage:
 *   Util.getFourAsync(function (err, four) {
 *     console.log('4 = ', four)
 *   })
 */
function getFourAsync(cb) {
  // Well, it is not THAT async though :)
  cb(null, 4)
}

module.exports = {
  getFour: getFour,
  getFourAsync: getFourAsync
}
