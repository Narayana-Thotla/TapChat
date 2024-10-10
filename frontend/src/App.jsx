import './App.css'
import Login from './pages/login/Login.jsx'
import Signup from './pages/signup/Signup.jsx'
import Home from './pages/home/Home.jsx'
import toast, { Toaster } from 'react-hot-toast';


// const notify = () => toast('Here is your toast.');
function App() {

// element: authUser? <Navigate to="/home" /> : <Login/>,
// element: authUser? <Navigate to="/home" /> : <Signup/>,
// element: authUser? <Home/> : <Navigate to="/"/>,
  
  return (
    <>
      <Login/>
      {/* <Signin/> */}
      {/* <Signup /> */}
      {/* <Home/> */}
      
    </>
  )
}

export default App
