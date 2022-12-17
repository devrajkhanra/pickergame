const GamePlay = ({ coins, currentPlayer, handleCoinPick }) => {

    return (

        <div className="flex flex-col px-34 items-center pt-20">
            {/* Turn of player or AI */}
            <div className="font-semibold text-slate-400 text-4xl mb-6">
                Turn: {currentPlayer !== 'AI' ? 'Player' : 'Wait for AI'}
            </div>

            {/* display the number of coins remaining */}
            <div className="flex flex-row justify-center items-center px-12 space-x-2">
                <h3 className="font-semibold text-xl text-slate-400">Coins remaining: </h3>
                <p className="font-bold text-xl text-amber-600">{coins}</p>
            </div>

            <div className="grid grid-cols-2 mt-8">
                {/* display buttons for the player to pick 1, 2, 3, or 4 coins */}
                <button
                    className=" bg-yellow-300 shadow-md m-2 p-2 hover:bg-orange-500 rounded-full h-32 w-32 hover:shadow-lg hover:shadow-red-500 action:bg-red-900 action:text-white"
                    onClick={() => handleCoinPick(1)}>Pick 1 coin</button>
                <button
                    className="bg-yellow-300 shadow m-2 p-2 hover:bg-orange-500 rounded-full h-32 w-32 hover:shadow-lg hover:shadow-red-500"
                    onClick={() => handleCoinPick(2)}>Pick 2 coins</button>
                <button
                    className="bg-yellow-300 shadow m-2 p-2 hover:bg-orange-500 rounded-full h-32 w-32 hover:shadow-lg hover:shadow-red-500"
                    onClick={() => handleCoinPick(3)}>Pick 3 coins</button>
                <button
                    className="bg-yellow-300 shadow m-2 p-2 hover:bg-orange-500 rounded-full h-32 w-32 hover:shadow-lg hover:shadow-red-500"
                    onClick={() => handleCoinPick(4)}>Pick 4 coins</button>
            </div>
        </div>
    );
};

export default GamePlay;