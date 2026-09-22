import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AuthModal = ({onClose}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
  };

  return (
    <>
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-8 w-96">
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={onClose} className="float-right">X</button>
        <h1 className="text-2xl font-bold mb-4">{isSignUp ? "Sign Up" : "Sign In"}</h1>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 rounded mb-3"/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border p-2 rounded mb-3"/>
        <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-lg">Submit</button>
        <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="w-full text-orange-500 mt-2 text-sm">
          {isSignUp ? "Already have an account? Sign In" : "No account? Sign Up"}
        </button>
      </form>
    </div>
  </div>
    </>
  );
};
export default AuthModal;
