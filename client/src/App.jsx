import Axios from "axios"
import { useState } from "react"

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [job, setJob] = useState('');
  const [years, setYears] = useState(0);

  const addData = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      job: job,
      years: years,
    }).then(()=> {
      alert("Empleado Registrado!!")
    });
  }

  return (
    <section className='App'>
      <h1>CRUD React + Noded + MySql</h1>
      <div className='datos'>
        <label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
          <span>Name:</span>
        </label>

        <label>
          <input type="text" onChange={(e) => setAge(e.target.value)} />
          <span>Age:</span>
        </label>

        <label>
          <input type="text" onChange={(e) => setCountry(e.target.value)} />
          <span>Country:</span>
        </label>

        <label>
          <input type="text" onChange={(e) => setJob(e.target.value)} />
          <span>Job:</span>
        </label>

        <label>
          <input type="text" onChange={(e) => setYears(e.target.value)} />
          <span>Years:</span>
        </label>


        <button onClick={addData}>Registrar</button>
      </div>
    </section>
  )
}

export default App
