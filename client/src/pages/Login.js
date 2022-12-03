import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import persistUserLogin from "../functions/persistUserLogin";
import getUserRole from "../functions/getUserRole";

const initialLoginFormData = { username: "", password: "" };

const Login = () => {
  const { userId, setUserId, userState, setUserState } = useContext(UserContext);

  const [loginFormData, setLoginFormData] = useState({ ...initialLoginFormData });

  const navigate = useNavigate();

  // Was used before i had a homepage and might use in future if needed
  // const navigateTo = (role) => {
  //   switch (role) {
  //     case "teacher":
  //       return "/board/teacher";
  //       break;
  //     case "student":
  //       return "/board/student";
  //       break;
  //     case "admin":
  //       return "/adduser";
  //     default:
  //       break;
  //   }
  // };

  // For now everyone goes to homepage
  // might use the commented our version above if i need it for a feature
  // const navigateTo = (role) => {
  //   switch (role) {
  //     case "teacher":
  //       return "/";
  //     case "student":
  //       return "/";
  //     case "admin":
  //       return "/";
  //     default:
  //       break;
  //   }
  // };

  const handleChange = (event) => {
    setLoginFormData({ ...loginFormData, [event.target.id]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = document.getElementById("form");
    const formElements = Array.from(form.elements);

    formElements.forEach((elem) => {
      elem.setAttribute("disabled", "");
    });

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginFormData)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          persistUserLogin(data.data);
          setUserState(data.data);
          setLoginFormData({ ...initialLoginFormData });
          formElements.forEach((elem) => {
            elem.removeAttribute("disabled");
          });
          alert(data.message);
          navigate("/dashboard");
        } else {
          alert(data.error);
          formElements.forEach((elem) => {
            elem.removeAttribute("disabled");
          });
          setLoginFormData({ ...initialLoginFormData });
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <Wrapper>
      <Form id="form" onSubmit={handleSubmit} autoComplete="off">
        <FormTitle>Sign In</FormTitle>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" value={loginFormData.username} onChange={handleChange} required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={loginFormData.password} onChange={handleChange} required />
        <SignInButton>Sign In</SignInButton>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10vh;
`;

const Form = styled.form`
  * {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: sans-serif;
    color: var(--primary-color);
    letter-spacing: 1px;
  }
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 2px;
  width: 17vw;
`;

const FormTitle = styled.h2`
  margin-bottom: 10px;
`;

const SignInButton = styled.button`
  background: var(--edit-color);
  color: white;
  padding: 3px 0;
  border: 1px solid var(--primary-color);
  margin-top: 20px;
  border-radius: 2px;
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
  &:disabled {
    background: var(--disabled-color);
    border: 0;
  }
`;

export default Login;
