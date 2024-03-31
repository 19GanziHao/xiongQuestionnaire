import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Star from '../pages/Manage/Star'
import List from '../pages/Manage/List'
import NotFound from '../pages/NotFound'
import Register from '../pages/Register'
import Trash from '../pages/Manage/Trash'
import MainLayout from '../layout/MainLayout'
import ManageLayout from '../layout/ManageLayout'
import QuestionLayout from '../layout/QuestionLayout'
// import Edit from '../pages/Question/Edit'
// import Stat from '../pages/Question/Stat'

// 路由懒加载 拆分 bundle 优化首页体积
const Edit = lazy(() => import(/* webpackChunkName: "editPage" */ '../pages/Question/Edit'))
const Stat = lazy(() => import(/* webpackChunkName: "StatPage" */ '../pages/Question/Stat'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },

      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'stat/:id',
        element: <Stat />,
      },
      {
        path: 'edit/:id',
        element: <Edit />,
      },
    ],
  },
])
export default router
