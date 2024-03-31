import PageWrapper from "@/components/PageWrapper";
import { useEffect, useState, useRef } from "react";
import { parse } from "cookie";
import analysisRes from "../util/analysisRes";
function Success(props: any) {
  let [ans, setAns] = useState("");
  // 使用 useRef 创建一个标志，初始值为 true
  const isFirstRender = useRef(true);
  useEffect(() => {
    const { question } = props;
    async function fn() {
      let res = await analysisRes(question);
      setAns(res);
    }
    if (isFirstRender.current) {
      fn();
      isFirstRender.current = false;
      return;
    }
  }, [props]);
  return (
    <PageWrapper title="提交成功">
      {/* <h1>Success🎉</h1>
      <p>提交成功</p> */}
      <h1>推荐建议如下: </h1>
      <p>{ans ? ans : "请稍等..."}</p>
    </PageWrapper>
  );
}

export async function getServerSideProps(context: any) {
  const { req } = context;
  const question = parse(req.headers.cookie).question;
  return {
    props: {
      question,
    },
  };
}

export default Success;
