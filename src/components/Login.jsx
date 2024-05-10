import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import toast from 'react-hot-toast'; 

const firebaseConfig = {
  apiKey: "AIzaSyDoRWJ-StU751uUFka1qDgNBslu9hEaunA",
  authDomain: "inc-exp-af4c2.firebaseapp.com",
  projectId: "inc-exp-af4c2",
  storageBucket: "inc-exp-af4c2.appspot.com",
  messagingSenderId: "1050141699496",
  appId: "1:1050141699496:web:e05bfbd72c3f20b004419d",
  measurementId: "G-YYWBWQ3JYZ"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const adminUid = "hTKNRPM0jJSPJ6cRD5kN0LUlZfN2"; // Admin UID

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // Show toast notification for successful registration
          toast.success("Registration successful! You can now log in.");
        }
      });
    });
  
    return () => unsubscribe(); 
  }, [db]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user.uid === adminUid) {
        window.location.href = '/adminDashboard'; 
      } else {
        window.location.href = '/dashboard'; 
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Redirect user after successful sign-in
      if (user.uid === adminUid) {
        window.location.href = '/adminDashboard'; 
      } else {
        window.location.href = '/dashboard'; 
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <style>
        {`
          body {
            overflow: hidden;
          }
        `}
      </style>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[700px] overflow-hidden">
        <div className="flex items-center justify-center py-12 h-screen overflow-hidden">
          <div className="mx-auto grid w-[350px] gap-6 overflow-hidden">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login To Fin<span className="text-green-500">Vue</span></h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="hellocompany.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  
                </div>
                {error && <p className="text-red-500">{error}</p>} 
                <Button type="submit" className="w-full bg-green-500 text-black font-bold text-0F4D0E hover:bg-green-700">
                    LOGIN
                </Button>
                <Button 
                onClick={handleGoogleSignIn} 
                className="bg-transparent hover:bg-blue-500 text-black-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 48 48"
                className="mr-2" 
                >
                <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                CONTINUE WITH GOOGLE
              </Button>
              </div>
            </form>
            <div className="mt-1 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="underline">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
