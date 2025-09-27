import { FC, useState } from "react";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react"; // Можно любые SVG
import { auth } from "../../firebase/firebase";

export const ChangePasswordForm: FC<{ setChangePass: any }> = ({ setChangePass }) => {
    const [oldPassword, setOldPassword] = useState<any>("");
    const [newPassword, setNewPassword] = useState<any>("");
    const [confirmPassword, setConfirmPassword] = useState<any>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [showOld, setShowOld] = useState<boolean>(false);
    const [showNew, setShowNew] = useState<boolean>(false);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage(null);
        if (!oldPassword || !newPassword || !confirmPassword) {
            setMessage("Заполните все поля");
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage("Новые пароли не совпадают");
            return;
        }
        if (newPassword.length < 6) {
            setMessage("Пароль должен быть не менее 6 символов");
            return;
        }

        try {
            setLoading(true);
            const user = auth.currentUser;
            if (!user || !user.email) throw new Error("Пользователь не авторизован");

            // Реавторизация с помощью старого пароля
            const credential = EmailAuthProvider.credential(user.email, oldPassword);
            await reauthenticateWithCredential(user, credential);

            // Обновление пароля
            await updatePassword(user, newPassword);

            setMessage("Пароль успешно изменён");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setChangePass(false)
        } catch (error: any) {
            setMessage(error.message || "Ошибка при смене пароля");
        } finally {
            setLoading(false);
        }
    };

    return (<div className="profile__item-pass profile__item-intitle">
        <div className="profile__item-type">Пароль*</div>

        <div className="profile__item-column">
            <div className="profile__item-redact">
                <input
                    type={showOld ? "text" : "password"}
                    autoFocus
                    className="profile__item-input"
                    placeholder="Текущий пароль"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="profile__toggle-pass"
                    onClick={() => setShowOld((prev) => !prev)}
                >
                    {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            <div className="profile__item-redact">
                <input
                    type={showNew ? "text" : "password"}
                    className="profile__item-input"
                    placeholder="Новый пароль"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="profile__toggle-pass"
                    onClick={() => setShowNew((prev) => !prev)}
                >
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            <div className="profile__item-redact">
                <input
                    type={showConfirm ? "text" : "password"}
                    className="profile__item-input"
                    placeholder="Повторите новый пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="profile__toggle-pass"
                    onClick={() => setShowConfirm((prev) => !prev)}
                >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            {message && <div className="error">{message}</div>}
            <div className="profile__btn-box">
                {oldPassword !== "" && newPassword !== "" && confirmPassword !== "" ?
                    <button className="profile__savechange" onClick={handleChangePassword} disabled={loading}>
                        {loading ? "Сохраняем..." : "Сохранить"}
                    </button> : <button className="profile__savechange disabled" disabled>
                        {loading ? "Сохраняем..." : "Сохранить"}
                    </button>}
                <button className="profile__savechange" onClick={() => setChangePass(false)}>
                    Отменить
                </button>
            </div>
        </div>

    </div>
    );
}

