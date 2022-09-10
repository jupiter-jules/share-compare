import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let distance = inputs.distance;
    let duration = inputs.duration;
    let cost = distance * 2 + duration * 3;
    window.confirm(cost);
  }

  return (
    <div className="App">
      <Container>  
      <div class="py-5 text-center">
        <h1>
        Share  <span style={{
            fontWeight: "200",
          }}>Compare</span></h1>
        <p class="lead">Sharing is Comparing</p>
      </div>
      

      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Strecke</Form.Label>
        <Form.Control type="number" name="distance" value={inputs.distance || ""} onChange={handleChange} placeholder="Kilometer gesamt" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Dauer</Form.Label>
        <Form.Control type="number" name="duration" value={inputs.duration || ""} onChange={handleChange} placeholder="Mietdauer gesamt in Stunden" />
      </Form.Group>
           
      <Button variant="primary" type="submit">
        Berechnen
      </Button>
    </Form>
      </Container>
    </div>
  );
}

export default App;
