import React from "react";
import { AuthModal } from "../../components/Auth";
import useModal from "../../hooks/useModal";
import "./Auth.css";

const Auth = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="auth-page">
      <h2>Authentication</h2>
      <button onClick={openModal}>Login / Register</button>
      <AuthModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default Auth;
