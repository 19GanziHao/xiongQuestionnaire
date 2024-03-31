import axios, { ResultDataType } from '../ajax'

/*
 * 获取问卷统计列表
 * @param questionId 问卷id
 * @param opt 分页
 * @returns
 */
export async function getQuestionStatListService(
  questionId: string,
  opt: { page: number; pageSize: number }
): Promise<ResultDataType> {
  const url = `/api/stat/${questionId}`
  const data = (await axios.get(url, { params: opt })) as ResultDataType
  return data
}

/**
 * 获取单个组件的统计数据
 * @param questionId
 * @param componentId
 * @returns
 */
export async function getComponentStatService(
  questionId: string,
  componentId: string
): Promise<ResultDataType> {
  const url = `/api/stat/${questionId}/${componentId}`
  const data = (await axios.get(url)) as ResultDataType
  return data
}
