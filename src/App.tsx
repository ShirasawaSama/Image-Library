import './index.css'
import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import ItemCard from './components/ItemCard'
import type { Item } from './types'
import { searchImages } from './service'
import InfiniteScroll from 'react-infinite-scroller'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 p-4 mt-4">
      <div className="max-w-7xl mx-auto text-center text-xs text-gray-400">
        © 2023 Shirasawa
      </div>
    </footer>
  )
}

const Cards: React.FC<{ items: Item[], search: string, loadMore: (page: number) => void }> = ({ items, search, loadMore }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <h2 className="text-xl font-bold mb-4">{search ? `Search results for ${search}:` : 'Recently Posted'}</h2>
        <InfiniteScroll className="grid grid-cols-3 gap-4" loadMore={loadMore} loader={<div className="loader" key={0}>Loading ...</div>}>
          {items.map(item => (
            <ItemCard key={item._id} item={item} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  )
}


function App() {
  const [items, setItems] = useState<Item[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  useEffect(() => {
    searchImages(0, search).then(data => setItems(old => [...old, ...data]))
  }, [])
  return (
    <>
      <Header doSearch={(text: string) => {
        setPage(1)
        setItems([])
        setSearch(text)
        searchImages(0, text).then(data => {
          setItems(data)
        })
      }} />
      <main className="max-w-7xl mx-auto p-4" style={{ minHeight: 'calc(100vh - 140px)' }}>
        <Cards items={items} search={search} loadMore={console.log} />

        {/* <div>
          <h2 className="text-xl font-bold mb-4">NEWEST</h2>
          <div className="space-y-4">
            <div className="bg-gray-800 p-2 rounded">
              <img src="https://placehold.co/300x300" alt="Placeholder image for a new post"
                className="w-full h-24 object-cover rounded" />
              <div className="mt-2">
                <h3 className="text-sm font-semibold">Never be bored again</h3>
                <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                  <span>Imgur</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-2 rounded">
              <img src="https://placehold.co/300x300" alt="Placeholder image for a new post"
                className="w-full h-24 object-cover rounded" />
              <div className="mt-2">
                <h3 className="text-sm font-semibold">Echoes of history in today's GOP: In book burning of the past</h3>
                <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                  <span>The Kansas City Star</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </main>

      <Footer />
    </>
  )
}

export default App;
