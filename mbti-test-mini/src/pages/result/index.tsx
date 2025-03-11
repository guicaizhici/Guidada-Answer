import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from "@tarojs/taro";
import headBg from '../../assets/headBg.png'
import './index.scss'
import GlobalFooter from "../../conponents/GlobalFooter";
import questionResults from "../../data/question_results.json";
import questions from "../../data/questions.json";

import {getBestQuestionResult} from "../../utils/bizUtils";

/**
 * 测试结果页面
 */
export default () => {

  const answerList = Taro.getStorageSync("answerList");
  if (!answerList || answerList.length < 1) {
    Taro.showToast({
      title: '答案为空',
      icon: 'error',
      duration: 3000
    })
  }

  const result = getBestQuestionResult(answerList, questions, questionResults);



  return (
    <View className="resultPage">
      <View className="at-article__h1 title">{result.resultName}</View>
      <View className="at-article__h2 subTitle">
        {result.resultDesc}
      </View>
      <AtButton
        type="primary"
        size="normal"
        className="enterBtn"
        circle
        onClick={() => {
          Taro.reLaunch({
            url: "/pages/index/index",
          });
        }}
      >
        返回主页
      </AtButton>
      <Image src={headBg} style={{ width: "100%" }} mode="aspectFill" />
      <GlobalFooter />
    </View>
  );
};


