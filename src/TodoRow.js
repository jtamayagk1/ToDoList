import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function TodoRow(props){
    return(
        <Container className="py-2 px-5">
            <Row className="align-items-center border-top pt-2">
                <Col className="col-6">
                    <h2>{props.todo.title}</h2>
                </Col>
                <Col className="col-3">
                    <h2>{props.todo.date}</h2>
                </Col>
                <Col className="col-3">
                    <h2>{props.todo.time}</h2>
                </Col>
            </Row>
        </Container>
    );
}