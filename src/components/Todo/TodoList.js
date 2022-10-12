import React from 'react';
import styled from 'styled-components';
import {
  AiOutlineCheckCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from 'react-icons/ai';
import axios from 'axios';
import { API } from '../../api';

const TodoList = ({
  todos,
  setTodos,
  getTodos,
  editTodo,
  setEditTodo,
  setTodo,
  setBtnValue,
  modifyTodo,
  setModifyId,
  setModifyIsCompleted,
}) => {
  const token = localStorage.getItem('token');

  //deleteTodo
  const handleDelete = async (id) => {
    await axios
      .delete(`${API.TODO}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        getTodos();
      })
      .catch((error) => {
        alert('삭제를 실패했습니다.');
      });
  };

  //updateTodo
  const handleComplete = async (todo, isCompleted, id) => {
    await axios
      .put(
        `${API.TODO}/${id}`,
        {
          todo,
          isCompleted: !isCompleted,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => getTodos())
      .catch((error) => console.log(error));
  };

  const handleModify = (todo, id, isCompleted) => {
    setTodo(todo);
    setBtnValue('수정');
    setModifyId(id);
    setModifyIsCompleted(isCompleted);
  };
  return (
    <>
      {todos.map((todo) => (
        <>
          <Li key={todo.id}>
            <List
              type="text"
              value={todo.todo}
              onChange={(e) => e.preventDefault()}
            />

            <div>
              <Button>
                <AiOutlineCheckCircle
                  className={`completed-button  ${
                    todo.isCompleted ? 'success' : 'fail'
                  }`}
                  onClick={() =>
                    handleComplete(todo.todo, todo.isCompleted, todo.id)
                  }
                />
              </Button>
              <Button>
                <AiOutlineEdit
                  className="completed-button"
                  onClick={() =>
                    handleModify(todo.todo, todo.id, todo.isCompleted)
                  }
                />
              </Button>
              <Button>
                <AiOutlineDelete
                  className="completed-button"
                  onClick={() => handleDelete(todo.id)}
                />
              </Button>
            </div>
          </Li>
        </>
      ))}
    </>
  );
};

export default TodoList;

const Li = styled.li`
  display: flex;
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
`;

const List = styled.input`
  width: 220px;

  background-color: #12343b;
  border: none;
  color: #fff;
  font-size: 30px;
  padding-left: 10px;
  margin-right: 15px;
`;

const Button = styled.button`
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  font-size: 20px;
  border-radius: 50%;

  .completed-button {
    font-size: 2rem;
    font-weight: 200;
    cursor: pointer;
    &.success {
      color: #19ce60;
    }
  }
`;
