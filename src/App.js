import logo from './logo.svg';
import './App.css';
import { Container, Form, Button } from 'react-bootstrap';
import TodoRow from './TodoRow';
import { useEffect, useState } from 'react';
import { json } from 'react-router-dom';

function App() {
  
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [todos, setTodos] = useState([]);
  const [x, setX] = useState(1);
  let rand = Math.floor(Math.random() * 100000)

  
  const testTodos = [
    {title: "Aaaaa", date: "11/15/5252", time:"15:31PM"},
    {title: "feafe", date: "11/16/5252", time:"16:31PM"},
  ]

  // const getTodos = () => {
  //   fetch('https://1o7cy52iw3.execute-api.us-east-2.amazonaws.com/tasks')
  //   .then((res) => res.json())
  //   .then((res) => {
  //     setTodos(res.Items);
  //   },
  //   (error) => { alert(error); console.log(error); }
  //   )};

  // useEffect(() => {
  //   getTodos()
  // },[]);
  // console.log(todos)

  const handleSubmit = () => {
    fetch('https://1o7cy52iw3.execute-api.us-east-2.amazonaws.com/tasks', {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Allow-Access-Control-Origin":"*"
      },
      body: JSON.stringify({
        todoID: rand,
        title: title,
        date: date,
        time: time,
      })
    });
  }

  return (
    <Container className='bg-dark'>
      <Container className='d-flex rounded p-3 justify-content-center'>
        <Form className="d-flex align-items-end">  
          <Form.Group className='mx-2'>
            <Form.Label>To Do</Form.Label>
            <Form.Control onChange={(e) => setTitle(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group className='mx-2'>
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" onChange={(e) => setDate(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group className='mx-2'>
            <Form.Label>Time</Form.Label>
            <Form.Control type="time" onChange={(e) => setTime(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group className='mx-2'>
            <Button onClick={() => handleSubmit()}>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
      <Container className='mt-3'>
        {(todos !== undefined) ? (
          todos.map(t => 
            <TodoRow todo={t} key={Math.random()} />
          )
        ):(
          testTodos.map(t => 
            <TodoRow todo={t} key={Math.random()} />
          )
        )}
      </Container>
    </Container>
      
  );
}

export default App;
