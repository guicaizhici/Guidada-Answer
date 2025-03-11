/*
* 获取最佳题目评分结果
* @param answerList
* @param questions@param
* question_results
* */
export function getBestQuestionResult(answerList, questions, question_results) {
// 初始化一个对象，用于存储每个选项的计数
  const optionCount = {};

// 遍历题目列表
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const answer = answerList[i]; // 获取与当前题目对应的答案

// 遍历题目中的选项
    for (const option of question.options) {
// 如果答案和选项的key匹配
      if (option.key === answer) {
// 获取选项的result属性
        const result = option.result;

// 如果result属性不在optionCount中，初始化为0
        if (!optionCount[result]) {
          optionCount[result] = 0;
        }

// 在optionCount中增加计数
        optionCount[result]++;
      }
    }
  }

// 初始化最高分数和最高分数对应的评分结果
  let maxScore = -1; // 使用 -1 以确保任何得分都会大于它
  let maxScoreResult = null; // 初始为 null

// 遍历评分结果列表
  for (const result of question_results) {
// 计算当前评分结果的分数
    const score = result.resultProp.reduce((count, prop) => {
      return count + (optionCount[prop] || 0);
    }, 0);

// 如果分数高于当前最高分数，或者在相同分数下根据自定义条件选择（例如第一个结果）
    if (score > maxScore) {
      maxScore = score;
      maxScoreResult = result;
    } else if (score === maxScore && maxScoreResult === null) {
// 处理平局情况，选择第一个
      maxScoreResult = result;
    }
  }

// 返回最高分数和最高分数对应的评分结果
  return maxScoreResult;

}
