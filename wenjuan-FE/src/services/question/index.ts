/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { ResultDataType } from '../ajax'

type searchOpt = {
  keyword: string
  isStar: number // 0 未收藏 1 收藏
  isDeleted: number // 0 未删除 1 删除
  page: number
  pageSize: number
}

type questionType = {
  isPublished?: boolean
  isDeleted?: boolean
  isStar?: boolean
}

/**
 * 获取单个问卷信息
 * @param id 问卷id
 * @returns
 */
export async function getQuestionService(id: string): Promise<ResultDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.get(url)) as ResultDataType
  return data
}

/**
 * 创建问卷
 */
export async function createQuestionService(): Promise<ResultDataType> {
  const url = '/api/question'
  const data = (await axios.post(url)) as ResultDataType
  return data
}

/**
 * 获取问卷列表数据
 * @param opt
 * @returns
 */
export async function getQuestionListService(
  opt: Partial<searchOpt> = {}
): Promise<ResultDataType> {
  const url = '/api/question'

  const data = (await axios.get(url, {
    params: {
      keyword: opt.keyword || null,
      isStar: opt.isStar ?? null,
      isDeleted: opt.isDeleted ?? null,
      page: opt.page,
      pageSize: opt.pageSize,
    },
  })) as ResultDataType
  return data
}

/**
 * 更新单个问卷info
 * @param id
 * @param opt
 * @returns
 */
export async function updateQuestionInfoService(
  id: string,
  opt: { [key: string]: any }
): Promise<ResultDataType> {
  const url = `/api/question/${id}`
  const arr: { [key: string]: any }[] = []
  console.log(opt)
  if (opt.componentList) {
    opt.componentList.map((component: any) => {
      const obj: { [key: string]: any } = {}
      for (const key of Object.keys(component)) {
        if (key !== 'id') {
          obj[key] = component[key]
        }
      }
      arr.push(obj)
    })
    opt.componentList = arr
  }

  const data = (await axios.put(url, opt)) as ResultDataType
  return data
}
/**
 * 更新问卷信息
 */
export async function updateQuestionService(
  id: string,
  opt: questionType = {}
): Promise<ResultDataType> {
  console.log(opt)
  const url = `/api/question/${id}`
  const data = (await axios.patch(url, {
    isPublished: opt.isPublished ?? null,
    isDeleted: opt.isDeleted ?? null,
    isStar: opt.isStar ?? null,
  })) as ResultDataType
  return data
}
/**
 * 复制问卷
 */
export async function duplicateQuestionService(id: string): Promise<ResultDataType> {
  const url = `/api/question/duplicate/${id}`
  const data = (await axios.post(url)) as ResultDataType
  return data
}
/**
 * 彻底批量删除问卷
 * @param ids
 * @returns
 */
export async function deleteQUestionService(ids: string[]): Promise<ResultDataType> {
  const url = `/api/question`
  const data = (await axios.delete(url, { data: ids })) as ResultDataType
  return data
}
