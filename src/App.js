import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import GamePlay from './components/gameplay/GamePlay';
import Login from './components/login/Login';
import LostScreen from './components/lostscreen/LostScreen';
import WinScreen from './components/winscreen/WinScreen';

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
    setCoins(currentCoins => currentCoins - pickedCoins)
  }

  useEffect(() => {

    // check if game ended
    if (coins <= 0) {
      setLoser(currentPlayer)
      setWinner(oppositePlayer)
      currentPlayer === username ? navigate('/lostScreen') : navigate('/winScreen')
    }

    // change payer on coin pick
    if (coins - 1 || coins - 2 || coins - 3 || coins - 4) {

      // change current player's turn
      currentPlayer === username ?
        setCurrentPlayer('AI') && setOppositePlayer(username)
        : setCurrentPlayer(username) && setOppositePlayer('AI')

    }

    // if (currentPlayer === 'AI') {
    //   setTimeout(async () => {
    //     if (coins > 0) {
    //       await handleCoinPick(Math.floor(Math.random() * 4) + 1);
    //     }
    //   }, 1000);
    // }


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

        {/* Lost Screen */}
        <Route
          path='/lostScreen'
          element={<LostScreen
            loser={loser}
            handlePlayAgain={handlePlayAgain} />} />

        {/* Win Screen */}
        <Route
          path='/winScreen'
          element={<WinScreen
            winner={winner}
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
