import { useState } from 'react'
import './App.css'
import ListCanciones from './components/ListCanciones'
import AgregarCancion from './components/AgregarCancion'
function App() {
  const [song, setSong] = useState()

  return (
    <>
    <AgregarCancion/>
    <ListCanciones/>
    </>
  )
}

export default App
