function getRandomColor() {
  const letters = '0123456789ABCDEF' // 定义所有可能的字符集合
  let color = '#' // 初始化颜色变量为"#"开头

  for (let i = 0; i < 6; i++) {
    // 每次取两位字符作为颜色值
    const randomIndex = Math.floor(Math.random() * 16) // 获取随机索引
    color += letters[randomIndex] // 将对应的字符添加到color中
  }

  return color // 返回最终生成的颜色值
}

export default getRandomColor
