import React, { useState } from "react";
import Modal from "../Modal/Modal";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  // ✅ handle success: close modal after login/register
  const handleSuccess = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isLogin ? (
        <>
          <LoginForm onSuccess={handleSuccess} />
          <p>
            Don&apos;t have an account?{" "}
            <button className="switch-btn" onClick={() => setIsLogin(false)}>
              Register
            </button>
          </p>
        </>
      ) : (
        <>
          <RegisterForm onSuccess={handleSuccess} />
          <p>
            Already have an account?{" "}
            <button className="switch-btn" onClick={() => setIsLogin(true)}>
              Login
            </button>
          </p>
        </>
      )}
    </Modal>
  );
};

export default AuthModal;
