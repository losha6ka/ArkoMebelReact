import { FC, useEffect, useState } from 'react';
import { auth, db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from "../../redux/reducers/authReducer";
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { Header } from '../header/Header';

const Auth: FC = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [isRegister, setIsRegister] = useState<boolean>(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                await user.reload(); // обновим данные (email, verified)
                if (user.emailVerified) {
                    navigate("/"); // после верификации — редирект
                }
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        } catch (error: any) {
            setError(`Login error:, ${error.message}`)
        }

    }
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            // Сохраняем никнейм в Firestore
            await setDoc(doc(db, "users", user.uid), { uid: user.uid, email: user.email, name, createdAt: new Date() })
            dispatch(setUser({ uid: user.uid, email: user.email!, name, phone: "" }))
            setIsRegister(false)
        } catch (error: any) {
            setError(`Registration error: ${error.message}`)
        }
    }

    return (
        <div>
            <Header />
            {isRegister
                ? <SignUp
                    handleSignUp={handleSignUp} error={error}
                    email={email} setEmail={setEmail}
                    password={password} setPassword={setPassword}
                    name={name} setName={setName}
                    setIsRegister={setIsRegister}
                />
                : <SignIn
                    handleSignIn={handleSignIn} error={error}
                    email={email} setEmail={setEmail}
                    password={password} setPassword={setPassword}
                    setIsRegister={setIsRegister}
                />
            }
        </div>
    )
}

export default Auth;
