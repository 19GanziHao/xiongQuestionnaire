import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Spin } from 'antd'
import routerConfig from './router'
import 'antd/dist/reset.css'
import './App.css'

function App() {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Spin />
        </div>
      }
    >
      <RouterProvider router={routerConfig}></RouterProvider>
    </Suspense>
  )
}

export default App
