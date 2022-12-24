import React from 'react'
import { Link } from 'react-router-dom'

const Score = ({ win, lost, winner, loser, handlePlayAgain, handleLogout }) => {

    return (
        <div className='grid place-items-center pt-20'>

            <div className='flex flex-row items-center space-x-3'>
                <p className='font-semibold text-slate-400 text-3xl'>Winner:</p>
                <p className='text-green-500 text-3xl'>{winner}</p>
            </div>


            <div className='flex flex-row items-center space-x-3'>
                <p className='font-semibold text-slate-400 text-3xl'>Loser:</p>
                <p className='text-red-500 text-3xl'>{loser}</p>
            </div>

            <div className='flex flex-row items-center space-x-3'>
                <p className='font-semibold text-slate-400 text-3xl'>Win:</p>
                <p className='text-slate-500 text-3xl'>{win}</p>
                <p className='font-semibold text-slate-400 text-3xl'>Lost:</p>
                <p className='text-slate-500 text-3xl'>{lost}</p>
            </div>

            <div className='bg-red-500 text-red-50 p-4 hover:bg-green-500 hover:font-bold mt-4'>
                <Link to='/' onClick={handlePlayAgain}>Play Again</Link>
            </div>

            <div className='bg-red-500 text-red-50 p-4 hover:bg-green-500 hover:font-bold mt-4'>
                <Link to='/login' onClick={handleLogout}>Logout</Link>
            </div>
        </div >
    )
}

export default Score