import React from 'react'
import TimeAgo from 'timeago-react'
import Dialog from 'rc-dialog'
import Copy from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom'
import type { Item } from '../types'
import { translate, deleteImage, username } from '../service'

const CopyDialog: React.FC<{ item: Item, open: boolean, onClose: () => void }> = ({ item, open, onClose }) => {
  return (
    <Dialog
      title={item.title}
      visible={open} onClose={onClose}
      style={{ width: 500 }}
    >
      <div className='flex flex-col space-y-2'>
        <Copy text={`![${item.file}](${item.file})`}>
          <div className='flex items-center justify-between'>
            <input className='bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium w-full mr-4' value={`![${item.file}](${item.file})`} readOnly />
            <button className='bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium whitespace-nowrap' onClick={() => alert('Copied!')}>Copy Markdown</button>
          </div>
        </Copy>
        <Copy text={`<img src="${item.file}" alt="${item.title}" />`}>
          <div className='flex items-center justify-between'>
            <input className='bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium w-full mr-4' value={`<img src="${item.file}" alt="${item.title}" />`} readOnly />
            <button className='bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium whitespace-nowrap' onClick={() => alert('Copied!')}>Copy HTML</button>
          </div>
        </Copy>
        <Copy text={`[img]${item.file}[/img]`}>
          <div className='flex items-center justify-between'>
            <input className='bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium w-full mr-4' value={`[img]${item.file}[/img]`} readOnly />
            <button className='bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium whitespace-nowrap' onClick={() => alert('Copied!')}>Copy BBCode</button>
          </div>
        </Copy>
        <Copy text={item.file}>
          <div className='flex items-center justify-between'>
            <input className='bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium w-full mr-4' value={item.file} readOnly />
            <button className='bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium whitespace-nowrap' onClick={() => alert('Copied!')}>Copy URL</button>
          </div>
        </Copy>
        {item.username === username && <button className='bg-red-500 text-white px-4 py-2 rounded text-sm font-medium' onClick={() => {
          deleteImage(item._id).then(success => {
            if (success) {
              alert('Deleted!')
              location.reload()
            }
          })
        }}>Delete this image</button>}
      </div>
    </Dialog>
  )
}

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
  const [detailsTranslate, setDetailsTranslate] = React.useState('')
  const [open, setOpen] = React.useState(false)

  return (
    <div className='bg-gray-800 p-2 rounded' style={{ height: 'fit-content' }}>
      <img
        src={item.file} alt={item.title}
        className='w-full h-48 object-cover rounded cursor-pointer hover:opacity-80'
        onClick={() => setOpen(true)}
      />
      <div className='mt-2'>
        <h2 className='text-lg font-semibold'>{item.title}</h2>
        <h4 className='text-sm font-light text-gray-400 italic'>by <Link to={'/profile/' + item.username}>{item.username}</Link></h4>
        <div className='flex items-center justify-between text-xs text-gray-400 mt-2'>
          <span>{detailsTranslate || item.details}</span>
        </div>
        <div className='flex items-center justify-between text-xs text-gray-400 mt-2'>
          <TimeAgo datetime={item.createdAt} />
          {detailsTranslate ? <span className='italic underline'>Translated</span>
            : <button className='text-gray-400 hover:text-white' onClick={() => {
              translate(item._id).then(setDetailsTranslate)
            }}>Translate</button>
          }
        </div>
      </div>

      <CopyDialog item={item} open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default ItemCard
