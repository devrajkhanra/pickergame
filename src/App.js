import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import GamePlay from './components/gameplay/GamePlay';
import Login from './components/login/Login';
import Score from './components/score/Score';

function App() {
  const API_URL = 'http://localhost:3500/user'
  const navigate = useNavigate()



  // athenticated or not
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [])



  // user credential
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // function to handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await axios.get(`${API_URL}`, { params: { username, password }, responseType: 'json' },)

      // if successfull response
      if (response.status === 200) {
        if (response.data[0].username === username && response.data[0].password === password) {
          setIsAuthenticated(true)
          navigate('/')
        }
      } else {
        setError('Invalid username or password')
      }
    } catch (error) {
      setError('Error Occurred')
      console.log(error)
    }
  }



  // gameStart, player, coins & gameState
  const [gameState, setGameState] = useState(false)
  const [gameStart, setGameStart] = useState('')
  const [currentPlayer, setCurrentPlayer] = useState(username)
  const [oppositePlayer, setOppositePlayer] = useState('')
  const [coins, setCoins] = useState(21);

  // function to handle username will start the game
  const handleGameStartYes = () => {
    setGameStart(username)
    setCurrentPlayer(username)
    setOppositePlayer('AI')
  }

  // function to handle AI will start the game
  const handleGameStartNo = () => {
    setGameStart('AI')
    setCurrentPlayer('AI')
    setOppositePlayer(username)
  }

  // winner & loser
  const [winner, setWinner] = useState('')
  const [loser, setLoser] = useState('')
  const [win, setWin] = useState('')
  const [lost, setLost] = useState('')

  const handlePlayAgain = () => {
    setCoins(21)
    setWinner('')
    setLoser('')
    setGameStart('')
    setUsername(username)
    setOppositePlayer('AI')
  }

  // function to handle coin pick
  const handleCoinPick = async (pickedCoins) => {
    await setCoins(currentCoins => currentCoins - pickedCoins)
  }

  useEffect(() => {

    // change player on coin pick
    if (coins - 1 || coins - 2 || coins - 3 || coins - 4) {

      if (currentPlayer === username) {
        setCurrentPlayer('AI')
        setOppositePlayer(username)

        // let AI play
        // if (gameState === true) {
        //   setTimeout(async () => {
        //     if (coins > 0) {
        //       await handleCoinPick(Math.floor(Math.random() * 4) + 1);
        //     }
        //   }, 1000);
        // }

      } else {
        setCurrentPlayer(username)
        setOppositePlayer('AI')
      }

      // check if game ended
      if (coins < 1) {
        setLoser(currentPlayer)
        setWinner(oppositePlayer)
        setTimeout(() => {
          navigate('/score')
        }, 500);
      }
    }


  }, [coins])


  return (
    <div className="App bg-gradient-to-br from-amber-100 to-blue-50 min-h-screen">
      <Routes>

        {/* Main game play screen */}
        <Route
          path='/'
          element={<GamePlay
            gameStart={gameStart}
            handleGameStartYes={handleGameStartYes}
            handleGameStartNo={handleGameStartNo}
            coins={coins}
            currentPlayer={currentPlayer}
            handleCoinPick={handleCoinPick} />} />

        {/* Win Screen */}
        <Route
          path='/score'
          element={<Score
            winner={winner}
            loser={loser}
            handlePlayAgain={handlePlayAgain} />} />

        {/* Login Screen */}
        <Route
          path='/login'
          element={<Login
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            error={error} />} />
      </Routes>
    </div>
  );

}
export default App;
