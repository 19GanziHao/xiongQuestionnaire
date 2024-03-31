import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'
import { PAGE_CONSTANT } from '../../constant'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'

type PropsType = {
  total: number
}

const ListPage: React.FC<PropsType> = (props: PropsType) => {
  const { total } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_CONSTANT.PAGE_SIZE_NUM)

  const [searchParams] = useSearchParams()

  useEffect(() => {
    // 页码
    const page = parseInt(searchParams.get(PAGE_CONSTANT.PAGE_PARAM_KEY) || '') || 1
    // 每页数量
    const pageSize =
      parseInt(searchParams.get(PAGE_CONSTANT.PAGE_SIZE_PARAM_KEY) || '') ||
      PAGE_CONSTANT.PAGE_SIZE_NUM
    setCurrent(page)
    setPageSize(pageSize)
  }, [searchParams])

  // 根据page 和 pageSize刷新页面
  const nav = useNavigate()
  const { pathname } = useLocation()
  function handlePageChange(page: number, pageSize: number) {
    searchParams.set(PAGE_CONSTANT.PAGE_PARAM_KEY, page.toString())
    searchParams.set(PAGE_CONSTANT.PAGE_SIZE_PARAM_KEY, pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString(),
    })
  }
  return (
    <Pagination
      current={current}
      pageSize={pageSize as number}
      total={total}
      onChange={handlePageChange}
    />
  )
}

export default ListPage
