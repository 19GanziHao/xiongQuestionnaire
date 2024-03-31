import React, { FC } from 'react'
import styles from './index.module.scss'
type PropsType = {
  fe_id: string;
  props: {
    title: string;
    options: Array<{
      value: string;
      label: string;
    }>;
    defaultVale: string;
    isVertical: boolean;
  };
};

const QuestionRadio: FC<PropsType> = ({ fe_id, props}) => {
  const { title, options, defaultVale, isVertical } = props;

  return (
    <>
      <p>{title}</p>
      <ul className={styles.list}>
        {options.map((opt) => {
          const { value, label } = opt;

          let liClassName = "";
          if (isVertical) liClassName = styles.verticalItem;
          else liClassName = styles.horizontalItem;

          return (
            <li key={value} className={liClassName}>
              <label>
                <input
                  type="radio"
                  name={fe_id}
                  value={value}
                  defaultChecked={value === defaultVale}
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


export default QuestionRadio