import { useState } from "react";
import { Input } from "../../components/input/Input";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const { signup, isSubmitting, setIsSubmitting } = useAuth();
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      toast.dismiss()
      const toastId = toast.loading("Please wait");
      await signup(username, password);
      setPassword("");
      setUserName("");
      toast.update(toastId, {
        render: "Uploaded successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setIsSubmitting(false)
      navigate("/login");
    } catch (error) {
      setIsSubmitting(false);
      setPassword("");
      setUserName("");
      toast.dismiss();
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-container-contents">
        <div className="form-container">
          <form onSubmit={handleSubmit} noValidate>
            <h1>Sign Up</h1>
            <Input
              name="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
              type="password"
              placeholder="Enter password"
            />

            <button disabled={isSubmitting} type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
    </div>
  );
};
