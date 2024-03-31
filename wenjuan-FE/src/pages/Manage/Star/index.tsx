import React, { FC } from 'react'
import { Typography, Empty, Spin } from 'antd'
import QuestionCard from '../../../components/QuestionCard/QuestionCard'
import useTitle from '../../../hooks/useTitle'
import ListPage from '../../../components/ListPage'
import ListSearch from '../../../components/ListSearch'
import useLoadQuestionListData from '../../../hooks/useLoadQuestionListData'
import styles from '../../../styles/common.module.scss'

const { Title } = Typography

const Star: FC = () => {
  useTitle('星标问卷')
  const { data = {}, loading } = useLoadQuestionListData({ isStar: 1 })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { records = {}, total = 0 } = data
  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </header>
      <main className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && records.length === 0 && <Empty description="暂无数据" />}
        {/* 问卷列表 */}
        {!loading &&
          records.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          records.map((q: any) => {
            const { id } = q
            return <QuestionCard key={id} {...q} />
          })}
      </main>
      {!loading && (
        <footer className={styles.footer}>
          <ListPage total={total} />
        </footer>
      )}
    </>
  )
}

export default Star
