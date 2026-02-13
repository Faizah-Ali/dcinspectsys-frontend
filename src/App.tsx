import Header from './components/header/index.tsx'
import Login from './pages/login/index.tsx'
import { ToastContainer } from 'react-toastify'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <Login />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
