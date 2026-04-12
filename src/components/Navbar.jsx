import React from 'react'


const Navbar = () => {
  return (
    <nav className='bg-red-700 text-white'>
      <div className='mycontainer  flex justify-between items-center px-4 py-5 h-14'>
      <div className="logo font-bold text-3xl">
       <span className='text-blue-700'>&lt;</span>
        Passop
       <span className='text-blue-700'>OP/&gt;</span>


        </div>
      {/* <ul>
        <li className='flex gap-4'>
          <a className='hover:font-bold' href="/">Home</a>
          <a className='hover:font-bold' href="">About</a>
          <a className='hover:font-bold' href="">Contact</a>
          
        </li>
      </ul> */}
      <button className='text-white bg-blue-800 cursor-pointer rounded-full  flex  '>
        <img className='w-10 p-1 invert ' src="./icons/github.svg" alt="" />
        <span className='font-bold  py-2 px-2 '>GitHub</span>
      </button>
      </div>
    </nav>
  )
}

export default Navbar
