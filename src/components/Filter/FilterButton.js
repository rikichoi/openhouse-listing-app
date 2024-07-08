import React, { useState } from 'react'


export default function FilterButton({show, onClose}) {
  return (
    <div>
    <button onClick={() => onClose(!show)} className="border-2 w-24 h-12 bg-orange-400">Filter</button>
    </div>
)
}
