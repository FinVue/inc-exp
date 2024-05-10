import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Image from '@/assets/side-image.jpeg'

const firebaseConfig = {
    apiKey: "AIzaSyDoRWJ-StU751uUFka1qDgNBslu9hEaunA",
    authDomain: "inc-exp-af4c2.firebaseapp.com",
    projectId: "inc-exp-af4c2",
    storageBucket: "inc-exp-af4c2.appspot.com",
    messagingSenderId: "1050141699496",
    appId: "1:1050141699496:web:e05bfbd72c3f20b004419d",
    measurementId: "G-YYWBWQ3JYZ"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const adminUid = "hTKNRPM0jJSPJ6cRD5kN0LUlZfN2"; // Admin UID

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(true); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user.uid === adminUid) {
        window.location.href = '/adminDashboard'; 
      } else {
        setIsAdmin(false); 
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
            <h1 className="text-3xl font-bold">Login</h1>
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
                  placeholder="johndoe@email.com"
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500">{error}</p>} 
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="underline">Sign up</Link>
          </div>
        </div>
      </div>
      <img
        src={Image}
        alt="Image"
        className="h-screen w-full object-cover dark-mode-img"
      />
    </div>
    </>
  );
}

export default Login;