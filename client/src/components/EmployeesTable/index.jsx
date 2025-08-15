
const EmployeesTable = ({ employeesLits, handleEdit }) => {
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
          employeesLits.map((employe, i) => (
            <tbody key={i}>
              <tr>
                <th>{employe.id}</th>
                <td>{employe.name}</td>
                <td>{employe.age}</td>
                <td>{employe.country}</td>
                <td>{employe.job}</td>
                <td>{employe.years}</td>
                <td className="btn-group" role="group">
                  <button type="button" className="btn btn-info"
                    onClick={() => handleEdit(employe)}
                  >
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger">Delete</button>
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