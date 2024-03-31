import React, { FC, useEffect } from 'react'
import { Outlet, useParams, useNavigate } from 'react-router-dom'
import useNavPage from '../../hooks/useNavPage'

const QuestionLayout: FC = () => {
  useNavPage()
  const nav = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (Object.keys(params).length === 0) {
      nav('/manage/list')
    }
  }, [params])
  console.log(params)
  return (
    <div style={{ height: '100vh' }}>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default QuestionLayout
