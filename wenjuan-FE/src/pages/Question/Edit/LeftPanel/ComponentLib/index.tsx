import React, { FC, useCallback } from 'react'
import { Typography } from 'antd'
import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux'
import { componentCofGroup, ComponentConfType } from '@/components/QuestionComponents'
import { addComponent } from '@/store/componentsReducer'
import styles from './index.module.scss'

const { Title } = Typography

// 生成组件
function genComponent(c: ComponentConfType) {
  const { Component, title, type, defaultProps } = c
  const dispatch = useDispatch()
  // 点击某一个组件 将它添加到画布中
  const handleClick = useCallback(() => {
    dispatch(
      addComponent({
        id: nanoid(5),
        title,
        type,
        props: defaultProps,
      })
    )
  }, [])
  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const Lib: FC = () => {
  return (
    <div className={styles.container}>
      {componentCofGroup.map((group, index) => {
        return (
          <div key={group.groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0px' }}>
              {group.groupName}
            </Title>
            <div>{group.components.map(c => genComponent(c))}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Lib
