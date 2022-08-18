import React from 'react'
import './Navbar.css'

export default function Navbar() {
  return (
    <>
        <nav className='navbar-container'>
            <section className='settings'>
                <button><i class="fa-solid fa-bars"></i></button>
                <button><i class="fa-solid fa-angle-left"></i></button>
                <button><i class="fa-solid fa-angle-right"></i></button>
            </section>
            <section className='search-bar'>
                <input type="text" placeholder='Search or type a command' /> 
            </section>
            <section className='screen-setting'>
                <button><i class="fa-solid fa-user-tie"></i></button>
                <button><i class="fa-solid fa-minus"></i></button>
                <button><i class="fa-solid fa-down-left-and-up-right-to-center"></i></button>
                <button><i class="fa-solid fa-xmark"></i></button>
            </section>
        </nav>
    </>
  )
}

