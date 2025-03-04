import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ManualForm from './components/ManualForm'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/form' element={<ManualForm />} />
      </Routes>
    </div>
  )
}

export default App
