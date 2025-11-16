import React from 'react'

const RoundedNotBGBtn = ({label}) => {
  return (
     <button type="button" className="px-6 py-3 text-lg font-medium text-[var(--primary1)] border border-blue-600 cursor-pointer rounded-[50px] shadow-md bg-white hover:bg-blue-50 transition duration-300 transform hover:scale-105">
               {label}
              </button>
  )
}

export default RoundedNotBGBtn