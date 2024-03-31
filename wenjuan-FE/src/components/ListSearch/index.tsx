import React, { FC, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Input } from 'antd'
import { LIST_SEARCH_PARAM_KEY } from '../../constant'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [value, setValue] = useState('')
  const handleSearch = (value: string) => {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <Search
      allowClear
      style={{ width: '300px' }}
      placeholder="输入关键字"
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
    />
  )
}
export default ListSearch
