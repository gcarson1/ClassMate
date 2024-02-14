import React, { useEffect } from 'react'

function App() {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    fetch('http://localhost:8081/people')
      .then(res => res.json())
      .then(data => console.log(data))
      .cach(err => console.log(err))
  }
  , [])
  return (
    <div style={{padding: "50px"}}>
      <table>
        <thead>
          <th>ID</th>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App