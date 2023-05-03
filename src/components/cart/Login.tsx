'use client'

import { api } from '@/utils/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { setCookie } from 'nookies'
import { FormEvent, useRef, useState } from 'react'

interface Props {
  loginEmail?: string
  loginCpf?: string
}

async function signIn(email: string, password: string) {
  const { data } = await api.post(`/sign-in`, {
    email,
    password,
  })
  return data
}

function setAccessTokenToCookie(accessToken: string, maxAgeInSeconds: number) {
  setCookie(null, '@ecravoecanela:access_token', accessToken, {
    maxAge: maxAgeInSeconds, // expira em 30 dias
    path: '/',
    // sameSite: 'lax',
    // httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
  })
}

export function Login({ loginEmail, loginCpf }: Props) {
  const [email, setEmail] = useState('')
  const [canSignIn, setCanSignIn] = useState(false)
  const password = useRef('')
  const router = useRouter()

  if (email === '' && loginEmail !== undefined) {
    setEmail(loginEmail)
  }

  const { isLoading } = useQuery(
    ['signin', email],
    async () => {
      const response = await signIn(email, password.current)
      return response
    },
    {
      enabled: canSignIn,
      onSuccess(data) {
        if (data?.authenticated === true) {
          setAccessTokenToCookie(data.accessToken, data.expiresAt)
          router.push('/checkout/endereco')
        }
      },
    },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const emailValue = event?.target?.email?.value
    const passwordValue = event?.target?.password?.value
    password.current = passwordValue

    setEmail(emailValue)
    setCanSignIn(true)
  }

  return (
    <>
      <h1>Tela de Login</h1>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          defaultValue={email}
          // onChange={(event) => setEmail(event.target.value)}
          required
        />
        <label htmlFor="password">password:</label>
        <input
          type="password"
          id="password"
          // onChange={(event) => (password.current = event.target.value)}
          required
        />
        <button type="submit">
          {isLoading && canSignIn ? 'Loading' : 'Entrar'}
        </button>
      </form>
    </>
  )
}
