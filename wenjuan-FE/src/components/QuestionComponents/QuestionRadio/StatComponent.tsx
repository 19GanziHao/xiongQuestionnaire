import React, { FC } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import getRandomColor from '../../../utils/getRandomColor'
import { QuestionRadioStatPropsType } from './type'
import numFormatPer from '../../../utils/numFormatPer'
const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat }) => {
  const sum = stat.reduce((pre, cur) => {
    return pre + cur.count
  }, 0)

  return (
    <div style={{ width: '300px', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="count"
            data={stat}
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
            label={i => `${i.name}: ${numFormatPer(i.count / sum)}%`}
          >
            {stat.map((i, index) => {
              return <Cell key={index} fill={getRandomColor()} />
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatComponent
