import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/employee");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (employeeID) => {
    try {
      const response = await fetch(`http://localhost:8080/api/employee/${employeeID}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== employeeID)
        );
      }

      console.log(`Employee with ID ${employeeID} deleted successfully`);
      // After deletion, fetch updated employees
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error.message);
    }
  };

  const handleUpdate = (employeeID) => {
    navigate(`/employee/${employeeID}`);
  };

  return (
    <>
      <Container className="dashboard-container mt-5">
        <Row>
          <Col>
            <h1 className="text-center">Employee Management</h1>
            <Table striped bordered hover responsive className="employee-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.department}</td>
                    <td>{employee.name}</td>
                    <td>{employee.phone}</td>
                    <td>
                      <Button variant="primary" onClick={() => handleUpdate(employee.id)}>
                        Update
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
