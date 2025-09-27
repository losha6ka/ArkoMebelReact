import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { clearCart } from "../../redux/reducers/cartReducer";
import { useNavigate } from "react-router-dom";
import { api } from "../../service/api";
import { saveCartToFirestore } from "../../redux/thunks/cartThunks";
import { useAuth } from "../../hooks/authHook";
import { Header } from "../header/Header";
import { placeOrder } from "../../redux/thunks/orderThunks";

const CheckoutForm: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch<AppDispatch>();
    const NP_API_KEY = process.env.REACT_APP_NP_API_KEY;
    const { uid, name, email, phone } = useAuth();
    //
    const [cartName, setCartName] = useState<string>(name || "");
    const [cartPhone, setCartPhone] = useState<string>(phone || "");
    const [cartEmail, setCartEmail] = useState<string>(email || "");
    const [deliveryType, setDeliveryType] = useState<string>("Новая Почта");
    const [paymentType, setPaymentType] = useState<string>("cash"); // "cash" или "liqpay"
    //
    const [areas, setAreas] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [departments, setDepartments] = useState<any[]>([]);
    //
    const [selectedArea, setSelectedArea] = useState<any | null>(null);
    const [selectedCity, setSelectedCity] = useState<any | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<any | null>(null);
    //
    const [comment, setComment] = useState<string>("");
    const [agree, setAgree] = useState<boolean>(false);

    const navigate = useNavigate();

    const total = cartItems.reduce((acc, item: any) => {
        const price =
            typeof item.price === "number"
                ? item.price
                : parseInt(item.price.replace(/\s|грн\.?/gi, ""), 10);
        return acc + price * item.quantity;
    }, 0);
    const departmentOptions = departments.map((dept) => ({
        value: dept.Ref,
        label: dept.Description,
    }));

    // Получаем области
    useEffect(() => {
        if (deliveryType === 'Новая Почта') {
            fetch('https://api.novaposhta.ua/v2.0/json/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    apiKey: NP_API_KEY,
                    modelName: 'Address',
                    calledMethod: 'getAreas',
                    methodProperties: { Language: 'UA' }
                })
            })
                .then(res => res.json())
                .then(json => setAreas(json.data));
        }
    }, [deliveryType, NP_API_KEY]);

    // Получаем города по выбранной области
    useEffect(() => {
        if (selectedArea) {
            fetch('https://api.novaposhta.ua/v2.0/json/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    apiKey: NP_API_KEY,
                    modelName: 'Address',
                    calledMethod: 'getCities',
                    methodProperties: {
                        AreaRef: selectedArea.Ref,
                        Language: 'UA'
                    }
                })
            })
                .then(res => res.json())
                .then(json => setCities(json.data));
        }
    }, [selectedArea, NP_API_KEY]);

    // Получаем отделения по выбранному городу
    useEffect(() => {
        if (selectedCity) {
            fetch('https://api.novaposhta.ua/v2.0/json/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    apiKey: NP_API_KEY,
                    modelName: 'AddressGeneral',
                    calledMethod: 'getWarehouses',
                    methodProperties: { CityRef: selectedCity.Ref }
                })
            })
                .then(res => res.json())
                .then(json => setDepartments(json.data));
        }
    }, [selectedCity, NP_API_KEY]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agree) {
            alert("Вы должны согласиться с обработкой данных.");
            return;
        }
        if (uid) {
            dispatch(placeOrder(uid));
            dispatch(clearCart());
            dispatch(saveCartToFirestore(uid));
        }
        // await api.submitOrder(orderData);
        navigate("/thank-you", { state: { email } });
    };
    const handleLiqPayPayment = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!agree) {
            alert("Вы должны согласиться с обработкой данных.");
            return;
        }

        const orderId = `order_${Date.now()}`;

        const orderData = {
            name,
            phone,
            email,
            deliveryType,
            city: selectedCity?.Description || "",
            department: selectedDepartment?.Description || "",
            comment,
            items: cartItems,
            total,
            paymentType,
            orderId,
            createdAt: new Date(),
        };

        // Сохраняем заказ (если нужно)
        await api.submitOrder(orderData);

        // Получаем data и signature от бэка
        const res = await fetch("http://localhost:4000/api/liqpay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: total,
                email,
                orderId,
            }),
        });

        const { data, signature } = await res.json();

        // Создаём форму LiqPay
        const form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", "https://www.liqpay.ua/api/3/checkout");
        form.setAttribute("accept-charset", "utf-8");

        const dataInput = document.createElement("input");
        dataInput.type = "hidden";
        dataInput.name = "data";
        dataInput.value = data;

        const signInput = document.createElement("input");
        signInput.type = "hidden";
        signInput.name = "signature";
        signInput.value = signature;

        form.appendChild(dataInput);
        form.appendChild(signInput);

        document.body.appendChild(form);
        form.submit();
    };


    return (<div className="checkout-form__container">
        <Header />
        <h2>Оформление заказа</h2>
        <form className="checkout-form" onSubmit={(e) => {
            e.preventDefault();
            if (!agree) return;

            if (paymentType === "liqpay") {
                handleLiqPayPayment(e);
            } else {
                handleSubmit(e);
            }
        }}>
            <div>
                <div className="form-section">
                    <label>Имя*</label>
                    <input name="name" type="name" value={cartName} onChange={(e) => setCartName(e.target.value)} required />

                    <label>Телефон*</label>
                    <input name="phone" type="phone" value={cartPhone} onChange={(e) => setCartPhone(e.target.value)} required />

                    <label>Email*</label>
                    <input name="email" type="email" value={cartEmail} onChange={(e) => setCartEmail(e.target.value)} required />
                </div>
                <div className="form-section">
                    <label>Комментарий</label>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>
                <div className="btn-accept">
                    <label>
                        <input
                            type="checkbox"
                            checked={agree}
                            onChange={() => setAgree(!agree)}
                        />
                        Я соглашаюсь на обработку персональных данных
                    </label>
                    <div className="btn-accept__button">
                        <button
                            type="submit"
                            disabled={!agree}>
                            Подтвердить заказ
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div className="form-section">
                    <label>Служба доставки</label>
                    <select value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)}>
                        <option>Новая Почта</option>
                        <option>Укрпочта</option>
                    </select>
                </div>
                <div className="form-section">
                    <label>Область*</label>
                    <select
                        required
                        value={selectedArea?.Ref || ""}
                        onChange={(e) => {
                            const area = areas.find((a) => a.Ref === e.target.value);
                            setSelectedArea(area);
                            setSelectedCity(null);
                            setSelectedDepartment(null);
                        }}
                    >
                        <option value="" disabled>Выберите область</option>
                        {areas.map((area) => (
                            <option key={area.Ref} value={area.Ref}>{area.Description}</option>
                        ))}
                    </select>

                    <label>Город*</label>
                    <select
                        required
                        value={selectedCity?.Ref || ""}
                        onChange={(e) => {
                            const city = cities.find((c) => c.Ref === e.target.value);
                            setSelectedCity(city);
                            setSelectedDepartment(null);
                        }}
                        disabled={!selectedArea}
                    >
                        <option value="" disabled>Выберите город</option>
                        {cities.map((city) => (
                            <option key={city.Ref} value={city.Ref}>{city.Description}</option>
                        ))}
                    </select>

                    <label>Отделение / Почтомат*</label>
                    <Select
                        options={departmentOptions}
                        required
                        value={
                            selectedDepartment
                                ? { value: selectedDepartment.Ref, label: selectedDepartment.Description }
                                : null
                        }
                        onChange={(option: any) => {
                            const dept = departments.find((d) => d.Ref === option.value);
                            setSelectedDepartment(dept);
                        }}
                        isDisabled={!selectedCity}
                        placeholder="Выберите отделение или введите номер"
                    />
                </div>
                <div className="form-section">
                    <label>Способ оплаты*</label>
                    <select required value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                        <option value="cash">Наложенный платеж</option>
                        <option value="liqpay">Онлайн-оплата (LiqPay)</option>
                    </select>
                </div>
                <div className="order-summary">
                    <h3>Ваш заказ</h3>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id} >
                                <div>{item.name}</div>
                                <div style={{ alignSelf: "start", display: "flex", gap: "10px" }}>
                                    {item.image && <img src={item.image} alt={item.name} width={60} />}
                                    {item.price} x {item.quantity}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p><strong>Итого: {total} грн</strong></p>
                </div>
            </div>
        </form >
    </div >
    );
};

export default CheckoutForm;
