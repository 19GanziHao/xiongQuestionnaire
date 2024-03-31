import React, { useRef, useMemo } from 'react'
import type { InputRef } from 'antd'
import QRCode from 'qrcode.react'
import { useNavigate, useParams } from 'react-router-dom'
import { Space, Button, Typography, Input, Tooltip, message, Popover } from 'antd'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import styles from './index.module.scss'

const { Title } = Typography

const StatHeader: React.FC = () => {
  const nav = useNavigate()
  const { title } = useGetPageInfo()
  const { id } = useParams()
  // 拷贝url
  const urlInputRef = useRef<InputRef>(null)
  function copy() {
    const ele = urlInputRef.current
    if (!ele) return
    ele.select()
    document.execCommand('copy') // 拷贝选中的内容
    message.success('拷贝成功😊')
  }

  // 生成链接和二维码
  // 使用useMemo 1，依赖项是否经常变化 2，缓存的元素是否创建成本较高
  const LinkAndQRCodeElem = useMemo(() => {
    const url = `http://192.168.110.106:3000/question/${id}`

    // 定义二维码组件
    const QRCodeElem = (
      <div>
        <QRCode value={url} size={150} />
      </div>
    )

    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }, [id])
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div>{LinkAndQRCodeElem}</div>
        <div>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
