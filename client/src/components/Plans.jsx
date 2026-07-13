import { PricingTable } from '@clerk/react'
import React from 'react'

const Plans = () => {
  return (
    <div className='max-w-2xl mx-auto z-20 my-30 max-md:px-4'>
        <div className='text-center'>
            <h2 className='text-gray-700 text-4xl font-semibold'>
                Choose Your Plan
            </h2>
            <p>
                Start for free and scale up as you grow. Find the perfect plan for your contetn creation needs.
            </p>

        </div>
        <div className='mt-14'>
            <PricingTable/>
        </div>
      
    </div>
  )
}

export default Plans
