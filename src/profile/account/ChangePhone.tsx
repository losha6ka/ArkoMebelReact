import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { db } from '../../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { setUser } from '../../redux/reducers/authReducer';
import { useAuth } from '../../hooks/authHook';

interface Props {
    onClose: () => void;
}

export const ChangePhone: React.FC<Props> = ({ onClose }) => {
    const [phone, setPhone] = useState(''); // raw digits after +380
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch<AppDispatch>()

    const { uid, email, name } = useAuth()

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // только цифры

        // если человек вводит 380..., обрезаем
        if (value.startsWith("380")) {
            value = value.slice(3);
        }

        // максимум 9 цифр
        if (value.length > 9) {
            value = value.slice(0, 9);
        }

        setPhone(value);
    };

    const handleSavePhone = async () => {
        if (!uid) return;
        if (phone.length !== 9) {
            setMessage('Введите полный номер (9 цифр)');
            return;
        }
        try {
            setLoading(true);
            await setDoc(
                doc(db, 'users', uid),
                { uid, email, name, phone: '+380' + phone },
                { merge: true }
            );
            dispatch(setUser({ uid: uid, email: email!, name, phone }))
            setMessage('Телефон успешно обновлен');
            setTimeout(() => onClose(), 1000);
        } catch (err) {
            console.error('Ошибка обновления телефона:', err);
            setMessage('Произошла ошибка');
        } finally {
            setLoading(false);
        }
    };

    const disabled = loading || phone.length !== 9;

    return (
        <div className="change-phone-form">
            <div className="profile__item-intitle profile__item-number">
                <div className="profile__item-type">Телефон</div>

                <div className="profile__item-column">
                    <div className="profile__item-redact">
                        <input
                            type="tel"
                            className="profile__item-input"
                            autoFocus
                            placeholder="+380_________"
                            value={`+380${phone}`}
                            onChange={handlePhoneChange}
                        />
                    </div>

                    {message && <div className="profile__message">{message}</div>}
                    <div className="profile__btn-box">
                        <button
                            className={`profile__savechange ${disabled ? 'disabled' : ''}`}
                            onClick={handleSavePhone}
                            disabled={disabled}
                        >
                            {loading ? 'Сохраняем...' : 'Сохранить'}
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
