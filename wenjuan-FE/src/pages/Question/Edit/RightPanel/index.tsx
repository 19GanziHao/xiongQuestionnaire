import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { changeSelectedId } from '@/store/componentsReducer'

enum TABS_KEY {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TABS_KEY.PROP_KEY)
  const { selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()
  useEffect(() => {
    if (!selectedId) setActiveKey(TABS_KEY.SETTING_KEY)
    else setActiveKey(TABS_KEY.PROP_KEY)
  }, [selectedId])

  function handleClickTab() {
    dispatch(changeSelectedId(''))
    setActiveKey(TABS_KEY.SETTING_KEY)
  }

  const tabsItems = [
    {
      key: TABS_KEY.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: TABS_KEY.SETTING_KEY,
      label: (
        <span onClick={handleClickTab}>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ]

  return <Tabs items={tabsItems} activeKey={activeKey} />
}

export default RightPanel
