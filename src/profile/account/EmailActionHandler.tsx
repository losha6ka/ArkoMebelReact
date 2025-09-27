// import { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { getAuth, applyActionCode, checkActionCode, confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";

// export const EmailActionHandler = () => {
//     const [searchParams] = useSearchParams();
//     const navigate = useNavigate();
//     const [message, setMessage] = useState("Обработка...");
//     const [mode, setMode] = useState<string | null>(null);
//     const [oobCode, setOobCode] = useState<string | null>(null);
//     const [newPassword, setNewPassword] = useState("");
//     const [actionVerified, setActionVerified] = useState(false);

//     const auth = getAuth();

//     useEffect(() => {
//         const modeParam = searchParams.get("mode");
//         const oobParam = searchParams.get("oobCode");

//         if (!modeParam || !oobParam) {
//             setMessage("Некорректная ссылка");
//             return;
//         }

//         setMode(modeParam);
//         setOobCode(oobParam);

//         // проверка ссылки перед действием
//         checkActionCode(auth, oobParam)
//             .then(() => setActionVerified(true))
//             .catch((err) => setMessage("Ссылка недействительна или истекла: " + err.message));
//     }, [searchParams, auth]);

//     const handleVerifyEmail = async () => {
//         if (!oobCode) return;
//         try {
//             await applyActionCode(auth, oobCode);
//             setMessage("Email успешно подтверждён ✅");
//             // можно обновить user и перенаправить
//             navigate("/profile");
//         } catch (err: any) {
//             setMessage("Ошибка подтверждения: " + err.message);
//         }
//     };

//     const handleResetPassword = async () => {
//         if (!oobCode) return;
//         try {
//             await confirmPasswordReset(auth, oobCode, newPassword);
//             setMessage("Пароль успешно изменён ✅");
//             navigate("/login");
//         } catch (err: any) {
//             setMessage("Ошибка смены пароля: " + err.message);
//         }
//     };

//     if (!actionVerified) return <div>{message}</div>;

//     return (
//         <div className="email-action-handler">
//             {mode === "verifyEmail" && (
//                 <>
//                     <p>Email нужно подтвердить.</p>
//                     <button onClick={handleVerifyEmail}>Подтвердить Email</button>
//                 </>
//             )}

//             {mode === "resetPassword" && (
//                 <>
//                     <p>Введите новый пароль:</p>
//                     <input
//                         type="password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         placeholder="Новый пароль"
//                     />
//                     <button onClick={handleResetPassword}>Сменить пароль</button>
//                 </>
//             )}

//             {!["verifyEmail", "resetPassword"].includes(mode!) && (
//                 <p>Неизвестное действие: {mode}</p>
//             )}

//             {message && <p>{message}</p>}
//         </div>
//     );
// };
