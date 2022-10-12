import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { API } from '../../api';

const TodoForm = ({
  todo,
  setTodo,
  todos,
  setTodos,
  btnValue,
  modifyId,
  modifyIsCompleted,
  getTodos,
  setBtnValue,
}) => {
  const token = localStorage.getItem('token');
  const onInputChange = (e) => {
    setTodo(e.target.value);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (btnValue === '등록') {
      await axios
        .post(
          API.TODO,
          { todo },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setTodos([
            ...todos,
            {
              id: response.data.id,
              todo: response.data.todo,
              isCompleted: response.data.isCompleted,
              userId: response.data.userId,
            },
          ]);
          setTodo('');
        })
        .catch((error) => console.log(error));
    } else {
      await axios
        .put(
          `${API.TODO}/${modifyId}`,
          {
            todo,
            isCompleted: modifyIsCompleted,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          getTodos();
          setBtnValue('등록');
          setTodo('');
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <Form onSubmit={onFormSubmit}>
        <Input
          type="text"
          placeholder="Enter a todo"
          required
          value={todo}
          onChange={onInputChange}
        />
        <AddButton type="submit">{btnValue}</AddButton>
      </Form>
    </>
  );
};

export default TodoForm;

const Form = styled.form`
  display: flex;
`;

const Input = styled.input`
  outline: none;
  width: 260px;
  padding: 15px;
  margin-right: 25px;
  font-size: 20px;
  color: #ccc;
  background-color: #000000;
  border: 1px solid #c89666;
  border-radius: 10px;
`;

const AddButton = styled.button`
  width: 70px;
  padding: 15px 15px;
  font-size: 20px;
  border-radius: 10px;
  border: 0;
  background-color: #f1aff1;
  cursor: pointer;
`;
