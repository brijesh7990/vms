import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ManualForm from './components/ManualForm'
import AdminPanelPage from './pages/AdminPanelPage'
import LoginPage from './pages/LoginPage'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/form' element={<ManualForm />} />
        <Route path='/admin' element={<AdminPanelPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
