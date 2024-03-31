import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component />)
  const h = screen.getByText('问题标题')
  expect(h).toBeInTheDocument() // 断言
})

test('传入参数', () => {
  render(<Component title="hello" desc="world" />)
  const h = screen.getByText('hello')
  expect(h).toBeInTheDocument()
  const p = screen.getByText('world')
  expect(p).toBeInTheDocument()
})
