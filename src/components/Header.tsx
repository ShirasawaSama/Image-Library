import React, { useState } from 'react'
import { username } from '../service'
import { Link } from 'react-router-dom'
import ImageUpload from './ImageUpload'

const Header: React.FC<{ doSearch: (text: string) => void, refresh: () => void }> = ({ doSearch, refresh }) => {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-gray-800 p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <Link className="text-xl" to='/'>ImageLibrary</Link>
          {username && <button className="bg-green-500 text-white px-4 py-2 rounded text-sm font-medium" onClick={() => setOpen(true)}>New post</button>}
        </div>
        <div className="flex rounded-full bg-[#0d1829] px-2 w-full max-w-[35rem]">
          <button className="self-center flex p-1 cursor-pointer bg-[#0d1829]"></button>
          <input type="text" className="w-full bg-[#0d1829] flex bg-transparent pl-2 text-[#cccccc] outline-0"
            placeholder="Search everything..." autoComplete="off" spellCheck="false" value={search} onChange={e => setSearch(e.target.value)}/>
          <button type="submit" className="relative p-2 bg-[#0d1829] rounded-full" onClick={() => doSearch(search)}>
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          {username
            ? <>
              <button className="text-gray-400 hover:text-white" onClick={
                () => {
                  localStorage.removeItem('token')
                  location.reload()
                }
              }>Sign out</button>
              <Link className="bg-pink-500 text-white px-4 py-2 rounded text-sm font-medium" to={'/profile/' + username}>{username}'s profile</Link>
            </>
            : <>
              <Link className="text-gray-400 hover:text-white" to='/signin'>Sign in</Link>
              <Link className="bg-pink-500 text-white px-4 py-2 rounded text-sm font-medium" to='/signup'>Sign up</Link>
            </>
          }
        </div>
      </div>

      {username && <ImageUpload open={open} onClose={() => setOpen(false)} refresh={refresh} />}
    </header>
  )
}

export default Header
