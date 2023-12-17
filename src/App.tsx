import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import ItemCard from './components/ItemCard'
import SignIn from './pages/SignIn'
import { BrowserRouter, Route, Routes, redirect, useNavigate, useParams } from 'react-router-dom'
import type { Item } from './types'
import { searchImages } from './service'
import InfiniteScroll from 'react-infinite-scroller'

const Footer: React.FC = () => {
  return (
    <footer className='bg-gray-800 p-4 mt-4'>
      <div className='max-w-7xl mx-auto text-center text-xs text-gray-400'>
        © 2023 Shirasawa All rights reserved.<br />
        <a
          href='https://github.com/ShirasawaSama/Image-Library' target='_blank' rel='noreferrer'
          className='text-gray-600 hover:text-gray-400 hover:underline'
        >
          ImageLibrary is open source. View the code on GitHub. (AGPL-3.0)
        </a>
      </div>
    </footer>
  )
}

const Cards: React.FC<{ items: Item[], search: string, loadMore: (page: number) => void, username: string }> = ({ items, search, username, loadMore }) => {
  return (
    <div className='col-span-3'>
      <h2 className='text-xl font-bold mb-4'>{
        search ? `Search results for ${search}:` : username ? `Posts by ${username}:` : 'Recent posts'
      }</h2>
      <InfiniteScroll className='grid grid-cols-4 gap-4' loadMore={loadMore} loader={<div className='loader' key={0}>Loading ...</div>}>
        {items.map(item => (
          <ItemCard key={item._id} item={item} />
        ))}
      </InfiniteScroll>
    </div>
  )
}


function Main() {
  const [items, setItems] = useState<Item[]>([])
  const [search, setSearch] = useState('')
  const nav = useNavigate()
  const profileUsername = useParams().username || ''
  const pageRef = React.useRef(1)

  console.log(profileUsername)

  useEffect(() => {
    pageRef.current = 1
    searchImages(1, search, profileUsername).then(setItems)
  }, [profileUsername])

  return (
    <>
      <Header
        doSearch={(text: string) => {
          pageRef.current = 0
          setItems([])
          setSearch(text)
          searchImages(1, text, profileUsername).then(setItems)
        }}
        refresh={() => {
          pageRef.current = 0
          setItems([])
          setSearch('')
          nav('/')
          searchImages(1, '', '').then(setItems)
        }}
      />
      <main className='max-w-7xl mx-auto p-4' style={{ minHeight: 'calc(100vh - 140px)' }}>
        <Cards items={items} search={search} username={profileUsername} loadMore={() => {
          const page = pageRef.current + 1
          pageRef.current = page
          searchImages(page, search, profileUsername).then(data => setItems(old => [...old, ...data]))
        }} />
      </main>
      <Footer />
    </>
  )
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Main} />
        <Route path='/profile/:username' Component={Main} />
        <Route path='/signin' Component={SignIn} />
        <Route path='/signup' Component={SignIn} />
        <Route path='*' action={() => redirect('/')} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
