import { useState } from 'react'
import { Id, TodoItem } from '../App'
export function useItems () {
  const [todos, setTodos] = useState<TodoItem[]>([])

  const removeItem = (id: Id) => {
    setTodos(prevTodos => prevTodos.filter(item => item.id !== id))
  }

  const addItem = (textValue: string) => {
    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        text: textValue
      }
    ])
  }

  return {
    addItem,
    removeItem,
    todos
  }
}
