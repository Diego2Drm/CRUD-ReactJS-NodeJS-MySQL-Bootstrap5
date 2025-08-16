
const EmployeesTable = ({ employeesLits, handleEdit, handleDelete }) => {
  return (
    <div className="">
      <table className="table table-striped-columns mt-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Country</th>
            <th scope="col">Job</th>
            <th scope="col">Experience</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        {
          employeesLits.map((employee, i) => (
            <tbody key={i}>
              <tr>
                <th>{employee.id}</th>
                <td>{employee.name}</td>
                <td>{employee.age}</td>
                <td>{employee.country}</td>
                <td>{employee.job}</td>
                <td>{employee.years}</td>
                <td className="btn-group" role="group">
                  <button type="button" className="btn btn-info"
                    onClick={() => handleEdit(employee)}
                  >
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger"
                  onClick={() => handleDelete(employee)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))
        }
      </table>
    </div>
  )
}

export { EmployeesTable };