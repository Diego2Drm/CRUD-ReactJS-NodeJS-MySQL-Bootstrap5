import Axios from 'axios';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EmployeesTable } from "./components/EmployeesTable";
import Swal from 'sweetalert2';

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
      cleanData();
      Swal.fire({
        title: "<strong>Successful Registration</strong>",
        html: "You added the employee!! <strong>" + name + "</strong>",
        icon: "success",
        timer: 3000,
      });
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
      cleanData();
      Swal.fire({
        title: "<strong>Successful Update</strong>",
        html: "You updated the employee!! <strong>" + name + "</strong>",
        icon: "success",
        timer: 3000,
      });
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

  const deleteEmployee = (val) => {
    Swal.fire({
      title: "<strong>Successful Deleted</strong>",
      html: "Do you want to delete the employee?  <strong>" + val.name + "</strong>",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getData();
          cleanData();
          Swal.fire(
            "Deleted",
            val.name + ' was seleted ',
            "success"
          )
        }).catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops..",
            html: "<strong>The employee was not eliminated!!</strong>",
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Try later" : JSON.parse(JSON.stringify(error)).message == "Network Error"
          })
        })
      }
    })
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

      <EmployeesTable employeesLits={employeesLits} handleEdit={editEmployee} handleDelete={deleteEmployee} />

    </section>
  )

}
export default App
