import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {  Button, Col, Container, Form, Row } from 'react-bootstrap';
import { apiBase } from '../../config';

interface ICard {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
  image: { url: string; alt: string };
  web:string;
  phone:string;
  email:string;
  country:string;
  state:string;
  city:string;
  bizNumber: number;
  user_id: string;
}

export default function EditCard() {
  const { cardId } = useParams();
  const [card, setCard] = useState<ICard | null>(null);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [web, setWeb] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [zip, setZip] = useState('');
  const [bizNumber, setBizNumber] = useState('');

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`${apiBase}/cards/${cardId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = (await response.json()).data;
        if (!response.ok) throw new Error(data);
        setCard(data);
        setTitle(data.title);
        setSubTitle(data.subTitle);
        setDescription(data.description);
        setImageUrl(data.image.url);
        setImageAlt(data.image.alt);
        setWeb(data.web);
        setPhone(data.phone);
        setEmail(data.email);
        setState(data.address.state);
        setCountry(data.address.country);
        setCity(data.address.city);
        setStreet(data.address.street);
        setHouseNumber(data.address.houseNumber);
        setZip(data.address.zip);
        setBizNumber(data.address.bizNumber);
      } catch (err) {
        const errMessage = (err as Error).message;
        setError(errMessage);
      }
    };
    fetchCard();
  }, [cardId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const updatedCard = {
        title,
        subTitle,
        description,
        image: { url: imageUrl, alt: imageAlt },
      };

      const response = await fetch(`${apiBase}/cards/${cardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCard),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update card');
      }

      navigate(`/cards/${cardId}`);
    } catch (err) {
      const errMessage = (err as Error).message;
      setError(errMessage);
    }
  };

  return (
    <div className="EditCard">
      <h3>Edit Card</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {card && (
        <Container>
           <Row>
              <Col></Col>
              <Col xs="auto" className='border border-1 rounded-3 border-secondary-subtle p-5 text-start'>
                  <Form onSubmit={handleSubmit}>
                      <Row className="mb-4 fw-bold">
                        <Form.Group as={Col}>
                           <Form.Label>Title</Form.Label>
                           <Form.Control type="text" value={title}   onChange={(e) => setTitle(e.target.value)} required />
                        </Form.Group>
                        <Form.Group as={Col}>
                           <Form.Label>Subtitle</Form.Label>
                           <Form.Control type="text" value={subTitle} onChange={(e) => setSubTitle(e.target.value)}/>
                        </Form.Group>
                      </Row>
                      <Row className="mb-4 fw-bold">
                        <Form.Group>
                           <Form.Label>Description</Form.Label>
                           <Form.Control as="textarea" rows={3}   value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                      </Row>
                      <Row className="mb-4 fw-bold">
                        <Form.Group as={Col}>
                           <Form.Label>Image URL</Form.Label>
                           <Form.Control type="textarea" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col}>
                           <Form.Label>Alt</Form.Label>
                           <Form.Control type="text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} />
                        </Form.Group>
                      </Row>
                      <Row className="mb-4 fw-bold">
                        <Form.Group as={Col}>
                           <Form.Label>Web</Form.Label>
                           <Form.Control type="text" value={web} onChange={(e) => setWeb(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col}>
                           <Form.Label>Email</Form.Label>
                           <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                      </Row>
                      <Row className="mb-4 fw-bold">
                        <Form.Group as={Col}>
                           <Form.Label>Phone</Form.Label>
                           <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col}>
                           <Form.Label>Business Number</Form.Label>
                           <Form.Control type="text" value={bizNumber} onChange={(e) => setBizNumber(e.target.value)}/>
                        </Form.Group>
                      </Row>
                      <Row className="mb-4 fw-bold">
                        <Form.Group as={Col}>
                           <Form.Label>Country</Form.Label>
                           <Form.Control type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col}>
                           <Form.Label>State</Form.Label>
                           <Form.Control type="text" value={state} onChange={(e) => setState(e.target.value)} />
                        </Form.Group>
                      </Row>
                      <Row className="mb-4 fw-bold">
                        <Form.Group as={Col}>
                           <Form.Label>City</Form.Label>
                           <Form.Control type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col}>
                           <Form.Label>Street</Form.Label>
                           <Form.Control type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
                        </Form.Group>
                      </Row>
                      <Row className="mb-4 fw-bold">
                        <Form.Group as={Col}>
                           <Form.Label>house Number</Form.Label>
                           <Form.Control type="text" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col}>
                           <Form.Label>Zip</Form.Label>
                           <Form.Control type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
                        </Form.Group>
                      </Row>
                      <Row>
                        <Form.Group>
                          <div className="text-center mt-5 d-grid"> 
                           <Button size='sm' variant="primary" type="submit"> Save Changes
                           </Button> 
                           </div>
                        </Form.Group>
                      </Row>
                 </Form>
              </Col>
            <Col></Col>
        </Row>
      </Container>
      )}
    </div>
  );
}