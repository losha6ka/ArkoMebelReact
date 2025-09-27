import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { db } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { setUser } from "../../redux/reducers/authReducer";
import { useAuth } from "../../hooks/authHook";

interface Props {
    onClose: () => void;
}

export const ChangeName: React.FC<Props> = ({ onClose }) => {
    const [newName, setNewName] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch<AppDispatch>()

    const { uid, name, email, phone } = useAuth()

    const handleSaveName = async () => {
        if (!uid) return;

        if (!newName.trim()) {
            setMessage("Введите имя");
            return;
        }

        try {
            setLoading(true);
            await setDoc(
                doc(db, "users", uid),
                {
                    uid,
                    email,
                    phone,
                    name: newName,
                },
                { merge: true }
            );
            dispatch(setUser({ uid: uid, email: email!, name: newName, phone }))
            setMessage("Имя успешно обновлено");
            setTimeout(() => {
                onClose();
            }, 800);
        } catch (e) {
            console.error("Ошибка обновления имени:", e);
            setMessage("Произошла ошибка");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="change-name-form">
            <div className="profile__item-intitle profile__item-name">
                <div className="profile__item-type">Имя*</div>
                <div className="profile__item-column">
                    <div className="profile__item-redact">
                        <input
                            type="text"
                            className="profile__item-input"
                            autoFocus
                            placeholder={name || ""}
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </div>
                    {message && <div className="profile__message">{message}</div>}
                    <div className="profile__btn-box">
                        <button
                            className={`profile__savechange ${!newName ? "disabled" : ""}`}
                            onClick={handleSaveName}
                            disabled={loading || !newName}
                        >
                            {loading ? "Сохраняем..." : "Сохранить"}
                        </button>
                        <button className="profile__savechange" onClick={onClose}>
                            Отменить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
