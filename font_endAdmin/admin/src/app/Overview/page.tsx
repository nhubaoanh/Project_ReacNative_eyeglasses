"use client"

import React from 'react'
import StatCard from '../components/StatCard'
import { DollarSign, ShoppingBag, SquareActivity, User } from 'lucide-react'

export default function OverviewPage() {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <main className='max-w-7xl mx-auto py-4 px-4 lg:px-8'>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'>
            <StatCard name='Total Sales' Icon={DollarSign} value="$1878"/>
            <StatCard name='Total Client' Icon={User} value="1,568" />
            <StatCard name='Total Product' Icon={ShoppingBag} value="1467" />
            <StatCard name='Stock' Icon={SquareActivity} value="35,678" />
        </div>
      </main>
    </div>
  )
}
