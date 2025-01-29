import Footer from '@/components/navigation/Footer'
import Navbar from '@/components/navigation/Navbar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

function GeneralLayout({children}: Props) {
  return (
    <div className='flex flex-col w-full'>
        <Navbar />
        {children}
        <Footer />
    </div>
  )
}

export default GeneralLayout