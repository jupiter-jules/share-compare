import './App.css';
import React from "react";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
/*import Button from 'react-bootstrap/Button';*/
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';

function App() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    window.confirm("Alles läuft nach Plan.");
  }

  return (
    <div className="App">
      <Container>  
      <div class="py-5 text-center">
        <h1>
        Share  <span style={{
            fontWeight: "200",color:"green"
          }}>Compare</span></h1>
        <p class="lead">Sharing is Comparing</p>
      </div>
      

      <Form onSubmit={handleSubmit}>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label style={{fontWeight:"bold"}}>Strecke</Form.Label>
          <Form.Control type="number" name="distance" value={inputs.distance || ""} onChange={handleChange} placeholder="Kilometer gesamt" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label style={{fontWeight:"bold"}}>Dauer</Form.Label>
          <Form.Control type="number" name="duration" value={inputs.duration || ""} onChange={handleChange} placeholder="Mietdauer gesamt in Stunden" />
        </Form.Group>
      </Row>
           
      {/* <Button variant="light" type="submit">
        Berechnen
      </Button>*/}

      <Results inputs={inputs}/>
    </Form>
    
    <p style={{fontSize:"1em", color:"grey", marginTop: "5em"}}>Beinhaltet ungefähre Preisangaben für Miles, Stattauto, Sixt share und Share Now. Berechnungen ohne Gewähr.</p>    
    </Container>
    </div>
  );
}

function Results ({inputs}) {
  let distance = inputs.distance;
  let duration = inputs.duration;
  /*let cost = distance * 2 + duration * 3;*/

  const options = [
    { id: 1, provider: "Stattauto", rate:"Stundentarif", minimumduration: 0, tripcost: (3.15 * duration + 0.32 * distance).toFixed(2)},
    { id: 2, provider: "Stattauto", rate:"Tagestarif", minimumduration: 12, tripcost: (1.31 * duration + 0.32 * distance).toFixed(2)},
    { id: 3, provider: "Miles", rate:"km-Tarif", minimumduration: 0, tripcost: (1 + 0.98 * distance).toFixed(2)},
    { id: 4, provider: "Miles", rate:"Stundentarif 3h", minimumduration: 0, tripcost: (34 + 0.49 * Math.max(0,distance - 40)).toFixed(2)},
    { id: 5, provider: "Miles", rate:"Stundentarif 6h", minimumduration: 0, tripcost: (45 + 0.49 * Math.max(0,distance - 60)).toFixed(2)},
    { id: 6, provider: "Miles", rate:"Tagestarif", minimumduration: 0, tripcost: (49 + 0.49 * Math.max(0,distance - 50)).toFixed(2)},
    { id: 7, provider: "Sixt share", rate:"Minutenpreis", minimumduration: 0, tripcost: (18 * duration + 0.45 * Math.max(0,distance - 200)).toFixed(2)},
    { id: 8, provider: "Sixt share", rate:"Stundentarif 3h bis 280 km", minimumduration: 0, tripcost: (49 + 16.8 * Math.max(0,duration - 3)).toFixed(2)},
    { id: 9, provider: "Sixt share", rate:"Stundentarif 6h bis 320 km", minimumduration: 0, tripcost: (79 + 16.8 * Math.max(0,duration - 6)).toFixed(2)},
    { id: 10, provider: "Sixt share", rate:"Tagestarif bis 400 km", minimumduration: 0, tripcost: (138 + 16.8 * Math.max(0,duration - 24)).toFixed(2)},
    { id: 11, provider: "Share Now", rate:"Minutenpreis", minimumduration: 0, tripcost: (0.99 + 16.8 * duration + 0.39 * Math.max(0,distance - 200)).toFixed(2)},
    { id: 12, provider: "Share Now", rate:"Stundentarif 2h", minimumduration: 0, tripcost: (16.98 + 0.19 * distance + 16.8 * Math.max(0,duration - 2)).toFixed(2)},
    { id: 13, provider: "Share Now", rate:"Stundentarif 4h", minimumduration: 0, tripcost: (27.98 + 0.19 * distance + 16.8 * Math.max(0,duration - 4)).toFixed(2)},
    { id: 14, provider: "Share Now", rate:"Stundentarif 6h", minimumduration: 0, tripcost: (38.98 + 0.19 * distance + 16.8 * Math.max(0,duration - 6)).toFixed(2)},
    { id: 15, provider: "Share Now", rate:"Tagestarif", minimumduration: 0, tripcost: (70.98 + 0.19 * distance + 16.8 * Math.max(0,duration - 24)).toFixed(2)},
  ];

  options.sort(function(a, b){return a.tripcost - b.tripcost});

  const bestOption = options[0];

  const bestAlternatives = [options[1], options[2],options[3],options[4]];

  if (distance >0 && duration >0) {
    return (
    <div style={{
      marginTop: "5em"
    }}>
    <h4 style={{color: "green", marginBottom: "1em"}}>Top 5: So viel würde es kosten</h4>
    <ul>
    <ListGroup>
    <ListGroup.Item key={bestOption.id} variant="success">
          <span style={{fontWeight: "700"
          }}>{bestOption.provider}</span> {bestOption.rate}<h5><Badge bg="success">{bestOption.tripcost} Euro</Badge></h5>
          </ListGroup.Item>
          </ListGroup>
          
          {bestAlternatives.map((bestAlternatives) => (
          <ListGroup>
          <ListGroup.Item variant="light">
          <span style={{fontWeight: "700"
          }}>{bestAlternatives.provider}</span> {bestAlternatives.rate}<h5><Badge bg="secondary">{bestAlternatives.tripcost} Euro</Badge></h5>
          </ListGroup.Item>
          </ListGroup>
      ))}
    </ul>
    </div>);
  }
}

export default App;
