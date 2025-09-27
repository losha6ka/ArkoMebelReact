import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useAuth = () => {
    const { email, uid, name, phone } = useSelector((state: RootState) => state.auth);

    return {
        isAuth: !!uid,
        email,
        uid,
        name,
        phone,
    };
};
