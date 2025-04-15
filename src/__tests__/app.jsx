import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../app.jsx'

test("Scénario 1: Cas passant - L'utilisateur remplit correctement le formulaire", async () => {
  render(<App />)

  // 1-2
  expect(
    screen.getByRole('heading', {name: /welcome home/i}),
  ).toBeInTheDocument()

  // 3-4
  const fillFormLink = screen.getByRole('link', {name: /fill out the form/i})
  expect(fillFormLink).toBeInTheDocument()
  userEvent.click(fillFormLink)

  // 5-6
  await waitFor(() => {
    expect(screen.getByRole('heading', {name: /page 1/i})).toBeInTheDocument()
  })

  // 7
  expect(screen.getByRole('link', {name: /go home/i})).toBeInTheDocument()

  // 8-9
  const foodInput = screen.getByLabelText(/favorite food/i)
  expect(foodInput).toBeInTheDocument()
  userEvent.type(foodInput, 'Les pâtes')

  // 10-11
  const nextLink = screen.getByRole('link', {name: /next/i})
  expect(nextLink).toBeInTheDocument()
  userEvent.click(nextLink)

  // 12-13
  await waitFor(() => {
    expect(screen.getByRole('heading', {name: /page 2/i})).toBeInTheDocument()
  })

  // 14
  expect(screen.getByRole('link', {name: /go back/i})).toBeInTheDocument()

  // 15-16
  const drinkInput = screen.getByLabelText(/favorite drink/i)
  expect(drinkInput).toBeInTheDocument()
  userEvent.type(drinkInput, 'Bière')

  // 17-18
  const reviewLink = screen.getByRole('link', {name: /review/i})
  expect(reviewLink).toBeInTheDocument()
  userEvent.click(reviewLink)

  // 19-20
  await waitFor(() => {
    expect(screen.getByRole('heading', {name: /confirm/i})).toBeInTheDocument()
  })

  // 21
  expect(screen.getByText(/please confirm your choices/i)).toBeInTheDocument()

  // 22
  expect(screen.getByLabelText(/favorite food/i)).toHaveTextContent('Les pâtes')

  // 23
  expect(screen.getByLabelText(/favorite drink/i)).toHaveTextContent('Bière')

  // 24
  expect(screen.getByRole('link', {name: /go back/i})).toBeInTheDocument()

  // 25-26
  const confirmButton = screen.getByRole('button', {name: /confirm/i})
  expect(confirmButton).toBeInTheDocument()
  userEvent.click(confirmButton)

  // 27-28
  await waitFor(() => {
    expect(
      screen.getByRole('heading', {name: /congrats\. you did it\./i}),
    ).toBeInTheDocument()
  })

  // 29-30
  const goHomeLink = screen.getByRole('link', {name: /go home/i})
  expect(goHomeLink).toBeInTheDocument()
  userEvent.click(goHomeLink)

  // 31-32
  await waitFor(() => {
    expect(
      screen.getByRole('heading', {name: /welcome home/i}),
    ).toBeInTheDocument()
  })
})
