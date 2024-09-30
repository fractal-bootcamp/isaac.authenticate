import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState } from 'react'

function App() {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="title">Log in</p>
      <form className="App">
        <input value={email} type="username" onChange={(e) => setEmail(e.target.value)} />
        <br></br>
        <input value={pass} type="password" onChange={(e) => setPass(e.target.value)} />
        <br></br>
        <input type={"submit"}
          style={{ backgroundColor: "#a1eafb" }} />
      </form>
    </form>
  );
}

export default App;
