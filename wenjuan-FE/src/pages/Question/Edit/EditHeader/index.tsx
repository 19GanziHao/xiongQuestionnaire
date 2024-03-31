import React, { FC, useState, ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import { Button, Space, Typography, Input, message } from 'antd'
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import EditTool from './EditToolbar'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import { changeTitle } from '@/store/PageInfoReducer'
import { updateQuestionInfoService } from '@/services/question'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import styles from './index.module.scss'

const { Title } = Typography

/**
 * 显示和修改标题
 */
const TitleElem: FC = () => {
  const dispatch = useDispatch()
  const { title = '' } = useGetPageInfo()
  const [editState, setEditState] = useState(false)

  function ChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value.trim()
    if (!newValue) return
    dispatch(changeTitle(newValue))
  }

  if (editState) {
    return (
      <Input
        value={title}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        onChange={ChangeTitle}
      />
    )
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button type="text" icon={<EditOutlined />} onClick={() => setEditState(true)} />
    </Space>
  )
}

// 保存按钮
const SaveBtn: FC = () => {
  const { id = '' } = useParams()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { loading, run: save } = useRequest(
    async () => {
      await updateQuestionInfoService(id, { ...pageInfo, componentList })
    },
    {
      manual: true,
    }
  )
  // 点击保存按钮
  function handleSave() {
    save()
    message.success('保存成功😍')
  }
  // 监听快捷键后保存
  useKeyPress(['ctrl.s', 'meta.s'], (e: KeyboardEvent) => {
    e.preventDefault()
    if (!loading) {
      save()
      message.success('保存成功😍')
    }
  })
  // 监听改变后再自动保存
  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    {
      wait: 600000,
    }
  )
  return (
    <Button onClick={handleSave} disabled={loading} icon={loading && <LoadingOutlined />}>
      保存
    </Button>
  )
}

// 发布按钮
const PublishBtn: FC = () => {
  const nav = useNavigate()
  const { id = '' } = useParams()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { loading, run: pub } = useRequest(
    async () => {
      await updateQuestionInfoService(id, {
        ...pageInfo,
        componentList,
        isPublished: 1, // 问卷的发布属性为true
      })
    },
    {
      manual: true,
      onSuccess() {
        nav('/question/stat/' + id) //跳转统计页
        message.success('发布成功😍')
      },
    }
  )
  return (
    <Button type="primary" disabled={loading} onClick={pub}>
      发布
    </Button>
  )
}

const EditHeader: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditTool />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveBtn />
            <PublishBtn />
          </Space>
        </div>
      </div>
    </div>
  )
}
export default EditHeader
