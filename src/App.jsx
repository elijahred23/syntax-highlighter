import { useState } from 'react'
import SQLEditor from './SQLEditor';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <SQLEditor />  
      </div> 
    </>
  )
}

export default App
