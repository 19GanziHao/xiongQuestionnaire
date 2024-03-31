/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { getQuestionService } from '../services/question'
import { resetComponents } from '../store/componentsReducer'
import { resetPageInfo } from '../store/PageInfoReducer'

function useLoadingQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()
  // ajax 加载数据
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷id!')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    }
  )
  // 根据获取的data 来设置redux store
  useEffect(() => {
    if (!data) return
    const { title = '', componentList = [], isPublished = false, desc, js, css } = data

    // 当进入问卷编辑器 默认选中第一个组件
    let selectedId = ''
    if (componentList.length > 0) selectedId = componentList[0].id
    // 把componentList存储到redux store中
    dispatch(resetComponents({ componentList, selectedId, copiedComponents: null }))
    // 把问卷信息存储到redux中
    dispatch(resetPageInfo({ title, desc, js, css, isPublished }))
  }, [data])

  // 判断id变化 执行ajax加载问卷数据
  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadingQuestionData
