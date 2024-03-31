import React, { FC, useState } from 'react'
import { Spin, Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import useTitle from '@/hooks/useTitle'
import useLoadingQuestionData from '@/hooks/useLoadingQuestionData'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import StatHeader from './StatHeader'
import styles from './index.module.scss'
import ComponentList from './ComponentList'
import StatPage from './StatPage'
import StatCharts from './StatCharts'
const Stat: FC = () => {
  const { loading } = useLoadingQuestionData()
  const { isPublished, title } = useGetPageInfo()
  const nav = useNavigate()
  const [selectedComponentId, setSelectedComponentId] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedComponentType, setSelectedComponentType] = useState('')
  useTitle('问卷统计 - ' + title)

  const LoadingElem = (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin />
    </div>
  )

  const genContentElem = () => {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <Result
          status="warning"
          title="您访问的问卷未发布"
          extra={
            <Button type="primary" onClick={() => nav(-1)}>
              返回
            </Button>
          }
        ></Result>
      )
    }
    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>
          <StatPage
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.right}>
          <StatCharts
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <StatHeader />
      <main className={styles['content-wrapper']}>
        {loading && LoadingElem}
        {!loading && <div className={styles.content}>{genContentElem()}</div>}
      </main>
    </div>
  )
}

export default Stat
