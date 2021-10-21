/**
* @desc 买卖股票的最佳时机
* @desc 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
* @desc 如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。注意你不能在买入股票前卖出股票。
* @example 输入: [7,1,5,3,6,4]
*          输出: 7
*          输入: [1,2,3,4,5]
*          输出: 4
*          输入: [7,6,4,3,1]
*          输出: 0
* @param {Array} list 输入数组
* @date 2021年10月21日 11:12:49
*/
function maxProfit(list){
    if (list.length < 2) {
        return 0
      }

      let temp = 0
      let profit = 0
      for (let i = 0; i < list.length; i++) {
        temp = list[i] - list[i - 1]
        if (temp > 0) {
          profit += temp
        }
      }

      return profit
}