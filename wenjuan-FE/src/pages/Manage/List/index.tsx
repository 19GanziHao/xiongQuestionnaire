/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState, useEffect, useRef } from 'react'
import { Typography, Spin, Empty } from 'antd'
import QuestionCard from '../../../components/QuestionCard/QuestionCard'
import useTitle from '../../../hooks/useTitle'
import styles from '../../../styles/common.module.scss'
import ListSearch from '../../../components/ListSearch'
import { useSearchParams } from 'react-router-dom'
import { useDebounceFn, useRequest } from 'ahooks'
import { getQuestionListService } from '../../../services/question'
import { LIST_SEARCH_PARAM_KEY, PAGE_CONSTANT } from '../../../constant'

const { Title } = Typography

const List: FC = () => {
  useTitle('我的问卷')
  const [started, setStarted] = useState(false) // 是否开始
  const [list, setList] = useState([]) // 全部的列表数据，上划加载更多 累计
  const [page, setPage] = useState(1) // List内部的数据 不在url参数中体现
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length
  const [refresh, setRefresh] = useState(1)
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  // keyword(带着关键字去查询)变化时 重新加载
  useEffect(() => {
    setPage(1)
    setStarted(false)
    setTotal(0)
    setList([])
  }, [keyword, refresh])
  // 真正加载 带着页码 页数 关键字去加载数据
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: PAGE_CONSTANT.PAGE_SIZE_NUM as number,
        keyword,
        isDeleted: 0,
      })
      return data
    },
    {
      manual: true, // 手动执行
      // 成功后加页码 加列表数据
      onSuccess(result) {
        const { records = {}, total = 0 } = result
        setList(list.concat(records)) // 累计全部数据
        setPage(page + 1)
        setTotal(total)
      },
    }
  )

  // 触发加载(添加了防抖)
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current // 拿到需要触发的那个元素
      if (elem === null) return
      const domRect = elem.getBoundingClientRect()
      const { bottom } = domRect
      // 当“下拉更多”显示出来时就触发加载
      if (bottom < document.body.clientHeight) {
        load() // 加载数据

        setStarted(true)
      }
    },
    {
      wait: 700,
    }
  )
  // 1. 当页面加载或url(keyword)变化时触发加载
  useEffect(() => {
    if (!started) {
      tryLoadMore() // 只有页面加载一开始的时候执行一次
    } else {
      //当页面滚动时
      if (haveMoreData) {
        // 当总数大于全部数据时可以加载 否则就是数据已经全部加载完
        window.addEventListener('scroll', tryLoadMore)
      }
      return () => {
        window.removeEventListener('scroll', tryLoadMore)
      }
    }
  }, [searchParams, haveMoreData])

  // 2. 当页面滚动时 要尝试触发
  /* useEffect(() => {
    if (haveMoreData) {
      // 当总数大于全部数据时可以加载 否则就是数据已经全部加载完
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData]) */

  //加载更多 抽离出来了
  const loadMoreContentElem = () => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>加载下一页</span>
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </header>
      <main className={styles.content}>
        {/* 问卷列表 */}
        {list.length > 0 &&
          list.map((q: any) => {
            const { id } = q
            return <QuestionCard key={id} {...q} setRefresh={setRefresh} />
          })}
      </main>

      <footer className={styles.footer}>
        <div ref={containerRef}>{loadMoreContentElem()}</div>
      </footer>
    </>
  )
}

export default List
