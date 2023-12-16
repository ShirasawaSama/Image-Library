import React from 'react'
import type { Item } from '../types'

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <div className='bg-gray-800 p-2 rounded'>
      <img src={item.src} alt={item.title} className='w-full h-48 object-cover rounded' />
      <div className='mt-2'>
        <h3 className='text-sm font-semibold'>{item.title}</h3>
        <div className='flex items-center justify-between text-xs text-gray-400 mt-2'>
          <span>{item.time}</span>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ItemCard)
