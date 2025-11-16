import React from 'react'

const RoundedBgBtn = ({label}) => {
  return (
      <button type="button" className="px-6  py-3 text-lg font-medium text-white bg-[var(--primary1)] m-0 rounded-[50px] cursor-pointer shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                {label}
              </button>
  )
}

export default RoundedBgBtn