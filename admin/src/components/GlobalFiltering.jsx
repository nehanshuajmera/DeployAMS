import React from 'react'
import './GlobalFiltering.css'

export default function GlobalFiltering({ filter, setFilter }) {
  return (
    <div className='adminGlobalSearch'>
      <span>
        Search:{' '}
      </span>
      <input value={filter || ''} onChange={e => setFilter(e.target.value)} />
    </div>
  )
}
