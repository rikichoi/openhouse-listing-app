import React from 'react'
import Image from 'next/image'
import Logo from "@/images/logo.png";


export default function Footer() {
  return (
    <div className="px-40 py-24 border-t-2">
    <Image src={Logo} className="max-w-44"></Image>
    </div>
  )
}
