import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Toaster, toast } from 'react-hot-toast'; 

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

function Register() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6 || !/\W/.test(password)) {
            toast.error("Password must be at least 6 characters long and contain at least one special character");
            return;
        }

        if (!email.endsWith("@gmail.com")) {
            toast.error("Email must be a Gmail address");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // Hash the password
            const hashedPassword = await hashPassword(password);

            await addDoc(collection(db, "users"), {
                uid: userCredential.user.uid,
                firstName,
                lastName,
                email,
                password: hashedPassword 
            });

            toast.success("Account created successfully!");
            navigate('/login'); 
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    };

    // Function to hash the password
    const hashPassword = async (password) => {
        // Implement password hashing logic here using the scrypt utility or any other suitable method
        // Return the hashed password
        return password;
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="mx-auto max-w-sm">
                <div className="text-xl font-bold text-center mb-1">
                    <h1>Sign Up to Fin<span className="text-green-500">Vue</span></h1>
                </div>
                <div className="flex items-center justify-center mb-4">
                    <p>Enter your information to create an account</p>
                </div>
                <form onSubmit={handleRegister}>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input
                                    id="first-name"
                                    placeholder="Max"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input
                                    id="last-name"
                                    placeholder="Robinson"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
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
                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full bg-green-500 text-black font-bold text-0F4D0E hover:bg-green-700">
                            CREATE AN ACCOUNT
                        </Button>
                    </div>
                </form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="underline cursor-pointer">
                        Sign in
                    </Link>
                </div>
                <Toaster />
            </div>
        </div>
    );
}
    
export default Register;
