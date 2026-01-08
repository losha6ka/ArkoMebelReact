import { FC, useEffect } from "react";
import { Header } from "../../header/Header";
import { Footer } from "../../footer/Footer";
import { KitchenDop } from "./cataloge-kitchen/KitchenDop";
import { KitchenProduct } from "./cataloge-kitchen/KitchenProduct";
import { Social } from "../Social";
import { KitchenAction } from "./cataloge-kitchen/KitchenAction";
import { useDispatch, } from "react-redux";
import { AppDispatch, } from "../../../redux/store";
import { useKitchen } from "../../../hooks/kitchenHook";
import { Breadcrumbs } from "../../Breadcrumbs";
import Loader from "../../../customLoader/CustomLoader";
import { fetchKitchenToFirestore } from "../../../redux/thunks/kitchenThunks";
interface KitchenProps { }
export const Kitchen: FC<KitchenProps> = () => {
    const { kitchen, isLoading } = useKitchen()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchKitchenToFirestore())
    }, [dispatch])
    return <main className="main">
        {isLoading === true
            ? <Loader />
            : <div>
                <Header />
                <Breadcrumbs />
                <KitchenDop />
                <KitchenProduct kitchen={kitchen} />
                <KitchenAction kitchen={kitchen} />
                <Social />
                <Footer />
            </div>}

    </main>
} 