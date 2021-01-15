// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// my solution for extra credit 3
// const useLocalStorageState = keyword => window.localStorage.getItem(keyword);

// KCD's solution
function useLocalStorageState(key, defaultValue = '') {
  const [state, setState] = React.useState(
    // () => window.localStorage.getItem(key) || defaultValue,
    () => JSON.parse(window.localStorage.getItem(key)) || defaultValue, // my solution for EC 4
  )

  React.useEffect(() => {
    // window.localStorage.setItem(key, state)
    window.localStorage.setItem(key, JSON.stringify(state)) // my solution for EC 4
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName

  // initial version
  // const [name, setName] = React.useState(initialName)

  // normal version
  // const [name, setName] = React.useState(window.localStorage.getItem('name') || initialName);

  // extra credit 1
  // const getNameFromLocalStorage = () => window.localStorage.getItem('name') || initialName;
  // const [name, setName] = React.useState(() => getNameFromLocalStorage());

  // my extra credit 3
  // const [name, setName] = React.useState(useLocalStorageState('name') || initialName);
  // KCD's extra credit 3
  const [name, setName] = useLocalStorageState('name', initialName);

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  // this is valid for exercise through EC 2, but KCD's solution to EC3 extracts it out
  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name);
  // }, [name]); // added [name] dependency for extra credit 2

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
