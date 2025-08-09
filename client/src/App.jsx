import Axios from 'axios';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EmployeesTable } from "./components/EmployeesTable";

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
    }).then(() => {
      getData();
      alert("Empleado Registrado!!")
    });
  }

  const [employeesLits, setEmployeesLits] = useState([]);

  const getData = () => {
    Axios.get("http://localhost:3001/employees").then(res => {
      setEmployeesLits(res.data);
    });
  };

  getData();
  return (
    <section className='container p-3'>
      <h1>CRUD React + Noded + MySql</h1>
      <div className='card bg-success-subtle'>
        <div className="card-header text-center">
          <h2 className="text-danger">Gestion de empleados</h2>
        </div>
        <div className="card-body">
          <label className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-person-fill"></i>
            </span>
            <input type="text" className="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1"
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-cake-fill"></i>
            </span>
            <input type="text" className="form-control" placeholder="Age" aria-label="Age" aria-describedby="basic-addon1"
              onChange={(e) => setAge(e.target.value)}
            />
          </label>

          <label className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-flag-fill"></i>
            </span>
            <input type="text" className="form-control" placeholder="Country" aria-label="Country" aria-describedby="basic-addon1"
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>

          <label className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-briefcase-fill"></i>
            </span>
            <input type="text" className="form-control" placeholder="job" aria-label="Job" aria-describedby="basic-addon1"
              onChange={(e) => setJob(e.target.value)}
            />
          </label>

          <label className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-clipboard-data-fill"></i>
            </span>
            <input type="text" className="form-control" placeholder="Experience" aria-label="Experience" aria-describedby="basic-addon1"
              onChange={(e) => setYears(e.target.value)}
            />
          </label>
        </div>

        <div className="card-footer text-center">
          <button onClick={addData} className="btn btn-success">
            Registrar
          </button>
        </div>
      </div>

      <EmployeesTable  employeesLits={employeesLits}/>

    </section>
  )
}

export default App
