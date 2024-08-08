import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useState } from 'react';


function App() {
  const [formData, setFormData] = useState({
    uname: "",
    uemail: "",
    uPhone: "",
    uMessage: "",
    index: ""
  });

  const [userData, setUserData] = useState([]);

  const getValue = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentUserFormdata = {
      uname: formData.uname,
      uemail: formData.uemail,
      uPhone: formData.uPhone,
      uMessage: formData.uMessage
    };

    if (formData.index !== "") {
      const updatedUserData = userData.map((user, idx) =>
        idx === formData.index ? currentUserFormdata : user
      );
      setUserData(updatedUserData);
    } else {
      setUserData((prevData) => [...prevData, currentUserFormdata]);
    }

    setFormData({
      uname: "",
      uemail: "",
      uPhone: "",
      uMessage: "",
      index: ""
    });
  };

  const handleDelete = (index) => {
    const updatedUserData = userData.filter((_, i) => i !== index);
    setUserData(updatedUserData);
  };

  const handleEdit = (index) => {
    const userToEdit = userData[index];
    setFormData({ ...userToEdit, index });
  };

  return (
    <Container fluid  >

      < Row >
        <Col className='text-center py-5'>
          <h1>Enquiry Now</h1>
        </Col>
      </Row >
      <Row>
        <Col lg={5}>
          <form onSubmit={handleSubmit}>
            <div className="pb-3 px-5">
              <label className='form-label'>Name</label>
              <input type='text' onChange={getValue} value={formData.uname} name='uname' className='form-control' />
            </div>
            <div className="pb-3 px-5">
              <label className='form-label'>Email</label>
              <input type='email' onChange={getValue} value={formData.uemail} name='uemail' className='form-control' />
            </div>
            <div className="pb-3 px-5">
              <label className='form-label'>Phone</label>
              <input type='text' onChange={getValue} value={formData.uPhone} name='uPhone' className='form-control' />
            </div>
            <div className="pb-3 px-5">
              <label className="form-label">Message</label>
              <textarea onChange={getValue} value={formData.uMessage} name='uMessage' className="form-control" rows="3"></textarea>
            </div>
            <button type="submit" className='btn btn-primary mx-5 pb-2 px-4'>
              {formData.index !== "" ? 'Update' : 'Save'}
            </button>
          </form>
        </Col>
        <Col lg={7}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.length > 0 ? (
                userData.map((obj, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{obj.uname}</td>
                    <td>{obj.uemail}</td>
                    <td>{obj.uPhone}</td>
                    <td>{obj.uMessage}</td>
                    <td>
                      <button onClick={() => handleDelete(i)}>Delete</button>

                      <button onClick={() => handleEdit(i)}>Edit</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No Data Found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container >
  );
}

export default App;
