import "./loginBox.css"


export default function LoginBox() {
  return (
    <div className="form">
        <h1 className="header">Login</h1>
        <div className="inputs">
          <input className="input" type="text" placeholder="username"></input> 
          <input className="input" type="text" placeholder="password"></input> 
        </div>
        <button className="loginButton">Submit</button>
    </div>
  )
}
