import React, { FC, useState, useEffect } from "react";
import styles from "./index.module.scss";
type PropsType = {
  fe_id: string;
  props: {
    title: string;
    isVertical: boolean;
    list: Array<{
      label: string;
      value: string;
      checked: boolean;
    }>;
  };
};

const QuestionCheckbox: FC<PropsType> = ({ fe_id, props }) => {
  const { title, isVertical, list = [] } = props;
  const [checkedValue, setCheckedValue] = useState<string[]>([]);

  // 处理初始默认选中
  useEffect(() => {
    list.map((item) => {
      const { value, checked } = item;

      if (checked) {
        // 默认已经被选中
        setCheckedValue((checkedValue) => checkedValue.concat(value));
      }
      return () => setCheckedValue([])
    });
  }, [list]);

  // 选中时处理
  function handlerToggleChecked(val: string) {
    // 已经选中了 此时应该取消选中
    if (checkedValue.includes(val)) {
      setCheckedValue((checkedValue) =>
        checkedValue.filter((item) => item !== val)
      );
    } else {
      // 加入
      setCheckedValue(checkedValue.concat(val));
    }
  }

  return (
    <>
      <p>{title}</p>
      <input type="hidden" name={fe_id} value={checkedValue.toString()} />
      <ul className={styles.list}>
        {list.map((item) => {
          const { label, value } = item;
          let liClassName = "";
          if (isVertical) liClassName = styles.verticalItem;
          else liClassName = styles.horizontalItem;

          return (
            <li key={value} className={liClassName}>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handlerToggleChecked(value)}
                  checked={checkedValue.includes(value)}
                />
                {label}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default QuestionCheckbox;
