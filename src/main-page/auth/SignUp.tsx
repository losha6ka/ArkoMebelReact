import { FC } from "react";

interface SignUpProps {
    handleSignUp: (e: React.FormEvent) => void;
    email: string;
    password: string;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    error: string;
    setIsRegister: (value: boolean) => void;
    name: string;
    setName: (value: string) => void;
}

export const SignUp: FC<SignUpProps> = ({
    handleSignUp,
    email,
    password,
    setEmail,
    setPassword,
    error,
    setIsRegister,
    name,
    setName
}) => {
    return (
        <div className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form onSubmit={handleSignUp} className="auth__form">
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="auth__input"
                />
                <input
                    name="name"
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Введите имя"
                    required
                    className="auth__input"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="auth__input"
                />
                <button type="submit" className="auth__button">
                    Зарегистрироваться
                </button>
            </form>
            <p className="auth__switch">
                Уже есть аккаунт?{" "}
                <button
                    onClick={() => setIsRegister(false)}
                    className="auth__link"
                >
                    Войти
                </button>
            </p>
            {error && <p className="auth__error">{error}</p>}
        </div>
    );
};
