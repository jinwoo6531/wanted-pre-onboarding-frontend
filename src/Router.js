import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import styled from 'styled-components';
import Todo from './Pages/Todo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
`;

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
          <Route path={"*"} element={<Login/>}></Route>
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
