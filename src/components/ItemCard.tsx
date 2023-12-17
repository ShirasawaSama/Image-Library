import React from 'react'
import TimeAgo from 'timeago-react'
import { Link } from 'react-router-dom'
import type { Item } from '../types'
import { translate } from '../service'

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
  const [detailsTranslate, setDetailsTranslate] = React.useState('')
  return (
    <div className='bg-gray-800 p-2 rounded' style={{ height: 'fit-content' }}>
      <img src={item.file} alt={item.title} className='w-full h-48 object-cover rounded' />
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
    </div>
  )
}

export default React.memo(ItemCard)
