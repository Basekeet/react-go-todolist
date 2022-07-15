import { Button, ButtonGroup, Col, ListGroup, Row } from 'react-bootstrap';
import React, { useState } from 'react'
import TodoForm from './TodoForm';

function Todo(props) {
    const [edit, setEdit] = useState({
        ID: null,
        text: ""
    });

    const submitUpdate = value => {
        props.updateTodo(edit.ID, value)
        setEdit({
            ID: null,
            value: ''
        })

    }

    if (edit.ID) {
        return (
            <TodoForm
                onSubmit={submitUpdate}
                placeholder="Update todo"
                buttonText="Update todo"
            />
        )
    }
    return (
        <ListGroup>
            {props.todos.map((todo, index) => (
                <ListGroup.Item variant={todo.isComplete ? "dark" : ""} key={todo.ID}>
                    <Row>
                        <Col md={8} key={todo.ID} onClick={() => props.onComplete(todo.ID)}>
                            {todo.text}
                        </Col>
                        <ButtonGroup md={4} as={Col}>
                            <Button md={2} as={Col} variant="outline-warning" onClick={() => setEdit({ ID: todo.ID, value: todo.text })}>
                                Update
                            </Button>
                            <Button md={2} as={Col} variant="outline-danger" onClick={() => props.removeTodo(todo.ID)}>
                                Delete
                            </Button>
                        </ButtonGroup>
                    </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default Todo