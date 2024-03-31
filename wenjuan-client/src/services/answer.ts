import { post } from './ajax'

export async function postAnswer(answerInfo: any) {

  const url = '/api/answer'
  const res = await post(url, answerInfo)

  return res
}