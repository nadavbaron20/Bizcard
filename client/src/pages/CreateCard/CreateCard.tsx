import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateICard } from '../../interfaces/CardInterfaces';
import { doCreateCard } from '../../services/CardsService';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';


const CreateCard: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [web, setWeb] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageAlt, setImageAlt] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [houseNumber, setHouseNumber] = useState<number | undefined>(undefined);
  const [zip, setZip] = useState<number | undefined>(undefined);
  const [bizNumber, setBizNumber] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleCreateCard = async () => {
    console.log('Creating card...'); 
    setLoading(true);
    setError(null);

    const newCard: Partial<CreateICard> = {
        title,
        subtitle: subTitle,
        description,
        phone,
        email,
        web,
        image: { url: imageUrl, alt: imageAlt },
        address: {
            state,
            country,
            city,
            street,
            houseNumber: houseNumber ?? 0,
            zip: zip ?? 0,
        },
        bizNumber: bizNumber ?? 0,
    };

    console.log('Card data:', newCard); 
    try {
        const result = await doCreateCard(newCard);

        console.log('Result:', result); 

        if (result.error) {
            setError(result.error);
        } else {
            navigate('/free'); 
        }
    } catch (error) {
        console.error('Error creating card:', error); 
        setError('An error occurred while creating the card.');
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="create-card-container">
     <h1>Create New Card</h1>
     {error && <p className="error">{error}</p>}
     <br></br>
     <Container>
         <Col></Col>
         <Col xs="auto" className='border border-1 rounded-3 border-secondary-subtle p-5 text-start'>
              <Form onSubmit={(e) => { 
              e.preventDefault();
              handleCreateCard();
              }}> 
                    <Row className="mb-4 fw-bold">
                       <Form.Group as={Col}>
                          <Form.Label>Title</Form.Label>
                          <Form.Control name="Title" placeholder="Title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
                       </Form.Group>
                       <Form.Group as={Col}>
                          <Form.Label>Subtitle</Form.Label>
                          <Form.Control name="Subtitle" id="subTitle" value={subTitle} placeholder="Subtitle" onChange={(e) => setSubTitle(e.target.value)} type="text" />
                       </Form.Group>
                    </Row>          
                    <Row className="mb-4 fw-bold">
                       <Form.Group>
                          <Form.Label>Description</Form.Label>
                          <Form.Control  id="description" value={description} onChange={(e) => setDescription(e.target.value)}
                             required as="textarea" rows={3} />
                       </Form.Group>
                    </Row> 
                    <Row className="mb-4 fw-bold">
                       <Form.Group as={Col}>
                          <Form.Label>Phone</Form.Label>
                          <Form.Control id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required type="text"/>
                       </Form.Group>
                       <Form.Group as={Col}>
                          <Form.Label>Email</Form.Label>
                          <Form.Control id="email" value={email} onChange={(e) => setEmail(e.target.value)} required type="email"/>
                       </Form.Group>
                    </Row>
                    <Row className="mb-4 fw-bold">
                       <Form.Group>
                          <Form.Label>Web</Form.Label>
                          <Form.Control id="web" value={web} onChange={(e) => setWeb(e.target.value)} required type="text"/>
                       </Form.Group>
                    </Row> 
                    <Row className="mb-4 fw-bold">
                       <Form.Group as={Col} md={9}>
                          <Form.Label>Image URL</Form.Label>
                          <Form.Control id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} type="text"/>
                       </Form.Group>
                       <Form.Group as={Col} md={3}>
                          <Form.Label>Image Alt Text</Form.Label>
                          <Form.Control id="imageAlt" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} type="text"/>
                       </Form.Group>
                    </Row>
                    <Row className="mb-4 fw-bold">
                       <Form.Group as={Col} md={4}>
                          <Form.Label>State</Form.Label>
                          <Form.Control id="state" value={state} onChange={(e) => setState(e.target.value)} type="text"/>
                       </Form.Group>
                       <Form.Group as={Col} md={4}>
                          <Form.Label>Country</Form.Label>
                          <Form.Control id="country" value={country} onChange={(e) => setCountry(e.target.value)} type="text"/>
                       </Form.Group>
                       <Form.Group as={Col} md={4}>
                          <Form.Label>City</Form.Label>
                          <Form.Control id="city" value={city} onChange={(e) => setCity(e.target.value)} type="text"/>
                       </Form.Group>
                    </Row>             
                    <Row className="mb-4 fw-bold">
                       <Form.Group as={Col} md={4}>
                          <Form.Label>Street</Form.Label>
                          <Form.Control id="street" value={street} onChange={(e) => setStreet(e.target.value)} type="text"/>
                       </Form.Group>
                       <Form.Group as={Col} md={4}>
                          <Form.Label>House Number</Form.Label>
                          <Form.Control id="houseNumber" value={houseNumber ?? ''} onChange={(e) => setHouseNumber(parseInt(e.target.value))} type="number"/>
                       </Form.Group>
                       <Form.Group as={Col} md={4}>
                          <Form.Label>Zip Code</Form.Label>
                          <Form.Control id="zip" value={zip ?? ''} onChange={(e) => setZip(parseInt(e.target.value))} type="number"/>
                       </Form.Group>
                    </Row>             
                    <Row className="mb-4 fw-bold">
                       <Form.Group as={Col} md={4}>
                          <Form.Label>Business Number</Form.Label>
                          <Form.Control id="bizNumber" value={bizNumber ?? ''} onChange={(e) => setBizNumber(parseInt(e.target.value))} type="number"/>
                       </Form.Group>
                    </Row>
                    <Row className="mb-12 fw-bold">
                        <Form.Group>
                           <Button variant="primary" type="submit" disabled={loading}>
                               {loading ? 'Creating...' : 'Create Card'}
                           </Button> 
                        </Form.Group> 
                    </Row>
              </Form>
         </Col>
         <Col></Col>
     </Container>
    </div>
  );
};

export default CreateCard;
