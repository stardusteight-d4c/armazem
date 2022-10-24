import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Hero,
  Navbar,
  PopularReadings,
  PostInput,
  RatedMangas,
  RatedPosts,
  Sidebar,
} from '../components'
import { authorization } from '../services/api-routes'

interface Props {}

export const Feed = (props: Props) => {
  const navigate = useNavigate()
  const [authSession, setAuthSession] = useState(null)
  const [newPost, setNewPost] = useState(false)

  useEffect(() => {
    const session = sessionStorage.getItem('session')
    if (session) {
      ;(async () => {
        const parsed = JSON.parse(session) //get raw token: "token" -> token
        const { data } = await axios.post(authorization, null, {
          headers: {
            Authorization: parsed,
          },
        })
        if (data.status === false) {
          navigate('/login')
        }
        setAuthSession(data.session)
      })()
    } else {
      navigate('/login')
    }
  }, [])

  console.log(authSession)

  // Hospedar imagens no IPFS

  // Verificar se o usuário existe no banco de dados através da sessão, pois se alterarmos o username,
  // O feed vai carregar do mesmo jeito, ou pior, se colarmos em localstorage session com um objeto vazio
  // tbm será possível acessar a aplicação, pois isso devemos verificar pelo id do usuário no banco de dados

  // Não pegar os dados pelo local storage, apenas por banco de dados, em localstorage adicione o id e email do usuário,
  // Quando o usuário entrar na aplicação sempre  gerar um token de sessão, utilizar os JSON WEB TOKENS

  return (
    <>
      {newPost && <PostInput />}
      {authSession ? (
        <div className={style.gridContainer}>
          <Sidebar />
          <div className={style.mainContent}>
            <Navbar />
            <main className="p-8">
              <Hero />
              <RatedPosts />
              <PopularReadings />
              <RatedMangas />
            </main>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

const style = {
  gridContainer: `grid grid-cols-5 overflow-hidden max-w-screen-xl drop-shadow-sm dark:drop-shadow-2xl border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2 col-span-4`,
}
