import React from 'react'

const StartGame = ({ handleGameStartYes, handleGameStartNo }) => {
    return (
        <section>
            <div className="font-mono text-orange-800 text-5xl mb-6">
                Do you want to start the game?
                <div className="flex flex-row justify-center mt-9">
                    <button
                        className="bg-green-500 text-white p-3 hover:bg-white hover:text-green-500 hover:ring-1 hover:ring-green-500"
                        onClick={handleGameStartYes}>Yes</button>
                    <button
                        className="bg-red-500 text-white py-3 px-5 hover:bg-white hover:text-red-500 hover:ring-1 hover:ring-red-500"
                        onClick={handleGameStartNo}>No</button>
                </div>
            </div>
        </section>
    )
}

export default StartGame