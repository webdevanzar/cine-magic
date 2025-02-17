import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input/Input";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

export const Login = () => {
  const { login, setAuth, isSubmitting, setIsSubmitting } = useAuth();
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      toast.dismiss();
      const toastId = toast.loading("Please wait....");
      await login(username, password);
      setPassword("");
      setUserName("");
      toast.update(toastId, {
        render: "Logined successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setIsSubmitting(false);
      navigate("/");
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
          <form noValidate onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <Input
              name="username"
              type="text"
              placeholder="userName"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button disabled={isSubmitting} type="submit">
              Sign In
            </button>

            <p className="last-p">
              <span>New to Cine-magic?</span>
              <Link className="link" to="/signup">
                Sign up now.
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
    </div>
  );
};
