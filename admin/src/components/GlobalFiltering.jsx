import React from 'react'
import './GlobalFiltering.css'

export default function GlobalFiltering({ filter, setFilter }) {
  return (
    <div className='adminGlobalSearch'>
      Search: {' '}
      <input value={filter || ''} onChange={e => setFilter(e.target.value)} />
    </div>
  )
}
