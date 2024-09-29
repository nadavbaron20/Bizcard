import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastsContext } from '../../context/ToastsContext';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { IUserSignup } from '../../interfaces/UserInterfaces';
import { shcemaIUserSignup } from '../../schemas/IUserSchemas';

export default function SignUp() {

  const auth = useContext(AuthContext);
  const toasts = useContext(ToastsContext)
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IUserSignup>(
    {
      name: {
        first: '',
        last: '',
      },
      phone: '',
      email: '',
      password: '',
      image: {
        url: 'https://cdns-images.dzcdn.net/images/artist/300b1c998b93b8a62b050a4b10b14b12/264x264.jpg',
        alt: 'Profile',
      },
      address: {
        country: '',
        city: '',
        street: '',
        houseNumber: 0,
        zip: '',
      },
      isBusiness: false,
    }
  )
  const [passwordVerification, setPasswordVerification] = useState('')
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split('.');

    setFormData((prevState) => {
        const updateNestedObject = (obj: any, path: string[], val: any): any => {
        const key = path[0];
        if (path.length === 1) {
          obj[key] = val;
          return obj;
        }
        if (!obj[key] || typeof obj[key] !== 'object') obj[key] = {};
        obj[key] = updateNestedObject(obj[key], path.slice(1), val);
        return obj;
      };

      let updatedValue;
      if (type === 'checkbox') {
        updatedValue = checked; 
      } else if (type === 'number') {
        updatedValue = Number(value); 
      } else {
        updatedValue = value; 
      }

      const updatedState = { ...prevState };
      updateNestedObject(updatedState, keys, updatedValue);

      return updatedState;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBusy(true)
    const { error:joiError } = shcemaIUserSignup.validate( {...formData, confirmPassword:passwordVerification } , { abortEarly: true })
    if (joiError) {
      const validationMessages = joiError.details.map(detail => detail.message)
      toasts?.addToast('⚠️', 'Validation Error', validationMessages.join(', '), 'danger')
      setIsBusy(false)
      return
    }
    if (!auth) { setIsBusy(false); return }
    const { error } = await auth?.signUp(formData)
    if (error) {
      toasts?.addToast('⚠️', 'Error Signing-Up', error, 'danger')
    } else {
      toasts?.addToast('👍🏼', 'Successfully Signed-Up', `Please sign in with your credentials.`, 'success')
      navigate('/signin')
    }
    setIsBusy(false)
  }

  return (
    <div className='SignUp Page'>
      <h3>Sign-Up Page</h3>
      <br></br>

      <Container>
        <Row>
          <Col></Col>
          <Col xs="auto" className='border border-1 rounded-3 border-secondary-subtle p-5 text-start'>
            <Form onSubmit={handleSubmit}>

              <Row className="mb-4 fw-bold">
                <Form.Group as={Col}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name.first" value={formData.name.first} placeholder="First name" onChange={handleChange} type="text" />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control name="name.last" value={formData.name.last} placeholder="Last name" onChange={handleChange} type="text" />
                </Form.Group>
              </Row>
              <Row className="mb-4 fw-bold">
                <Form.Group as={Col}>
                  <Form.Label>Phone & Email</Form.Label>
                  <Form.Control name="phone" value={formData.phone} placeholder="Phone number" onChange={handleChange} type="phone" />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control name="email" value={formData.email} placeholder="Email address" onChange={handleChange} type="text" />
                </Form.Group>
              </Row>
              <Row className="mb-4 fw-bold">
                <Form.Group>
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control name="image.url" value={formData.image.url} placeholder="Image URL" onChange={handleChange} type="text" />
                </Form.Group>
              </Row>
              <Row className="mb-4 fw-bold">
                <Form.Group as={Col}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="password" value={formData.password} placeholder="Password" onChange={handleChange} type="password" />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control value={passwordVerification} placeholder="Password again" onChange={(e) => setPasswordVerification(e.target.value)} type="password" />
                </Form.Group>
              </Row>
              <Row className="fw-bold">
                <Form.Group as={Col}>
                  <Form.Label>Address</Form.Label>
                  <Form.Control name="address.country" value={formData.address.country} placeholder="Country" onChange={handleChange} type="text" />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control name="address.city" value={formData.address.city} placeholder="City" onChange={handleChange} type="text" />
                </Form.Group>
              </Row>
              <Row className="mb-4">
                <Form.Group as={Col}>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control name="address.street" value={formData.address.street} placeholder="Street" onChange={handleChange} type="text" />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control name="address.houseNumber" value={formData.address.houseNumber} placeholder="House number" onChange={handleChange} type="number" />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control name="address.zip" value={formData.address.zip} placeholder="Zip code" onChange={handleChange} type="text" />
                </Form.Group>
              </Row>
              <Row className="mt-4 fw-bold">
                <Form.Label>SignUp as a Business ?</Form.Label>
              </Row>
              <Row className="mt-1">
                <Form.Group className="mb-5">
                  <Form.Check name="isBusiness" checked={formData.isBusiness} onChange={handleChange} type="checkbox" label="Yes" />
                </Form.Group>
              </Row>
              <Row className="fw-bold border-bottom"></Row>
              <Row>
                <Col></Col>
                <Col>
                  <div className="text-center mt-5 d-grid">
                    <Button type='submit' variant='primary' size='sm' disabled={isBusy}>
                      {
                        (isBusy) &&
                        <Spinner
                          className='me-3'
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      }
                      Sign Up
                    </Button>
                  </div>
                </Col>
                <Col></Col>
              </Row>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>

    </div>
  )
}
