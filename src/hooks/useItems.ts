import { FormEvent, useState } from 'react'
import { Id, TodoItem } from '../App'
export function useItems () {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { elements } = event.currentTarget

    // Estrategia 1
    // const inputItem = elements.namedItem('item') as HTMLInputElement // Opción 1
    // const inputItem = elements.namedItem('item')
    // console.log(inputItem.value)

    // Estrategia 2
    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement
    if (!isInput || isInput === null) return

    // Valdiaciones adicionales
    if (!input.value.length) return

    // Creamos el Item

    const newItem: TodoItem = {
      id: window.crypto.randomUUID(),
      timestamp: new Date(),
      text: input.value
    }

    setTodos([
      ...todos,
      newItem
    ])

    input.value = ''
  }

  // 👁️ Función que devuelve otra función
  const createHandleRemoveItem = (id: Id) => () => {
    setTodos(prevTodos => prevTodos.filter(item => item.id !== id))
  }

  return {
    createHandleRemoveItem,
    handleSubmit,
    todos
  }
}
