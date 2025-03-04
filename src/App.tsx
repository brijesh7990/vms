import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ManualForm from './components/ManualForm'
import AdminPanelPage from './pages/AdminPanelPage'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/form' element={<ManualForm />} />
        <Route path='/admin' element={<AdminPanelPage />} />
      </Routes>
    </div>
  )
}

export default App
