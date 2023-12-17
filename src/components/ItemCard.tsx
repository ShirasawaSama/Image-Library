import React from 'react'
import TimeAgo from 'timeago-react'
import type { Item } from '../types'

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <div className='bg-gray-800 p-2 rounded'>
      <img src={item.file} alt={item.title} className='w-full h-48 object-cover rounded' />
      <div className='mt-2'>
        <h2 className='text-lg font-semibold'>{item.title}</h2>
        { /* by ? */}
        <h4 className='text-sm font-light text-gray-400 italic'>by {item.username}</h4>
        <div className='flex items-center justify-between text-xs text-gray-400 mt-2'>
          <span>{item.details}</span>
        </div>
        <div className='flex items-center justify-between text-xs text-gray-400 mt-2'>
          <TimeAgo datetime={item.createdAt} />
        </div>
      </div>
    </div>
  )
}

export default React.memo(ItemCard)
