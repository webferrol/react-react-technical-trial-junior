import { describe, expect, test } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useItems } from '../../src/hooks/useItems'

describe('useItems hook', () => {
  test('Should add and remove items', () => {
    const { result } = renderHook(() => useItems())
    expect(result.current.todos.length).toBe(0)

    act(() => { // Se asegura que esto suceda e manera asíncrona por cculpa del render que es asíncrono
      result.current.addItem('Videoconsolas')
    })
    act(() => { // Se asegura que esto suceda e manera asíncrona por cculpa del render que es asíncrono
      result.current.addItem("CD's")
    })

    expect(result.current.todos.length).toBe(2)

    act(() => {
      result.current.removeItem(result.current.todos[0].id)
    })

    expect(result.current.todos.length).toBe(1)
  })
})
