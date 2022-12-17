import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import GamePlay from './components/gameplay/GamePlay';
import Login from './components/login/Login';
import LostScreen from './components/lostscreen/LostScreen';
import WinScreen from './components/winscreen/WinScreen';

function App() {
  const navigate = useNavigate()

  // user credential
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    navigate('/login')
  }, [])

  // player & coins
  const [currentPlayer, setCurrentPlayer] = useState(username)
  const [coins, setCoins] = useState(21);

  // winner & loser
  const [winner, setWinner] = useState('')
  const [loser, setLoser] = useState('')

  // function to handle login submission
  const handleSubmit = (e) => {
    e.preventDefault()

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

    // check if the game is over
    if (coins === 0 || coins < 0) {
      setLoser(username)
      setWinner('AI')
      // show the lost screen
      navigate('/lostScreen', { coins })
      return
    }

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

  // function to handle AI's turn
  const handleAITurn = () => {

    // calculate the number of coins for the AI to pick
    let pickcoins = coins % 4
    if (pickcoins === 0) {
      pickcoins = 1;
    }

    // decrement the number of coins by the number picked by the AI
    setCoins((prevCoins) => prevCoins - pickcoins);

    // check if the game is over
    if (coins === 0 || coins < 0) {
      setLoser('AI')
      setWinner(username)
      // show the lost screen
      navigate('/winScreen', { coins });
      return;
    }

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
