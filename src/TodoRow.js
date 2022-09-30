import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import format from "date-fns/format";
import check from "./Images/check.png";
import edit from "./Images/edit.png";

export default function TodoRow(props){

    const [editing, setEditing] = useState(false);
    const [id, setId] = useState(props.todo.todoID);
    const [title, setTitle] = useState(props.todo.title);
    const [date, setDate] = useState(props.todo.date);
    const [time, setTime] = useState(props.todo.time);

    console.log(props);
    console.log(editing);

    var dateAndTime = format(new Date(date + " " + time), "MM/dd/yyyy hh:mma");
    let newDateAndTime = dateAndTime.split(" ");
    newDateAndTime[1] = newDateAndTime[1].substring(0, 5) + " " + newDateAndTime[1].substring(5, newDateAndTime[1].length)
    if(newDateAndTime[1].charAt(0) === "0"){
        newDateAndTime[1] = newDateAndTime[1].slice(1);
    }

    return(
        <>
        {editing ? (
            <Row className="todorow d-flex justify-content-between">
                <Col className="col-10">
                    <Row className="d-flex">
                        <Col className="col-12">
                            <Form.Control value={title} onChange={(e) => setTitle(e.target.value)}></Form.Control>
                        </Col>
                        <Col className="col-12 col-md-6 col-lg-3">
                            <Form.Control type="date" value={date ? format(new Date(date), "yyyy-MM-dd") : '2022-01-01'} onChange={(e) => setDate(e.target.value)} ></Form.Control>
                        </Col>
                        <Col className="col-12 col-md-6 col-lg-3 text-start ">
                            <Form.Control type="time" value={time ? time : '12:12'} onChange={(e) => setTime(e.target.value)} ></Form.Control>
                        </Col>
                    </Row>
                </Col>
                <Col className="btncol col-2 d-flex flex-column align-items-end justify-content-start">
                    <button onClick={() => {
                        props.handleUpdate(id, title, date, time); 
                        setEditing(!editing);
                        }}>
                        <img className="editIcon" src={edit} width={44} />
                    </button>
                    <button onClick={() => props.handleDelete(id)}>
                        <img className="checkIcon" src={check} width={44} />
                    </button>
                </Col>
            </Row>
            ) : (
            <Row className="todorow d-flex justify-content-between">
                <Col className="col-10">
                    <Row className="d-flex">
                        <Col className="col-12">
                            <h2 className="title">{title}</h2>
                        </Col>
                        <Col className="col-auto">
                            <h4 className="subtext">Due at: </h4>
                        </Col>
                        <Col className="col-auto">
                            <h4 className="subtext">{`${newDateAndTime[0]} - ${newDateAndTime[1]}`}</h4>
                        </Col>
                    </Row>
                </Col>
                <Col className="btncol col-2 d-flex flex-column align-items-end justify-content-start pb-2">
                    <button onClick={() => setEditing(!editing)}>
                        <img className="editIcon" src={edit} width={44} />
                    </button>
                    <button onClick={() => props.handleDelete(id)}>
                        <img className="checkIcon" src={check} width={44} />
                    </button>
                </Col>
            </Row>
        )}
        </>
    );
}