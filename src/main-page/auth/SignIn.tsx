import { FC } from "react";

interface SignInProps {
    handleSignIn: (e: React.FormEvent) => void;
    email: string;
    password: string;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    error: string;
    setIsRegister: (value: boolean) => void;
}

export const SignIn: FC<SignInProps> = ({
    handleSignIn,
    email,
    password,
    setEmail,
    setPassword,
    error,
    setIsRegister
}) => {
    return (
        <div className="auth">
            <h2 className="auth__title">Вход</h2>
            <form onSubmit={handleSignIn} className="auth__form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="auth__input"
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="auth__input"
                />
                <button type="submit" className="auth__button">
                    Войти
                </button>
            </form>
            <p className="auth__switch">
                У вас нет аккаунта?{" "}
                <button
                    onClick={() => setIsRegister(true)}
                    className="auth__link"
                >
                    Зарегистрироваться
                </button>
            </p>
            {error && <p className="auth__error">{error}</p>}
        </div>
    );
};
