import React from 'react'
import { Link } from 'react-router-dom'

const LostScreen = ({ loser, setWinner, setLoser, setCoins, setUsername, username }) => {
    const linkClick = () => {
        setCoins(21)
        setWinner('')
        setLoser('')
        setUsername(username)
    }
    return (
        <div className='grid place-items-center pt-20'>

            <div className='flex flex-row items-center space-x-3'>
                <p className='font-semibold text-slate-400 text-3xl'>Loser:</p>
                <p className='text-red-500 text-3xl'>{loser}</p>
            </div>

            <div className='bg-red-500 text-red-50 p-4 hover:bg-green-500 hover:font-bold mt-4'>
                <Link to='/' onClick={linkClick}>Play Again</Link>
            </div>
        </div >

    )
}

export default LostScreen