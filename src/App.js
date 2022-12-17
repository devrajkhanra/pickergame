import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import GamePlay from './components/gameplay/GamePlay';
import Login from './components/login/Login';
import LostScreen from './components/lostscreen/LostScreen';
import WinScreen from './components/winscreen/WinScreen';

function App() {
  const API_URL = 'http://localhost:3500/'
  const navigate = useNavigate()

  // user credential
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // player & coins
  const [currentPlayer, setCurrentPlayer] = useState(username)
  const [coins, setCoins] = useState(21);
  console.log(coins)

  // winner & loser
  const [winner, setWinner] = useState('')
  const [loser, setLoser] = useState('')

  // first time page load
  useEffect(() => {
    navigate('/login')
  }, [])

  // when coin is zero
  useEffect(() => {
    if (coins === 0 && currentPlayer === 'AI') {

      navigate('/lostScreen')
      setLoser(username)
      setWinner('AI')
    }
    if (coins === 0 && currentPlayer === username) {
      navigate('/winScreen')
      setLoser('AI')
      setWinner(username)
    }
  }, [coins, currentPlayer])



  // function to handle login submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // const response = await axios.post("/login", {
    //   username, password
    // })

    //  check if username and password is admin
    if (username === 'admin' && password === 'admin1234') {
      // navigate to mainpage (game play screen)
      navigate('/')
    }

    // check is username and password is guest
    else if (username === 'guest' && password === 'guest1234') {
      // navigate to the mainpage (game play screen)
      navigate('/')
    }

    else {
      // display an error message
      alert('Invalid login credentials')
      setUsername('')
      setPassword('')
    }

  }

  // function to handle coin pick
  const handleCoinPick = (coins) => {
    setCoins((prevCoins) => prevCoins - coins)

    if (coins <= 0) {
      return
    }
    else {
      // switch to AI's turn
      if (currentPlayer === 'AI') {
        setCurrentPlayer(username)
      }
      else {
        setCurrentPlayer('AI')
        setTimeout(() => {
          handleAITurn()
        }, 2000);
      }
    }



  }

  // function to handle AI's turn
  const handleAITurn = async () => {

    // calculate the number of coins for the AI to pick
    let pickcoins = coins % 4
    if (pickcoins === 0) {
      pickcoins = 1
    }

    // decrement the number of coins by the number picked by the AI
    setCoins((prevCoins) => prevCoins - pickcoins);

    // switch back to user's turn
    setCurrentPlayer(username)
  }

  return (
    <div className="App bg-gradient-to-br from-amber-100 to-blue-50 min-h-screen">
      <Routes>
        <Route path='/' element={<GamePlay coins={coins} currentPlayer={currentPlayer} handleCoinPick={handleCoinPick} />} />
        <Route path='/lostScreen' element={<LostScreen loser={loser} setLoser={setLoser} setWinner={winner} setCoins={setCoins} setUsername={setUsername} username={username} />} />
        <Route path='/winScreen' element={<WinScreen winner={winner} setLoser={setLoser} setWinner={winner} setCoins={setCoins} setUsername={setUsername} username={username} />} />
        <Route path='/login' element={<Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleSubmit={handleSubmit} />} />
      </Routes>
    </div>
  );
}

export default App;
