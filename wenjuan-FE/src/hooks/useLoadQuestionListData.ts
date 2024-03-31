import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY, PAGE_CONSTANT } from '../constant'
import { getQuestionListService } from '../services/question'

type OptionType = {
  isStar: number // 0表示未收藏 1表示收藏
  isDeleted: number // 0 未删除 1 删除
}

const useLoadQuestionListData = (opt: Partial<OptionType> = {}) => {
  const { isStar, isDeleted = 0 } = opt
  const [searchParams] = useSearchParams()
  const { data, loading, error, refresh } = useRequest(
    async function () {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const page = parseInt(searchParams.get(PAGE_CONSTANT.PAGE_PARAM_KEY) || '') || 1
      const pageSize =
        parseInt(searchParams.get(PAGE_CONSTANT.PAGE_SIZE_PARAM_KEY) || '') ||
        PAGE_CONSTANT.PAGE_SIZE_NUM
      const data = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize })
      return data
    },
    {
      refreshDeps: [searchParams], // 刷新的依赖项
    }
  )
  return { data, loading, error, refresh }
}

export default useLoadQuestionListData
