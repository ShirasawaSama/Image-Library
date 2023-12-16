import './index.css'
import React from 'react'

function App() {
  return (
    <>
      <header className="bg-gray-800 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl">ImageLibrary</h1>
            <button className="bg-green-500 text-white px-4 py-2 rounded text-sm font-medium">New post</button>
          </div>
          <div className="flex rounded-full bg-[#0d1829] px-2 w-full max-w-[35rem]">
            <button className="self-center flex p-1 cursor-pointer bg-[#0d1829]"></button>
            <input type="text" className="w-full bg-[#0d1829] flex bg-transparent pl-2 text-[#cccccc] outline-0"
              placeholder="Search everything..." autoComplete="off" spellCheck="false" />
            <button type="submit" className="relative p-2 bg-[#0d1829] rounded-full">
              <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white">Sign in</button>
            <button className="bg-pink-500 text-white px-4 py-2 rounded text-sm font-medium">Sign up</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4" style={{ minHeight: 'calc(100vh - 140px)' }}>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <h2 className="text-xl font-bold mb-4">MOST VIRAL</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-800 p-2 rounded">
                <img src="https://placehold.co/300x300" alt="Placeholder image for a viral post"
                  className="w-full h-48 object-cover rounded" />
                <div className="mt-2">
                  <h3 className="text-sm font-semibold">Solve the teenage admission post and as a reward you get to be insulted
                    by some random over the internet</h3>
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                    <span>123 points</span>
                    <span>15 comments</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-2 rounded">
                <img src="https://placehold.co/300x300" alt="Placeholder image for a viral post"
                  className="w-full h-48 object-cover rounded" />
                <div className="mt-2">
                  <h3 className="text-sm font-semibold">Faith No More - We Care a Lot (1985)</h3>
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                    <span>456 points</span>
                    <span>78 comments</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-2 rounded">
                <img src="https://placehold.co/300x300" alt="Placeholder image for a viral post"
                  className="w-full h-48 object-cover rounded" />
                <div className="mt-2">
                  <h3 className="text-sm font-semibold">Opinion | Platitudes don't shift a political debate mismatched with
                    interracial marriage</h3>
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                    <span>789 points</span>
                    <span>101 comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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

      <footer className="bg-gray-800 p-4 mt-4">
        <div className="max-w-7xl mx-auto text-center text-xs text-gray-400">
          © 2023 Shirasawa
        </div>
      </footer>
    </>
  )
}

export default App;
