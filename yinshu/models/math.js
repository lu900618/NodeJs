/**
 * 计算因数
 * @param number 要计算的数字
 */
exports.calc = number => {
  let rs = []
  for (let i = 1; i <= number; i++) {
    if (number % i === 0) {
      rs.push(i)
    }
  }
  return rs
}
