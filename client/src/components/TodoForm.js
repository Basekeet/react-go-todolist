import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';

function TodoForm(props) {
    const [input, setInput] = useState('')

    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.onSubmit({
            text: input,
            isComplete: false
        })
        setInput('')
    }

    return (
        <Form onSubmit={handleSubmit} className="todoform-form">
            <Form.Control
                md={1}
                placeholder={props.placeholder}
                value={input}
                onChange={handleChange}
                name='text'
            />
            <Button
                className="todoform-button"
                md={{ span: 1, offset: 4 }}
                // md={2}
                variant="outline-success" onClick={handleSubmit}>
                {props.buttonText}
            </Button>
        </Form>
    )
}

export default TodoForm