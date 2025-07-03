import { useState } from "react";
import { register } from "../services/userService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    mail: "",
    password: "",
  });
  const navigate =useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(userData);

      navigate('/')

      alert("inscription ok !")
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form  onSubmit={handleSubmit}>
      <Form.Group className="d-flex flex-column align-items-center justify-content-center gap-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control
        className="barre form-control col-4"
          type="text"
          placeholder="Enter name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="d-flex flex-column align-items-center justify-content-center gap-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          className="barre form-control col-4"
          type="email"
          placeholder="Enter email"
          value={userData.mail}
          onChange={(e) => setUserData({ ...userData, mail: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="d-flex flex-column align-items-center justify-content-center gap-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          className="barre form-control col-4"
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          required
        />
      <Button className="d-flex flex-column align-items-center justify-content-center gap-3" variant="dark" type="submit">
        Submit
      </Button>
      </Form.Group>
    </Form>
  );
};

export default RegisterPage;
