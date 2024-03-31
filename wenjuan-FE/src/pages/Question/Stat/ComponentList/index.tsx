import React, { FC } from 'react'
import classNames from 'classnames'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import styles from './index.module.scss'
import { getComponentConfByType } from '@/components/QuestionComponents'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

const ComponentList: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  const { componentList } = useGetComponentInfo()
  return (
    <div className={styles.container}>
      {componentList
        .filter(c => !c.isHidden)
        .map(item => {
          const { id, props, type } = item
          const componentConf = getComponentConfByType(type)
          if (!componentConf) return
          const { Component } = componentConf

          // 拼接class name
          const wrapperDefaultClassName = styles['container-wrapper']
          const selectedClassName = styles.selected
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: id === selectedComponentId,
          })
          return (
            <div
              className={wrapperClassName}
              key={id}
              onClick={() => {
                setSelectedComponentId(id)
                setSelectedComponentType(type)
              }}
            >
              <div className={styles.component}>
                <Component {...props} />
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ComponentList
