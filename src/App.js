import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import GamePlay from './components/gameplay/GamePlay';
import Login from './components/login/Login';
import Score from './components/score/Score';

function App() {
  const API_URL = 'http://192.168.0.113:3500/user'
  const navigate = useNavigate()

  // athenticated or not
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [])


  // user credential
  const [userId, setUserId] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [win, setWin] = useState(0)
  const [lost, setLost] = useState(0)
  const [error, setError] = useState('')


  // gameStart, player, coins & gameState
  const [gameStart, setGameStart] = useState('')
  const [currentPlayer, setCurrentPlayer] = useState(username)
  const [oppositePlayer, setOppositePlayer] = useState('')
  const [coins, setCoins] = useState(21);


  // winner & loser
  const [winner, setWinner] = useState('')
  const [loser, setLoser] = useState('')


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
          setUserId(response.data[0].id)
          setWin(response.data[0].win)
          setLost(response.data[0].lost)

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

  // function to handle coin pick
  const handleCoinPick = async (pickedCoins) => {
    await setCoins(currentCoins => currentCoins - pickedCoins)
  }

  // function handle play again in the score page
  const handlePlayAgain = () => {
    setCoins(21)
    setWinner('')
    setLoser('')

    setGameStart('')
    setUsername(username)
    setOppositePlayer('AI')
  }

  const handleLogout = () => {
    setUserId('')
    setUsername('')
    setPassword('')
    setError('')
    setGameStart('')
    setCurrentPlayer('')
    setOppositePlayer('')
    setCoins(21)
    setWinner('')
    setLoser('')
    setIsAuthenticated(false)
  }

  // when coin is picked
  useEffect(() => {
    const changePlayer = async () => {
      // change player on coin pick
      if (coins - 1 || coins - 2 || coins - 3 || coins - 4) {

        if (currentPlayer === username) {
          await setCurrentPlayer('AI')
          await setOppositePlayer(username)

          // let AI play
          // if (gameState === true) {
          //   setTimeout(async () => {
          //     if (coins > 0) {
          //       await handleCoinPick(Math.floor(Math.random() * 4) + 1);
          //     }
          //   }, 1000);
          // }

        } else {
          await setCurrentPlayer(username)
          await setOppositePlayer('AI')
        }
      }
    }
    changePlayer()
  }, [coins])

  // when game ends
  useEffect(() => {
    const checkGame = async () => {

      // check if game ended
      if (coins < 1) {
        await setLoser(currentPlayer)
        await setWinner(oppositePlayer)
      }
    }
    // call function
    checkGame()
  }, [coins])

  // after game ends score updated
  useEffect(() => {
    const putStatus = async () => {

      if (winner === '') {
        return
      } else {
        if (winner === username) {
          await setWin(win + 1)
        } else if (winner === 'AI') {
          await setLost(lost + 1)
        } else { return }
        try {

          await setTimeout(async () => {
            const response = await axios.put(`${API_URL}/${userId}`, { id: userId, username: username, password: password, win: win, lost: lost })
            if (response.status === 200) {
              navigate('/score')
            }
          }, 1000);

        } catch (error) {
          console.log(error.message)
        }
      }
    }



    putStatus()

  }, [winner])




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
            win={win}
            lost={lost}
            username={username}
            winner={winner}
            loser={loser}
            handlePlayAgain={handlePlayAgain}
            handleLogout={handleLogout} />} />

        {/* Login Screen */}
        <Route
          path='/login'
          element={<Login

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
