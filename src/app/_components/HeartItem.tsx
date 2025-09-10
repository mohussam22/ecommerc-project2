'use client'
import React, { useState } from 'react'

export default function Heartitem() {
    const [heart,setHeart] =useState(false)
  return (
    <div>
      <i className={`fa-solid cursor-pointer ${heart? 'fa-heart':'fa-heart-broken'}`} onClick={()=>setHeart(!heart)}></i>
    </div>
  )
}
