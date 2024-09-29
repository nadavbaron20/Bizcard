import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { CiEdit, CiTrash } from 'react-icons/ci'
import { apiBase } from '../../config'
import { doDeleteCard } from '../../services/CardsService';

interface ICard {
  _id: string
  title: string
  subTitle: string
  description: string
  image: { url: string, alt: string }
  user_id: string
  phone: string
  email: string
  web:string
  address: {
  state:string
  country:string
  city:string
  street:string
  houseNumber:string
  zip: string
  }
  bizNumber: number
}

export default function CardDetails() {

  const { cardId } = useParams()

  const [card, setCard] = useState<ICard|null>(null)
  const [error, setError] = useState<string|null>(null)
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`${apiBase}/cards/${cardId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = (await response.json()).data;
        if (!response.ok) throw new Error(data)
        setCard(data)
      } catch (err) {
        const errMessage = (err as Error).message
        setError(errMessage)
      }
    };
    fetchCard();
  },[cardId])

  const handleDelete = async () => {
    if (!cardId) return;
    const { error } = await doDeleteCard(cardId);
    if (error) {
      setError(error);
    } else {
      navigate('/free'); 
    }
  }
  
  return (
    <div className='CardDetails Page'>
      <h3>Card Details</h3>
      <br></br>

      <div>
        {
          (error) &&
            <>
              <h5>Error getting card '{cardId}' :</h5>
              <div style={{color:'red'}}>{error}</div>
            </>
        }
      </div>
      {
        (card) ?
        <Container>
          
          <Row className="g-5">
              <Col>
                <Card className="text-center">
                  <Card.Header style={{fontWeight:'800' , fontSize:'20px'}}>{card.title}</Card.Header>
                  <Card.Body>
                    <Card.Img variant="top" src={card.image.url} style={{height:'200px',objectFit:'cover'}}/>
                    <Card.Title>{card.subTitle}</Card.Title>
                    <Card.Text>{card.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                  <Button variant="primary" size="sm" className="mx-3" onClick={() => navigate(`/cards/${cardId}/edit`)} > <CiEdit  className="me-1" size={22} style={{ marginTop: '-5px' }} /> Edit Card </Button>
                    <Button variant="danger" size="sm" className="mx-3" onClick={handleDelete}>
                    <CiTrash className="me-1" size={22} style={{ marginTop: '-5px' }} /> Delete Card
                  </Button>
                  </Card.Footer>
                </Card>
              </Col>
              <Col className='border rounded'>
                   <Card.Header style={{fontWeight:'800', fontSize:'30px', marginBottom:'10px'}}>Contact Us</Card.Header>
                   <Row>
                     <Card.Body as={Col}>
                       <div className="d-flex">
                         <Card.Title className="me-2 mb-2">Web Site:</Card.Title>
                         <Card.Text><a href={card.web} target="_blank">{card.web}</a></Card.Text>
                       </div>
                       <div className="d-flex">
                         <Card.Title className="me-2 mb-2">Email:</Card.Title>
                         <Card.Text>{card.email}</Card.Text>
                       </div>
                     </Card.Body>
                   </Row>
                   <Row>
                     <Card.Body as={Col}>
                       <div className="d-flex"> 
                         <Card.Title className="me-2 mb-2">Phone:</Card.Title>
                         <Card.Text>{card.phone}</Card.Text>
                       </div>
                     </Card.Body>
                     <Card.Body as={Col}>
                       <div className="d-flex"> 
                         <Card.Title className="me-2 mb-2">Bussniss Number:</Card.Title>
                         <Card.Text>{card.bizNumber}</Card.Text>
                        </div> 
                     </Card.Body>
                   </Row>
                   <Row>
                     <Card.Body as={Col}>
                       <div className="d-flex "> 
                         <Card.Title className="me-2 mb-2">Country:</Card.Title>
                         <Card.Text>{card.address.country}</Card.Text>
                        </div>
                        <div className="d-flex">
                         <Card.Title className="me-2 mb-2">State:</Card.Title>
                         <Card.Text>{card.address.state}</Card.Text>
                        </div> 
                     </Card.Body>
                   </Row>
                   <Row>
                     <Card.Body as={Col}>
                        <div className="d-flex">
                          <Card.Title className="me-2 mb-2">City:</Card.Title>
                          <Card.Text>{card.address.city}</Card.Text>
                        </div>
                        <div className="d-flex"> 
                          <Card.Title className="me-2 mb-2">house Number:</Card.Title>
                          <Card.Text>{card.address.houseNumber}</Card.Text>
                        </div> 
                     </Card.Body>
                   </Row>
                                  
              </Col>

          </Row>
        </Container>
          :
          null
      }

    </div>
  )
}
