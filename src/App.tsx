import './global.css'
import { Header } from './Components/Header';
import {Todo} from './Components/Todo'

function App() {
  return (
    <>
      <Header />
      <main className='wrapper'>
        <Todo />
      </main>
    </>
  )
}

export default App
