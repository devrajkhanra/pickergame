import React from 'react'

const Login = ({ username, setUsername, password, setPassword, handleSubmit, error }) => {

    return (
        <div className='flex flex-col justify-center items-center'>

            <h1 className='mt-20 font-semibold text-4xl text-slate-400'>Login</h1>
            {error && <p>{error}</p>}
            <form className='flex flex-col py-6 border px-6 bg-white' onSubmit={handleSubmit}>

                {/* username */}
                <label className='font-thin'>Username</label>
                <input
                    type='text'
                    placeholder='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete='false'
                    className='ring-2' />

                {/* password */}
                <label className='font-thin pt-5'>Password</label>
                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete='false'
                    className='ring-2' />

                {/* button */}
                <button type='submit' className='mt-4 bg-green-400 ring-2'>Submit</button>

            </form>
        </div>
    )
}

export default Login