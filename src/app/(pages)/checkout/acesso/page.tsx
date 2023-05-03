'use client'

import { Login } from '@/components/cart/Login'
import { api } from '@/utils/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, useRef, useState } from 'react'

export default function Access() {
  /// Tenho que verificar se o usuário está logado
  /// #### Posso fazer isso vendo se tem um token, ou se ele já expirou+

  const [email, setEmail] = useState('')

  const emailOrCpf = useRef('')
  const accessToken = useRef('')
  const validEmail = useRef(false)

  async function getEmail(email: string) {
    const { data } = await api.get(
      `/check-if-customer-exists-by-email?email=${email}`,
    )
    return data
  }

  function inputHandle(event: ChangeEvent<HTMLInputElement>) {
    emailOrCpf.current = event.target.value
  }

  async function buttonHandle() {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

    if (regexEmail.test(emailOrCpf.current)) {
      validEmail.current = true
      setEmail(emailOrCpf.current)
    } else if (regexCpf.test(emailOrCpf.current)) {
      console.log('foi digitado um CPF')
    }
  }

  const { data, isLoading } = useQuery(
    ['email', email],
    async () => {
      const response = await getEmail(email)
      return response[0]
    },
    {
      enabled: validEmail.current,
    },
  )

  return (
    <>
      <h1>Identificação</h1>
      {accessToken.current === '' && emailOrCpf.current === '' ? (
        <>
          <label>Email ou CPF</label>
          <input onChange={inputHandle} type="text" />
          <button onClick={buttonHandle}>Continuar</button>
        </>
      ) : data?.email ? (
        <>
          <Login loginEmail={emailOrCpf.current} />
        </>
      ) : !data?.email && !isLoading ? (
        <>
          <h1>Cadastro</h1>
        </>
      ) : (
        <>
          <h1>Login com token</h1>
        </>
      )}
    </>
  )
}
