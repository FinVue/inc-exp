import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import toast from 'react-hot-toast'; // Import toast from react-hot-toast

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
  
    return () => unsubscribe(); // Unsubscribe from Firestore listener on component unmount
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
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
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
