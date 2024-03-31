/**
 * @description 问卷相关接口
 * @author Gzh
 */
import { get } from "./ajax";

/**
 * 通过id获取问卷信息
 * @param id 
 * @returns 
 */
export async function getQuestionInfo(id: string) {
  const url = `/api/question/${id}`;
  const data = await get(url);
  return data;
}
