/**
* @desc 最长公共前缀
*       编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，则返回""
* @example 输入: ["flower","flow","flight"]
*          输出: "fl"
*          输入: ["dog","racecar","car"]
*          输出: ""
* @date 2021年10月18日 22:09
* 我们要想寻找最长公共前缀，那么首先这个前缀是公共的，我们可以从任意一个元素中找到它。
* 假定我们现在就从一个数组中寻找最长公共前缀，那么首先，我们可以将第一个元素设置为基准元素x0。
* 假如数组为["flow","flower","flight"]，flow就是我们的基准元素x0。
*/

function longestCommonPrefix(strArr){
    // 边界条件：如果数组strArr为零返回空
    if (strArr && strArr.length === 0) {
        return ""
    }

    let compareItem = strArr.shift()
    let i = 0
    while(i < strArr.length){
        const curr = strArr[i]
        if (curr.includes(compareItem)) {
            i++;
        } else {
            compareItem = compareItem.slice(0,compareItem.length - 1)
        }
    }

    return compareItem;
}