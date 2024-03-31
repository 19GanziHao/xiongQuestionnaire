import React, { FC, CSSProperties } from "react";

type PropsType = {
  text: string;
  isCenter?: boolean;
};

const QuestionParagraph: FC<PropsType> = (props: PropsType) => {
  const { text, isCenter } = props;
  const style: CSSProperties = {};
  if (isCenter) style.textAlign = "center";

  // 换行
  const textList = text.split("\n");

  return (
    <p style={style}>
      {textList.map((item, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {item}
        </span>
      ))}
    </p>
  );
};

export default QuestionParagraph;
