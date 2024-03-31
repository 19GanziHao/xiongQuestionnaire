/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getComponentStatService } from '@/services/stat'
import { getComponentConfByType } from '@/components/QuestionComponents'
const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const StatCharts: FC<PropsType> = props => {
  const { selectedComponentId, selectedComponentType } = props
  const { id = '' } = useParams()
  const [stat, setStat] = useState([])
  const { run } = useRequest(
    async (questionId, componentId) => await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat)
      },
    }
  )
  // 监听选中的组件id 可以及时切换图表
  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId)
  }, [id, selectedComponentId])

  // 生成统计图表
  function genStatElem() {
    if (!selectedComponentId) return <div>未选中组件</div>

    const { StatComponent } = getComponentConfByType(selectedComponentType) || {}

    if (!StatComponent) return <div>该组件无统计图表</div>

    return <StatComponent stat={stat} />
  }

  return (
    <>
      <Title level={3}>图表统计</Title>
      <div>{genStatElem()}</div>
    </>
  )
}

export default StatCharts
