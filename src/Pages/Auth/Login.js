import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoginForm from '../../components/Auth/LoginForm';
import { motion } from 'framer-motion';
import { AccountContext } from '../../store/accountContext';
import SignUpForm from '../../components/Auth/SignUpForm';
import { useNavigate } from 'react-router-dom';

const backdropVariants = {
  expanded: {
    width: '233%',
    height: '1050px',
    borderRadius: '20%',
    transform: 'rotate(60deg)',
  },
  collapsed: {
    width: '160%',
    height: '550px',
    borderRadius: '50%',
    transform: 'rotate(60deg)',
  },
};

const expandingTransition = {
  type: 'spring',
  duration: 2.3,
  stiffness: 30,
};
const Login = () => {
  const navigate = useNavigate();
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState('signin');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/todo');
    }
  }, []);

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive('signup');
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive('signin');
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContext.Provider value={contextValue}>
      <BoxContainer>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? 'expanded' : 'collapsed'}
            variants={backdropVariants}
            transition={expandingTransition}
          />

          <HeaderContainer>
            <HeaderText>wantodo</HeaderText>
          </HeaderContainer>
          <HeaderContainer>
            <SubHeaderText>
              {active === 'signin' && <>로그인</>}
              {active === 'signup' && <>회원가입</>}
            </SubHeaderText>
          </HeaderContainer>
        </TopContainer>

        <InnerContainer>
          {active === 'signin' && <LoginForm />}
          {active === 'signup' && <SignUpForm />}
        </InnerContainer>
      </BoxContainer>
    </AccountContext.Provider>
  );
};

export default Login;

const BoxContainer = styled.div`
  width: 400px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -290px;
  left: -70px;
  background: #36f;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  z-index: 10;
  margin: 0;
  color: #fff;
`;

const SubHeaderText = styled.h3`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  z-index: 10;
  margin: 0;
  color: #fff;
  margin-top: 60px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8rem;
`;
