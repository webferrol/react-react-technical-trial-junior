import React from 'react'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../src/App'

describe('<App />', () => {
  // test('Should work', () => {
  //   // expect(1).toBe(1)
  //   render(<App />)
  //   // screen.debug()
  //   expect(
  //     screen.getByText('Mi prueba técnica')
  //   ).toBeDefined()
  // })

  test('Should add a new item', async () => {
    const user = userEvent.setup()

    render(<App />)

    // element input: Implicit ARIA Role textbox
    const input = screen.getByRole('textbox')
    expect(input).toBeDefined()

    // Buscar Formulario
    const form = screen.getByRole('form') // para que esto funciones el formulario tiene que tener el atributo aria-label
    expect(form).toBeDefined()

    // Buscar botón del formulario
    const button = form.querySelector('button')
    expect(button).toBeDefined()

    // Usuario escribe en el input
    const randomText = crypto.randomUUID()
    await user.type(input, randomText)
    await user.click(button!) // Si no quieres la exclamación puedes utilizar un if

    // Asegurar que el elemento de la lista se ha recuperado
    const list = screen.getByRole('list')
    expect(list).toBeDefined()

    expect(list.childNodes.length).toBe(1)

    // Eliminar un elemento
    // Buscar el span que puede ser pulsado
    const span = list.querySelector('span')
    expect(span).toBeDefined()
    await user.click(span!)

    const element = screen.queryByText(randomText)
    expect(element).toBeNull()
  })
})
