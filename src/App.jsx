import { useState, useId } from 'react';
import './App.css'

function App() {
  return (
    <>
      <Tooltip content="I'm a tooltip" position="right">
        <h1>Hello, world</h1>
      </Tooltip>
    </>
  )
}

function Tooltip({ children, content, position = 'right' }) {
  const [isActive, setIsActive] = useState(false);

  function onMouseEnter() {
    setIsActive(true)
  }

  function onMouseLeave() {
    setIsActive(false);
  }

  const id = useId();

  return (<>
    <div
      className='relative'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div aria-describedby={id}>{children}</div>
      <div className={`tooltip tooltip--${position} absolute border-solid border-2 rounded-lg p-2 ${!isActive ? 'hidden' : ''}`} role="tooltip" id={id}>
        {content}
      </div>
    </div>

  </>);
}

export default App
