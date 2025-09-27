import { FC, useEffect, useState } from "react";
import {
    getAuth,
    sendEmailVerification,
    EmailAuthProvider,
    reauthenticateWithCredential,
    verifyBeforeUpdateEmail, // ← добавили
    // reload,                  // ← пригодится обновить user после подтверждения
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const ChangeEmail: FC<{ setChangeEmail: any }> = ({ setChangeEmail }) => {
    const auth = getAuth();
    const user = auth.currentUser;

    const [newEmail, setNewEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate()

    const actionCodeSettings = {
        url: `${window.location.origin}/auth`,
        handleCodeInApp: true, // если обрабатываешь в SPA
    };

    const handleVerifyEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        const user = auth.currentUser;
        if (!user) return;

        if (!user.emailVerified) {
            try {
                await sendEmailVerification(user, actionCodeSettings);
                setMessage(`Письмо подтверждения отправлено на ${user.email}`);
            } catch (error: any) {
                setMessage("Ошибка при отправке письма: " + error.message);
            }
        } else {
            setMessage("Email уже подтверждён ✅");
        }
    };

    const handleChangeEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setLoading(true)

        const user = auth.currentUser;
        if (!user) return;

        if (!newEmail || !newEmail.includes("@")) {
            setMessage("Введите корректный email");
            return;
        }
        if (user.email && newEmail.trim().toLowerCase() === user.email.toLowerCase()) {
            setMessage("Новый email совпадает с текущим");
            return;
        }

        try {
            // 1) переаутентификация паролем
            if (!user.email) throw new Error("Текущий email отсутствует");
            const cred = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, cred);

            // 2) отправляем письмо на НОВЫЙ email и откладываем смену до подтверждения
            await verifyBeforeUpdateEmail(user, newEmail, actionCodeSettings);

            setMessage(
                `Мы отправили ссылку для подтверждения на ${newEmail}. ` +
                "После перехода по ссылке вам нужно будет повторно войти в аккаунт."
            );
            // setChangeEmail(false)
        } catch (error: any) {
            // частые коды: auth/requires-recent-login, auth/invalid-continue-uri, auth/unauthorized-continue-uri

            setMessage("Ошибка: " + error.message);
        }
    };
    useEffect(() => {
        if (!user?.emailVerified && loading) {
            navigate("/auth")
        }
    }, [user, navigate, loading])

    return (
        <div className="form-email-change">
            <div className="profile__item-email profile__item-intitle">
                <div className="profile__item-type">E-mail*</div>
                <div className="profile__item-column">
                    <div className="profile__item-redact">
                        <input
                            type="email"
                            placeholder="Новый email"
                            className="profile__item-input"
                            autoFocus
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </div>
                    {user?.email !== newEmail && (<div className="profile__item-redact">
                        <input
                            type="password"
                            placeholder="Пароль для подтверждения"
                            className="profile__item-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>)}

                    {message && <p style={{ marginTop: "10px" }}>{message}</p>}
                    <div className="profile__btn-box">
                        {user?.email !== newEmail
                            ? (<button className={`profile__savechange ${loading ? 'disabled' : ''}`} onClick={handleChangeEmail} disabled={loading}>
                                Обновить email
                            </button>)
                            : !user.emailVerified ?
                                (<button className="profile__savechange" onClick={handleVerifyEmail}>
                                    Подтвердить email
                                </button>)
                                : (<button className={`profile__savechange disabled`} disabled>
                                    Обновить email
                                </button>)
                        }
                        <button className="profile__savechange" onClick={() => setChangeEmail(false)}>
                            Отмена
                        </button>
                    </div>
                </div>
            </div >
        </div>
    );
};
