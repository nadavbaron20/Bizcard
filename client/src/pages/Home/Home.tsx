import { useContext } from 'react'
import { ToastsContext } from '../../context/ToastsContext'

export default function Home() {

  const toasts = useContext(ToastsContext)

  return (
    <div className='Home Page'>
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold pb-3">CLOSE THIS PAGE</h1>
          <h3 className='pb-3'>IF YOU CAN'T HANDLE MORE CUSTOMERS.</h3>
          <div className="col-md-6 fs-4 mx-auto pb-4">Welcome to our web site for Business Search .

We are here to assist you finding information and data sources, 
regarding the business you are looking for.

Using our tool, could help you reach a wide range of knowledge regarding businesses,
including addresses, phone numbers, feedbacks, pictures and more

Please type the search words for the business or service you are looking for
In the search box and click "SEARCH" .

We shall provide you with exact results, 
delivering specified knowledge in order to reach rational decisions .

We hope the site will satisfy your needs and support local businesses 
For any questions or assistance, please reach us and we shall come forward .
</div>
          <div className="col-md-6 fs-4 mx-auto pb-4">Help them out 😍 Create your FREE business card NOW.</div>
          <button className="btn btn-primary btn-lg" type="button" onClick={()=>toasts?.addToast("🍺","Wazzzup ?","Here's a toast for you 😄","primary")}>Click here to make a Toast !</button>
      </div>
    </div>
  )
}
