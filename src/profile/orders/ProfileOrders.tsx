import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { ProfileLayout } from "../ProfileLayout";
import { fetchOrdersFromFirestore } from "../../redux/thunks/orderThunks";
import Loader from "../../customLoader/CustomLoader";
import { useAuth } from "../../hooks/authHook";

export const ProfileOrders: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { uid } = useAuth()
    const { loading } = useSelector((state: RootState) => state.orders);
    const orders = useSelector((state: RootState) => state.orders.orders);

    useEffect(() => {
        if (uid) {
            dispatch(fetchOrdersFromFirestore(uid));
        }
    }, [uid, dispatch]);

    return (
        <>
            <ProfileLayout title="Мои заказы">
                <div className="orders__body-block">
                    {loading ? (
                        <Loader />
                    ) : orders.length < 1 ? (
                        <div className="profile__items orders__items-blank">
                            <h4 className="orders__item-blank-title page-title">Нет оформленных заказов</h4>
                            <a href="/" className="orders__item-blank-cataloge">ПЕРЕЙТИ В КАТАЛОГ</a>
                        </div>
                    ) : (
                        <div className="orders__list">
                            {/* Заголовки один раз */}
                            <div className="orders__row orders__row--header">
                                <div className="orders__col">Номер заказа</div>
                                <div className="orders__col">Дата создания</div>
                                <div className="orders__col">Статус</div>
                                <div className="orders__col">Сумма</div>
                            </div>

                            {orders.map(order => (
                                <div key={order.id} className="orders__order-block">
                                    <div className="orders__row">
                                        <div className="orders__col orders__col-break">{order.id}</div>
                                        <div className="orders__col">
                                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—"}
                                        </div>
                                        <div className="orders__col orders__col-break">
                                            {order.status === "pending" ? "В процессе" : order.status}
                                        </div>
                                        <div className="orders__col">{order.total} грн.</div>
                                    </div>

                                    {/* Список товаров под заказом */}
                                    <div className="orders__item-box">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="orders__item-block">
                                                <a href={item.link} className="orders__item-img">
                                                    <img src={item.image} alt={item.name} />
                                                </a>
                                                <a href={item.link} className="orders__item-name">{item.name}</a>
                                                <div className="orders__item-quantity">{item.quantity} шт</div>
                                                <div className="orders__item-cost">{item.price}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </ProfileLayout>
        </>
    );
};
