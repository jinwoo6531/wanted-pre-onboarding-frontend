import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../../api';
import TodoForm from '../../components/Todo/TodoForm';
import TodoList from '../../components/Todo/TodoList';

const Todo = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [todo, setTodo] = useState('');
  const [editTodo, setEditTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [btnValue, setBtnValue] = useState('등록');
  const [modifyId, setModifyId] = useState(null);
  const [modifyIsCompleted, setModifyIsCompleted] = useState(null);

  // const getTodos = () => {
  //   axios
  //     .get(API.TODO, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       setTodos(response.data);
  //     })
  //     .catch((error) => alert('LIST를 불러오는데 실패했습니다.'));
  // };

  const getTodos = useCallback(
    () => {
      axios
      .get(API.TODO, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => alert('LIST를 불러오는데 실패했습니다.'));
    },
    [token],
  )
  

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
    getTodos();
  }, [navigate,getTodos]);

  return (
    <Container>
      <Wrapper>
        <div>
          <Header>Todo List</Header>
        </div>

        <div>
          <TodoForm
            todo={todo}
            setTodo={setTodo}
            todos={todos}
            setTodos={setTodos}
            btnValue={btnValue}
            getTodos={getTodos}
            modifyId={modifyId}
            modifyIsCompleted={modifyIsCompleted}
            setBtnValue={setBtnValue}
          />
        </div>

        <div>
          <TodoList
            setTodo={setTodo}
            todos={todos}
            setTodos={setTodos}
            getTodos={getTodos}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
            setBtnValue={setBtnValue}
            setModifyId={setModifyId}
            setModifyIsCompleted={setModifyIsCompleted}
          />
        </div>
      </Wrapper>
    </Container>
  );
};

export default Todo;

const Container = styled.div`
  /* background-color: aquamarine; */
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  background-color: #12343b;
  min-width: 450px;
  min-height: 650;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 3px 6px 40px #000;
  margin-bottom: 10px;
`;

const Header = styled.h1`
  color: #fff;
  text-align: center;
  margin: 30px 0;
`;
