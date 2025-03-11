import { View } from '@tarojs/components'
import './index.scss'
// eslint-disable-next-line import/first
import {AtButton, AtRadio} from "taro-ui";
// eslint-disable-next-line import/first
import {useEffect, useState} from "react";
import questions from "../../data/questions.json";
import GlobalFooter from "../../conponents/GlobalFooter";
import Taro from "@tarojs/taro";

/**
 * 主页
 */
export default () => {

  //当前题目序号
  const [current, setCurrent] = useState<number>(1);

  //当前题目内容
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const questionOptions = currentQuestion.options.map((option) => {
    return { label: `${option.key}, ${option.value}`, value: option.key };
  })

  // 当前回答
  const [currentAnswer, setCurrentAnswer] = useState<string>();
  // 回答列表
  const [answerList] = useState<string[]>([]);

  // 序号变化时，切换当前题目和当前回答
  useEffect(() => {
    setCurrentQuestion(questions[current - 1]);
    setCurrentAnswer(answerList[current - 1]);
  }, [current]);

  return (
    <View className="doQuestionPage">
      <View className="at-article__h2 title">
        {current}, {currentQuestion.title}
      </View>

      <View className="options-wrapper">
        <AtRadio
          options={questionOptions}
          value={currentAnswer}
          onClick={(value) => {
            setCurrentAnswer(value);
            // 记录回答
            answerList[current - 1] = value;
          }}
        />
      </View>

      {
        current < questions.length && (
        <AtButton
          type="primary"
          size="normal"
          className="controlBtn"
          circle
          disabled={!currentAnswer}
          onClick={() => {
            setCurrent(current + 1);}
          }
        >
          下一题
        </AtButton>
        )}

      {
        current == questions.length && (
        <AtButton
          type="primary"
          size="normal"
          className="controlBtn"
          circle
          disabled={!currentAnswer}
          onClick={() => {
            Taro.setStorageSync('answerList', answerList);
            Taro.navigateTo({
              url: "/pages/result/index",
            });
          }}
        >
          查看结果
        </AtButton>
        )}

      {
        current > 1 && (
        <AtButton
          size="normal"
          className="controlBtn"
          circle
          onClick={() => {
            setCurrent(current - 1);}
          }
        >
          上一题
        </AtButton>
        )}
      <GlobalFooter />
    </View>
  );
};


