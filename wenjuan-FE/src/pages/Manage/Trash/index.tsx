import React, { FC, useState } from 'react'
import { Typography, Empty, Table, Tag, Button, Space, Modal, message, Spin } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import ListSearch from '../../../components/ListSearch'
import styles from '../../../styles/common.module.scss'
import useLoadQuestionListData from '../../../hooks/useLoadQuestionListData'
import useTitle from '../../../hooks/useTitle'
import ListPage from '../../../components/ListPage'
import { useRequest } from 'ahooks'
import { deleteQUestionService, updateQuestionInfoService } from '../../../services/question'

interface dataType {
  id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  useTitle('星标问卷')
  // 获取问卷列表
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: 1 })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { records = {}, total = 0 } = data
  // 选中的id
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  // 表格每列的标题
  const tableColumns: ColumnsType<dataType> = [
    {
      title: '标题',
      dataIndex: 'title',
      //key: 'title' 循环的key 他会默认取dataIndex的值
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '是否标星',
      dataIndex: 'isStar',
      render: (isStar: boolean) => {
        return isStar ? <Tag color="processing">已标星</Tag> : <Tag>未标星</Tag>
      },
      //key: 'title' 循环的key 他会默认取dataIndex的值
    },
    {
      title: '答卷数量',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
    },
  ]

  // 恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionInfoService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success('恢复成功!')
        refresh()
        setSelectedIds([])
      },
    }
  )
  // 彻底删除
  const { run: deleteQUestion } = useRequest(
    async () => {
      await deleteQUestionService(selectedIds)
    },
    {
      manual: true,
      onSuccess() {
        message.success('删除成功!')
        refresh() // 手动刷新
        setSelectedIds([])
      },
    }
  )
  // 点击删除时显示
  const showPromiseConfirm = () => {
    confirm({
      title: '你要删除当前数据吗?',
      icon: <ExclamationCircleFilled />,
      content: '删除以后不可找回噢！',
      onOk: deleteQUestion,
      onCancel() {
        message.info({
          content: '取消删除',
        })
      },
    })
  }
  // 表格内容
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={showPromiseConfirm}>
            删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={records}
        columns={tableColumns}
        pagination={false}
        rowKey={(p: dataType) => p.id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            // 参数1： 选中的key数组 参数2： 选中的数据项
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )
  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
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
        {!loading && records.length > 0 && TableElem}
      </main>
      {!loading && (
        <footer className={styles.footer}>
          <ListPage total={total} />
        </footer>
      )}
    </>
  )
}

export default Trash
