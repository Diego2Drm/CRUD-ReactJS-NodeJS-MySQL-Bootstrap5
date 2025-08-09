const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employees_crud",
});

// gaurdar
app.post("/create", (req, res) => {
  // datos obtenidos del formulario
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const job = req.body.job;
  const years = req.body.years;

  // consulta y envio de los datos --> ?,?,? indica que le voy a enviar informacion 
  db.query('INSERT INTO employees(name,age,country,job,years) VALUES(?,?,?,?,?)', [name, age, country, job, years],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Empleado registrado con éxito!!");
      }
    }
  )
});

// consultar la base de datos para mostrar 
app.get("/employees", (req, res) => {
  db.query('SELECT * FROM employees',
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    });
});

app.listen(3001, () => {
  console.log("listen port 3001");

});