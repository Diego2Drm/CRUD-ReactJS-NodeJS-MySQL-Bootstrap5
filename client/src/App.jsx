import Axios from 'axios';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EmployeesTable } from "./components/EmployeesTable";

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState();
  const [country, setCountry] = useState('');
  const [job, setJob] = useState('');
  const [years, setYears] = useState();
  const [id, setId] = useState();

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
      cleanData();
    });
  }

  const [employeesLits, setEmployeesLits] = useState([]);

  const getData = () => {
    Axios.get("http://localhost:3001/employees").then(res => {
      setEmployeesLits(res.data);
    });
  };

  const [edit, setedit] = useState(false);

  const editEmployee = (val) => {
    setedit(true);
    setName(val.name);
    setAge(val.age);
    setCountry(val.country);
    setJob(val.job);
    setYears(val.years);
    setId(val.id);
  }

  const updateData = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      name: name,
      age: age,
      country: country,
      job: job,
      years: years,
    }).then(() => {
      getData();
      alert("Empleado Actualizado!!");
      cleanData();
    });
  }

  const cleanData = () => {
    setedit(false)
    setName("");
    setAge("");
    setCountry("");
    setJob("");
    setYears("");
    setId("");
  }

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
              value={name}
            />
          </label>

          <label className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-cake-fill"></i>
            </span>
            <input type="text" className="form-control" placeholder="Age" aria-label="Age" aria-describedby="basic-addon1"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </label>

          <label className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-flag-fill"></i>
            </span>
            <input type="text" className="form-control" placeholder="Country" aria-label="Country" aria-describedby="basic-addon1"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
          </label>

          <label className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-briefcase-fill"></i>
            </span>
            <input type="text" className="form-control" placeholder="job" aria-label="Job" aria-describedby="basic-addon1"
              onChange={(e) => setJob(e.target.value)}
              value={job}
            />
          </label>

          <label className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-clipboard-data-fill"></i>
            </span>
            <input type="text" className="form-control" placeholder="Experience" aria-label="Experience" aria-describedby="basic-addon1"
              onChange={(e) => setYears(e.target.value)}
              value={years}
            />
          </label>

        </div>

        <div className="card-footer text-center">
          {
            edit ?
              <div className='d-flex justify-content-center gap-2'>
                <button onClick={updateData} className="btn btn-outline-success">
                  Update
                </button>
                <button onClick={cleanData} className="btn  btn-outline-danger">
                  Cancel
                </button>


              </div>
              :
              <button onClick={addData} className="btn btn-success">
                Register
              </button>
          }

        </div>

      </div>

      <EmployeesTable employeesLits={employeesLits} handleEdit={editEmployee} />

    </section>
  )
}

export default App
