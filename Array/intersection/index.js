/**
* @desc 两个数组的交集
*       给定两个数组，编写一个函数来计算他们的交集
* @example 输入：nums1 = [1,2,2,1], nums2 = [2,2]
*          输出：[2, 2]
*
*          输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
*          输出：[4,9]
* @date 2021年10月16日 09:11:16
*/
/**
* @desc 利用映射简单实现
* @desc 输出结果中每个元素出现的次数，应与元素在两个数组中出现的次数一致。
*       不考虑输出结果的顺序
* @author 张和潮
* @date 2021年10月16日 09:28:55
*/
function intersection(nums1, nums2){
    const mapObj = {}
    const resultArray = []
    let k = 0;
    
    // 遍历nums1，初始化mapObj
    nums1.forEach(num => {
        if (mapObj[num]) {
            mapObj[num] += 1;
        }else{
            mapObj[num] = 1
        }
    })

    nums2.forEach(num => {
        if (mapObj[num] > 0) {
            mapObj[num] -=1;
            resultArray[k] = num;
            k++;
        }
    })

    return resultArray;
}

/**
* @desc 题目进阶
* @desc 假如两个数组都是有序的
* @author 张和潮
* @date 2021年10月16日 14:48:26
*/

