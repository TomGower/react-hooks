// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName

  // initial version
  // const [name, setName] = React.useState(initialName)

  // normal version
  // const [name, setName] = React.useState(window.localStorage.getItem('name') || initialName);

  // extra credit 1
  const getNameFromLocalStorage = () => window.localStorage.getItem('name') || initialName;
  const [name, setName] = React.useState(() => getNameFromLocalStorage());

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  React.useEffect(() => {
    window.localStorage.setItem('name', name);
  }, [name]); // added [name] dependency for extra credit 2

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
