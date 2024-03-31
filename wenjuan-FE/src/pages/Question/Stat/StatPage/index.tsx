/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState } from 'react'
import { Typography, Spin, Table, Pagination } from 'antd'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getQuestionStatListService } from '@/services/stat'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}
type arrType = {
  [key: string]: any
}
const { Title } = Typography

const StatPage: FC<PropsType> = props => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  const { id = '' } = useParams()
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { componentList } = useGetComponentInfo()
  const { loading } = useRequest(
    async () => {
      const data = await getQuestionStatListService(id, { page, pageSize })
      return data
    },
    {
      refreshDeps: [page, pageSize],
      onSuccess(res) {
        const { total, records = [] } = res
        setTotal(total)
        setList(records)
      },
    }
  )
  // 表格的每列
  const columns = componentList.map(c => {
    const { id, title, props, type } = c
    const colTitle = props!.title || title

    return {
      // 此title还可以是jsx
      // title: colTitle,
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(id)
            setSelectedComponentType(type)
          }}
        >
          <span style={{ color: id === selectedComponentId ? '#1890ff' : 'inherit' }}>
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: id,
    }
  })
  // 转换后端的数据格式
  function transformData(originalData: any) {
    const transformedData: { identification: any }[] = []

    for (const item of originalData) {
      const userIdentification = item.identification

      // 如果用户标识符不存在，则创建一个新的对象
      if (!transformedData.some(user => user.identification === userIdentification)) {
        const userObject = {
          identification: userIdentification,
        }
        transformedData.push(userObject)
      }

      // 将答案添加到用户对象
      const userObject: arrType =
        transformedData.find(user => user.identification === userIdentification) || []
      userObject[item.id] = item.answerContent
    }

    return transformedData
  }

  const transformedData = transformData(list)

  // 因为table组件中dataSource需要一个key字段
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataSource = transformedData.map((i: any) => {
    return { ...i, key: i.identification }
  })

  const TableElem = (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={page => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          }}
        />
      </div>
    </>
  )

  return (
    <div>
      <Title level={3}>答卷数量: {!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && TableElem}
    </div>
  )
}

export default StatPage
