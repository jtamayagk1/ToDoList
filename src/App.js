import logo from './logo.svg';
import './App.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import TodoRow from './TodoRow';
import { useEffect, useState } from 'react';
import { json } from 'react-router-dom';
import UserPool from './UserPool';
import { wait } from '@testing-library/user-event/dist/utils';

function App() {
  
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [todos, setTodos] = useState([]);
  
  let rand = Math.floor(Math.random() * 100000)

  
  const testTodos = [
    {todoID: rand, title: "Aaaaa aveave a fenane ennene alklavnela; fenlenljkea faena klen;lke eelknke anvep kanfienvn ken'anfea", date: "2022-09-2", time:"15:31"},
    {todoID: rand, title: "feafe faveave", date: "2022-11-3", time:"16:31"}
  ]

  const getTodos = async () => {
    await fetch('https://1o7cy52iw3.execute-api.us-east-2.amazonaws.com/tasks')
    .then((res) => res.json())
    .then((res) => {
      setTodos(res.Items);
      
    },
    (error) => { alert(error); console.log(error); },
    )};
    

  useEffect(() => {
    getTodos();
  },[]);

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
    }).then(getTodos());
  }

  const handleUpdate = (id, title, date, time) => {
    // fetch('https://1o7cy52iw3.execute-api.us-east-2.amazonaws.com/tasks', {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     "Allow-Access-Control-Origin":"*"
    //   },
    //   body: JSON.stringify({
    //     todoID: rand,
    //     title: title,
    //     date: date,
    //     time: time,
    //   })
    // });
    console.log(id + " " + title + " " + date + " " + time)
  }

  const handleDelete = (id) => {
    console.log(id)
    fetch('https://1o7cy52iw3.execute-api.us-east-2.amazonaws.com/tasks/{task}', {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        todoID: id,
        userID: "108.226.132.7"
      })
    });
    
    console.log(id)
  };

  return (
    <Container className='todocontainer'>
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
            <Button className='submitbtn' onClick={() => handleSubmit()}>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
      <Container className='mt-3 py-4 px-4 d-flex-inline'>
        {(todos !== undefined) ? (
          todos.map(t => 
            <TodoRow 
              handleUpdate={handleUpdate} 
              handleDelete={handleDelete}
              todo={t} 
              key={Math.random()} />
          )
        ):(
          testTodos.map(t => 
            <TodoRow 
              handleUpdate={handleUpdate} 
              handleDelete={handleDelete}
              todo={t} key={Math.random()} 
              setTitle={setTitle} 
              setDate={setDate} 
              setTime={setTime} />
          )
        )}
      </Container>
    </Container>
      
  );
}
export default App;
