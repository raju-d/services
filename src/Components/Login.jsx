import { useState } from "react"

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async() => {
    const response = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`);
    const data = await response.json();

    if(data.length > 0 ) {
      console.log("logged in successfully");
    } else {
      console.log("login failed");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" 
               name="email"
               placeholder="Email"
               value={email}
               onChange={(e)=> setEmail(e.target.value)}
               required
        />
        <input type="password" 
               name="password"
               placeholder="Password"
               value={password}
               onChange={(e)=> setPassword(e.target.value)}
               required

        />
        <button type="button">Login</button>
      </form>
    </div>
  )
}

export default Login