import axios from 'axios'

const openaiKey = "sk-iJwf89mfv3HbSkoO80oUcgmnJJOWp933iP5e4VubRBurxceF"; // 替换为你的OpenAI API密钥

async function askOpenAI(question: string) {
  const response = await axios(
    "https://api.chatanywhere.com.cn/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      },
      data: {
        //@ts-ignore
        model: "gpt-3.5-turbo", // 根据实际情况选择合适的模型
        messages: [{ role: "user", content: `${question}` }],
        temperature: 0.5,
      },
    }
  );
  
  const data =  response.data;
  
  return data.choices[0].message.content;
}

export default askOpenAI;
