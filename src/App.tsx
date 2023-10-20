import { FormEvent, useState } from 'react'
import './App.css'

type Id = `${string}-${string}-${string}-${string}-${string}`

interface Item {
  id: Id,
  timestamp: Date,
  text: string
}

const INITIAL_ITEMS: Item[] = [
  {
    id: window.crypto.randomUUID(),
    timestamp: new Date(),
    text: 'Videojuegos'
  },
  {
    id: crypto.randomUUID(),
    timestamp: new Date(),
    text: 'Libros'
  }
]

function App () {
  const [todos, setTodos] = useState<Item[]>(INITIAL_ITEMS)
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

    const newItem: Item = {
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

  return (
   <main>
     <h1>Mi prueba técnica</h1>
     <aside className='todos'>
      <h2>Añadir items</h2>
      <form className="todos__form" onSubmit={handleSubmit}>
        <input type="text" name="item" />
        <button>Añadir Item</button>
      </form>
     </aside>
     <article className='todos-list'>
      <h2>Items</h2>
      {
        Boolean(todos.length) && (
          <ul>
            {
              todos.map(({ id, text }) => (
                <li key={id}>
                  <span role="button" onClick={createHandleRemoveItem(id)}>{text}</span>
                </li>
              ))
            }
          </ul>
        )
      }
     </article>
   </main>
  )
}

export default App
