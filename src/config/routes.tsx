import React from 'react'
import Render from '@/pages/Render'

export const routes =  [
  {
    key: 'render',
    path: '/render/:module/:page',
    label: '测试页面',
    element: <Render />
  }
]
