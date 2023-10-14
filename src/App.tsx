import { ToastContainer } from 'react-toastify'
import { Header } from './Components/Header'
import 'react-toastify/dist/ReactToastify.css';

import { BodyTasks } from './Components/BodyTasks';


function App() {
  

  return (
    <>
     <Header/>
    
     <BodyTasks/>
     <ToastContainer />
    </>
     
  )
}

export default App
