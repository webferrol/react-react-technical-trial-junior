import './App.css'
import { Item } from './components/Item'
import { useItems } from './hooks/useItems'
import useSEO from './hooks/useSEO'

export type Id = `${string}-${string}-${string}-${string}-${string}`

export interface TodoItem {
  id: Id,
  timestamp: Date,
  text: string
}

// const INITIAL_ITEMS: TodoItem[] = [
//   {
//     id: window.crypto.randomUUID(),
//     timestamp: new Date(),
//     text: 'Videojuegos'
//   },
//   {
//     id: crypto.randomUUID(),
//     timestamp: new Date(),
//     text: 'Libros'
//   }
// ]

function App () {
  const {
    createHandleRemoveItem,
    handleSubmit,
    todos
  } = useItems()
  useSEO(`${todos.length} Número de elementos`, 'Añadiendo elementos')
  return (
   <main>
     <h1>Mi prueba técnica</h1>
     <aside className='todos'>
      <h2>Añadir items</h2>
      <form className="todos__form" onSubmit={handleSubmit} aria-label="Añadir elementos a la lista">
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
               <Item handleRemove={createHandleRemoveItem(id)} key={id} text={text} />
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
