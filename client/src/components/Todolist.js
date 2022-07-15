import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import Todo from './Todo';
import TodoForm from './TodoForm';
import { getTodosAPI, createTodoAPI, updateTodoAPI, deleteTodoAPI } from '../services/todolistServices.js';

function Todolist() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        getTodosAPI().then(data => {
            console.log(data.data)
            data.data.sort((t1, t2) => {
                if (t1.CreatedAt < t2.CreatedAt) {
                    return -1
                } else {
                    return 1
                }
            }).reverse()

            setTodos(data.data)
        });
    }, [])

    const createTodo = todo => {
        if (!todo.text) return;

        console.log(todo)
        createTodoAPI(todo).then(data => {
            console.log(data)
            const newTodos = [data.data, ...todos];
            setTodos(newTodos)
        })
    }

    const updateTodo = (ID, newTodo) => {
        if (!newTodo.text) return;
        newTodo.ID = ID
        updateTodoAPI(newTodo).then(data => {
            const newTodos = todos.map(todo => todo.ID === newTodo.ID ? newTodo : todo);
            setTodos(newTodos);
        })
    }

    const removeTodo = ID => {
        deleteTodoAPI(ID)
        const newTodos = todos.filter(todo => todo.ID !== ID);
        setTodos(newTodos);
    }

    const completeTodo = ID => {
        const newTodos = todos.map(todo => {
            if (todo.ID === ID) {
                todo.isComplete = !todo.isComplete;
            }
            updateTodoAPI(todo)
            return todo;
        })
        setTodos(newTodos);
    }

    return (
        <Container style={{ width: "100%" }} >
            <Row md={1} >
                <Card as={Col}>
                    <Card.Body>
                        <Card.Title>Todolist</Card.Title>
                        <TodoForm
                            onSubmit={createTodo}
                            placeholder="Add todo"
                            buttonText="Add todo"
                        />
                        <Todo
                            todos={todos}
                            onComplete={completeTodo}
                            removeTodo={removeTodo}
                            updateTodo={updateTodo}
                        />
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}

export default Todolist