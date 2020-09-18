import React, {useState} from 'react';
import './App.css';
import { Form, Checkbox, Button, Header } from 'semantic-ui-react';
import Axios from 'axios';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [agreement, setAgreement] = useState(false)
  const [message, setMessage] = useState('')
  const userObj = {
    name: name,
    email: email,
    birthDate: birthDate,
    emailConsent: agreement
  }

  const clear = () => {
    setName('')
    setEmail('')
    setBirthDate('')
    setAgreement(false)
  }

  const handleSubmit = () => {
    Axios.post('https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users', userObj)
    .then(res => {
      res.status === 201 && setMessage(`Thank you ${name} for your submission!`);
      clear()
      setTimeout(()=>setMessage(''), 4000)
    })
    .catch(err=> setMessage(err.message))
  }

  return (
    <div className="App">
      {message !=='' && <div key={name} className="message">{message}</div>}
      <div className="formOutline">
        <Form onSubmit={handleSubmit}>
          <Header as="h1">Contact Us</Header>
          <Form.Field>
            <label>Name</label>
            <input 
            placeholder='Name' 
            value={name} 
            name="name" 
            onChange={(e) => setName(e.target.value)}
            required
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input 
            placeholder='Email' 
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email" 
            required
            />
          </Form.Field>
          <Form.Field>
            <label>Birthdate</label>
            <DatePicker 
            placeholderText="Birthdate"
            showYearDropdown
            dateFormatCalendar="MMMM"
            yearDropdownItemNumber={50}
            scrollableYearDropdown
            width="100%"
            selected={new Date()}            
            value={birthDate} 
            name="date" 
            onChange={(date) => setBirthDate(date)} 
            />
          </Form.Field>
          <Form.Field>
            <Checkbox 
            checked={agreement}
            label='I agree to the be contacted via email.' 
            value={agreement} 
            onClick={()=>setAgreement(!agreement)}
            />
          </Form.Field>
          {name !== '' && email !== '' && agreement === true ? <Button type='submit'>Submit</Button> : <Button disabled>Submit</Button> }
          <Button onClick={()=> clear()}>Clear</Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
