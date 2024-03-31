import type { NextApiRequest, NextApiResponse } from "next";
import { postAnswer } from "@/services/answer";
import { serialize } from "cookie";
import { nanoid } from "nanoid";

// 生成问题
function getResultByTitle(res: any) {
  let question = `假如你是心理健康方面的专家，现在有几个问题，请你给出一些良好的建议。`;

  let content = "";
  for (let i = 0; i < res.length; i++) {
    const { title, answer = "" } = res[i];
    content += `第${i + 1}个问题. 题目是：${title}, 这个人的回答是${
      answer ? answer : "没有回答"
    }。`;
  }
  question += content + "请你根据以上问题，以“我认为你”来开头并从第一人称来描述对这个人的心理状况做出建议";
  return question;
}

/**
 * 整理格式
 * @param resBody
 * @returns
 */
function genAnswer(resBody: any) {
  const answerList: any[] = [];
  const identification = nanoid();
  Object.keys(resBody).forEach((key) => {
    if (key !== "questionId") {
      answerList.push({
        componentId: key,
        value: resBody[key],
        identification,
      });
    }
  });
  return {
    questionId: resBody.questionId[0] || "",
    answerList,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(200).json({ code: -1, msg: "method错误" });
  }
  const title = JSON.parse(req.body.questionId.pop());

  // 获取并格式化表单数据
  const answerInfo = genAnswer(req.body);
  const answerList = answerInfo.answerList;

  for (let i = 0; i < answerList.length; i++) {
    const item = answerList[i];
    title.forEach((j: any) => {
      if (j.componentId == item.componentId) {
        j.answer = item.value;
      }
    });
  }
  // 提交
  try {
    const resData = await postAnswer(answerInfo);
    // 提交成功
    if (resData.code === 1) {
      const question = getResultByTitle(title);
      // 设置Cookie
      res.setHeader(
        "Set-Cookie",
        serialize("question", JSON.stringify(question), { path: "/" })
      );

      res.redirect("/success");
    } else {
      res.redirect("/fail");
    }
  } catch (error) {
    res.redirect("/fail");
  }

  res.status(200).json({ code: 1, msg: "ok" });
}
