/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Space, Divider, Tag, message, Popconfirm } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons'
import styles from './QuestionCard.module.scss'
import { useRequest } from 'ahooks'
import { duplicateQuestionService, updateQuestionService } from '../../services/question'
// 自定义类型
type PropsType = {
  id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createAt: string
  setRefresh: any
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { id, title, createAt, answerCount, isPublished, isStar, setRefresh } = props
  const [isStarState, setIsStarState] = useState(isStar)
  const nav = useNavigate()
  // 点击标星状态
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('已更改')
      },
    }
  )

  // 复制
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const data = await duplicateQuestionService(id)
      return data
    },
    {
      manual: true,
      onSuccess(res) {
        message.success('复制成功!')
        nav(`/question/edit/${res.id}`)
      },
    }
  )
  // 删除
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => {
      const data = updateQuestionService(id, { isDeleted: true })
      return data
    },
    {
      manual: true,
      onSuccess() {
        message.success('删除成功!')
        // 重新加载
        setRefresh(id)
      },
    }
  )

  // 取消删除
  const cancel = (word: string) => {
    message.info(`取消${word}`)
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${id}` : `/question/edit/${id}`}>
            <Space>
              {!!isStarState && <StarOutlined style={{ color: 'green' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷: {answerCount}</span>
            <span>{createAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => nav(`/question/edit/${id}`)}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              icon={<LineChartOutlined />}
              size="small"
              onClick={() => nav(`/question/stat/${id}`)}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              icon={<StarOutlined />}
              size="small"
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>

            <Popconfirm
              title="复制问卷"
              description="您确定要复制吗?"
              onConfirm={duplicate}
              onCancel={() => cancel('复制')}
              okText="是"
              cancelText="否"
            >
              <Button type="text" icon={<CopyOutlined />} size="small" disabled={duplicateLoading}>
                复制
              </Button>
            </Popconfirm>
            <Popconfirm
              title="删除问卷"
              description="您确定要删除吗?"
              onConfirm={deleteQuestion}
              onCancel={() => cancel('删除')}
              okText="是"
              cancelText="否"
            >
              <Button type="text" icon={<DeleteOutlined />} size="small" disabled={deleteLoading}>
                删除
              </Button>
            </Popconfirm>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
