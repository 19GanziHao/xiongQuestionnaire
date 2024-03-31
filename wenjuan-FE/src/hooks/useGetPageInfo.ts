import { useSelector } from 'react-redux'
import type { StateType } from '../store'
import type { PageInfoStateType } from '../store/PageInfoReducer'

/**
 * 获取单个问卷信息
 * @returns PageInfoStateType
 */
const useGetPageInfo = () => {
  const pageInfo = useSelector<StateType>(state => state.pageInfo) as PageInfoStateType

  const { title = '', desc = '', js = '', css = '', isPublished = 1 } = pageInfo

  return {
    title,
    desc,
    js,
    css,
    isPublished,
  }
}

export default useGetPageInfo
