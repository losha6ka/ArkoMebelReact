import { FC, useState } from "react";
import { useAuth } from "../../hooks/authHook";
import { ChangePasswordForm } from "./ChangePassword";
import { ProfileLayout } from "../ProfileLayout";
import { ChangePhone } from "./ChangePhone";
import { Pencil, UserRoundCheckIcon, UserRoundXIcon } from "lucide-react"
import { ChangeName } from "./ChangeName";
import { ChangeEmail } from "./ChangeEmail";
import { auth } from "../../firebase/firebase";
const Profile: FC = () => {
    const { name, email, phone } = useAuth();
    const [changePass, setChangePass] = useState<boolean>(false)
    const [changeEmail, setChangeEmail] = useState<boolean>(false)
    const [changePhone, setChangePhone] = useState(false);
    const [changeName, setChangeName] = useState(false);

    const userVerified = auth.currentUser?.emailVerified

    return (<ProfileLayout title="Профиль">
        <div className="profile__items">
            <div className="profile__item">
                <h2 className="profile__item-title">ЛИЧНЫЕ ДАННЫЕ</h2>
                <div className="profile__item-body">
                    <form className="profile__item-form">
                        <div className="profile__item-form-block">
                            {changeName ? (
                                <ChangeName onClose={() => setChangeName(false)} />
                            ) : (
                                <div className="profile__item-intitle profile__item-name">
                                    <div className="profile__item-type">Имя*</div>
                                    <div className="profile__edit-row" onClick={() => setChangeName(true)}>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            className="profile__item-input"
                                            value={name || ""}
                                            readOnly
                                        />
                                        <button className="profile__item-icon">
                                            {<Pencil size={18} />}</button>
                                    </div>
                                </div>
                            )}
                            {changeEmail
                                ? <ChangeEmail setChangeEmail={setChangeEmail} />
                                : <div className="profile__item-email profile__item-intitle">
                                    <div className="profile__item-type">E-mail*</div>
                                    <div className="profile__item-column">
                                        <div className="profile__item-redact"
                                            onClick={() => setChangeEmail(true)}
                                        >
                                            <input
                                                id="email"
                                                name="email"
                                                type="text"
                                                className="profile__item-input"
                                                value={email || ""}
                                                readOnly
                                            />
                                            <button className="profile__item-icon">
                                                {<Pencil size={18} />}</button>
                                        </div>
                                        <div className="profile__item-verify" onClick={() => setChangeEmail(true)}>
                                            {userVerified
                                                ? <div className="profile__item-verify-block">
                                                    <UserRoundCheckIcon color="green" size={18} />
                                                    <span>Почта подтверждена</span>
                                                </div>
                                                : <div className="profile__item-verify-block">
                                                    <UserRoundXIcon color="red" size={18} />
                                                    <span>Почта не подтверждена</span>
                                                </div>}</div>
                                    </div>
                                </div>
                            }

                        </div>
                        <div className="profile__item-form-block">
                            {changePhone ? (
                                <ChangePhone onClose={() => setChangePhone(false)} />
                            ) : (
                                <div className="profile__item-intitle profile__item-number">
                                    <div className="profile__item-type">Телефон</div>
                                    <div className="profile__edit-row" onClick={() => setChangePhone(true)}>
                                        <input
                                            className="profile__item-input"
                                            value={phone || ""}
                                            placeholder="Не указан"
                                            readOnly
                                        />
                                        <button className="profile__item-icon">
                                            {<Pencil size={18} />}</button>
                                    </div>
                                </div>
                            )}
                            {changePass
                                ? <ChangePasswordForm setChangePass={setChangePass} />
                                : <div className="profile__item-pass profile__item-intitle">
                                    <div className="profile__item-type">Пароль*</div>
                                    <div className="profile__item-redact">


                                        <div className="profile__edit-row" onClick={() => setChangePass(true)}>
                                            <input name="password" type="text"
                                                className="profile__item-input"
                                                value={"**********"} readOnly />
                                            <button className="profile__item-icon">
                                                {<Pencil size={18} />}</button>
                                        </div>
                                    </div>
                                </div>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </ProfileLayout>);
};

export default Profile