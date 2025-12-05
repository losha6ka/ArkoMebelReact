// src/admin/AdminPanel.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    DocumentData,
    QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import "../SCSS/admin.scss";
import { LoadProductMOCK } from "../Addproduct";

type ModuleOrTable = {
    id?: string | number;
    name: string;
    img?: string;
    price?: string;
    oldPrice?: string;
    discount?: string;
    hit?: boolean;
};

type DeliveryOption = {
    id?: string | number;
    service: string;
    price: string;
};

export type ProductType = {
    id?: string;
    name: string;
    price?: string;
    oldPrice?: string;
    discount?: string;
    product?: {
        colors?: Record<string, { name?: string; images: string[]; hex: string; id: string; thumbnail: string }>;
    };
    module?: ModuleOrTable[];
    table?: ModuleOrTable[];
    sizes?: { width?: string; height?: string; depth?: string };
    characteristics?: Record<string, string>;
    material?: Record<string, string>;
    delivery?: DeliveryOption[];
    description?: string[];
    hit?: boolean;
    productstar?: number;
    image?: string
};

const productsCollection = collection(db, "products");

const emptyProduct = (): ProductType => ({
    name: "",
    price: "",
    oldPrice: "",
    discount: "",
    product: { colors: {} },
    module: [],
    table: [],
    sizes: { width: "", height: "", depth: "" },
    characteristics: {},
    material: {},
    delivery: [],
    description: [],
    hit: false,
    productstar: 0,
    image: "",
});

// --- Helpers for price formatting ---
const formatPrice = (raw?: string | number | null) => {
    if (raw == null) return "";
    const s = String(raw).replace(/[^0-9]/g, "");
    if (!s) return "";
    // insert space as thousand separator
    const withSpaces = s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return `${withSpaces} грн.`;
};

const stripPrice = (val?: string) => {
    if (!val) return "";
    return String(val).replace(/[^0-9]/g, "");
};

export const AdminPanel: React.FC = () => {
    const [items, setItems] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState<ProductType | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // search + pagination
    const [queryText, setQueryText] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [pressEnter, setPressEnter] = useState<boolean>(false)

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const snap = await getDocs(productsCollection);
            const data = snap.docs.map((d: QueryDocumentSnapshot<DocumentData>) => {
                const obj = { id: d.id, ...(d.data() as any) } as ProductType;
                return obj;
            });
            setItems(data);
        } catch (e: any) {
            console.error("Ошибка загрузки продуктов:", e);
            setError(e.message || "Ошибка");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        setPage(1); // reset page when query changes
    }, [queryText, pageSize]);

    const filtered = useMemo(() => {
        const q = queryText.trim().toLowerCase();
        if (!q) return items;
        return items.filter((p) => p.name.toLowerCase().includes(q));
    }, [items, queryText]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

    const handleCreateNew = () => setEditing(emptyProduct());

    const handleDelete = async (id?: string) => {
        if (!id) return;
        try {
            await deleteDoc(doc(db, "products", id));
            setItems((s) => s.filter((p) => p.id !== id));
        } catch (e) {
            console.error(e);
            alert("Ошибка удаления");
        }
    };
    const deepClone = (v: any) => JSON.parse(JSON.stringify(v ?? {}));

    const handleEdit = (p: ProductType) => setEditing(JSON.parse(JSON.stringify(p)));

    const handleCancelEdit = () => setEditing(null);

    const handleSave = async () => {
        if (!editing) return;
        if (!editing.name.trim()) {
            alert("Укажите название товара");
            return;
        }
        setIsSaving(true);
        try {
            // ensure price fields are formatted
            if (editing.price) editing.price = formatPrice(stripPrice(editing.price));
            if (editing.oldPrice) editing.oldPrice = formatPrice(stripPrice(editing.oldPrice));
            (editing.module || []).forEach((m) => { if (m.price) m.price = formatPrice(stripPrice(m.price)); });
            (editing.table || []).forEach((m) => { if (m.price) m.price = formatPrice(stripPrice(m.price)); });
            (editing.delivery || []).forEach((d) => { if (d.price) d.price = formatPrice(stripPrice(d.price)); });

            if (editing.id) {
                const refDoc = doc(db, "products", editing.id);
                const payload = { ...editing } as any;
                delete payload.id;
                await updateDoc(refDoc, payload);
                setItems((s) => s.map((it) => (it.id === editing.id ? editing : it)));
            } else {
                const newDoc = await addDoc(productsCollection, editing as any);
                const added = { ...editing, id: newDoc.id };
                setItems((s) => [added, ...s]);
            }
            setEditing(null);
        } catch (e: any) {
            console.error("Ошибка сохранения:", e);
            alert("Ошибка сохранения: " + e.message);
        } finally {
            setIsSaving(false);
        }
    };

    // ---- НОВОЕ: работа с URL картинок (без storage) ----
    const addColor = (code = "#cccccc") => {
        if (!editing) return;

        const clone = JSON.parse(JSON.stringify(editing));
        clone.product = clone.product || { colors: {} };

        // создаём уникальный ключ
        let key = code;
        let i = 1;
        while (clone.product.colors?.[key]) {
            key = `${code}${i++}`;
        }

        clone.product.colors[key] = {
            name: "Новый цвет",
            images: []
        };

        setEditing(clone);
    };
    const updateColor = (code: string, update: any) => {
        setEditing(prev => {
            const clone = deepClone(prev);

            // гарантия структуры
            clone.product = clone.product || {};
            clone.product.colors = clone.product.colors || {};

            clone.product.colors[code] = clone.product.colors[code] || {
                name: "",
                images: [],
            };

            // updater меняет только необходимые поля
            update(clone.product.colors[code]);

            return clone;
        });
    };

    const changeColorKey = (oldKey: string, newKey: string) => {
        if (!editing) return;
        if (!newKey || !newKey.trim()) return;

        const clone = JSON.parse(JSON.stringify(editing));

        clone.product = clone.product || { colors: {} };

        const color = clone.product.colors?.[oldKey];
        if (!color) return;

        // если новый ключ пустой — не меняем
        if (!newKey.trim()) return;

        // проверяем уникальность
        let key = newKey;
        let i = 1;
        while (clone.product.colors?.[key] && key !== oldKey) {
            key = `${newKey}${i++}`;
        }

        clone.product.colors[key] = {
            ...color,
            images: Array.isArray(color.images) ? color.images : [] // защита
        };

        if (key !== oldKey) delete clone.product?.colors?.[oldKey];

        setEditing(clone);
    };

    const removeColor = (code: string) => {
        if (!editing) return;

        const clone = JSON.parse(JSON.stringify(editing));

        if (!clone.product?.colors?.[code]) return;

        delete clone.product.colors[code];

        setEditing(clone);
    };

    const addColorImageByUrl = (code: string, url: string) => {
        setEditing(prev => {
            if (!prev) return prev;
            const clone = deepClone(prev);
            clone.product = clone.product || {};
            clone.product.colors = clone.product.colors || {};
            if (!clone.product.colors[code]) clone.product.colors[code] = { name: "Без имени", images: [] };
            if (!Array.isArray(clone.product.colors[code].images)) clone.product.colors[code].images = [];
            clone.product.colors[code].images.push(url);
            return clone;
        });
    };


    const removeColorImage = (code: string, idx: number) => {
        if (!editing) return;

        const clone = JSON.parse(JSON.stringify(editing));

        const color = clone.product?.colors?.[code];
        if (!color) return;

        if (!Array.isArray(color.images)) {
            color.images = [];
            return; // нечего удалять
        }

        if (idx < 0 || idx >= color.images.length) return;

        color.images.splice(idx, 1);

        setEditing(clone);
    };


    const addModule = (target: "module" | "table") => {
        setEditing(prev => {
            const clone = deepClone(prev);
            clone[target] = clone[target] || [];
            clone[target].push({ name: "Новый элемент", img: "", price: "" });
            return clone;
        });
    };
    const removeModule = (target: "module" | "table", idx: number) => {
        setEditing(prev => {
            const clone = deepClone(prev);
            if (!clone[target]) return prev;
            clone[target].splice(idx, 1);
            return clone;
        });
    };

    const addDescription = () => {
        setEditing(prev => {
            const clone = deepClone(prev);
            clone.description = clone.description || [];
            clone.description.push("");
            return clone;
        });
    };
    const removeDescription = (idx: number) => {
        setEditing(prev => {
            const clone = deepClone(prev);
            if (!clone.description) return prev;
            clone.description.splice(idx, 1);
            return clone;
        });
    };

    const addDelivery = () => {
        setEditing(prev => {
            const clone = deepClone(prev);
            clone.delivery = clone.delivery || [];
            clone.delivery.push({ service: "Новый сервис", price: "" });
            return clone;
        });
    };
    const removeDelivery = (idx: number) => {
        setEditing(prev => {
            const clone = deepClone(prev);
            if (!clone.delivery) return prev;
            clone.delivery.splice(idx, 1);
            return clone;
        });
    };

    const onSetPreviewUrl = (url: string) => {
        setEditing(prev => {
            if (!prev) return prev;
            const clone = deepClone(prev);
            clone.image = url;
            return clone;
        });
    };

    // price helpers for inputs: allow typing digits, format on blur
    const handlePriceChange = (field: keyof ProductType, value: string) => {
        setEditing(prev => {
            if (!prev) return prev;
            const clone = deepClone(prev);
            clone[field] = stripPrice(value);
            return clone;
        });
    };
    const handlePriceBlur = (field: keyof ProductType) => {
        setEditing(prev => {
            if (!prev) return prev;
            const clone = deepClone(prev);
            clone[field] = formatPrice(stripPrice(clone[field] as any));
            return clone;
        });
    };

    const handleSubItemPriceChange = (target: "module" | "table", idx: number, value: string) => {
        setEditing(prev => {
            if (!prev) return prev;
            const clone = deepClone(prev);
            clone[target] = clone[target] || [];
            clone[target][idx] = clone[target][idx] || {};
            clone[target][idx].price = stripPrice(value);
            return clone;
        });
    };
    const handleSubItemPriceBlur = (target: "module" | "table", idx: number) => {
        setEditing(prev => {
            if (!prev) return prev;
            const clone = deepClone(prev);
            clone[target] = clone[target] || [];
            clone[target][idx] = clone[target][idx] || {};
            clone[target][idx].price = formatPrice(stripPrice(clone[target][idx].price));
            return clone;
        });
    };

    const handleDeliveryPriceChange = (idx: number, value: string) => {
        setEditing(prev => {
            if (!prev) return prev;
            const clone = deepClone(prev);
            clone.delivery = clone.delivery || [];
            clone.delivery[idx] = clone.delivery[idx] || {};
            clone.delivery[idx].price = stripPrice(value);
            return clone;
        });
    };
    const handleDeliveryPriceBlur = (idx: number) => {
        setEditing(prev => {
            if (!prev) return prev;
            const clone = deepClone(prev);
            clone.delivery = clone.delivery || [];
            clone.delivery[idx] = clone.delivery[idx] || {};
            clone.delivery[idx].price = formatPrice(stripPrice(clone.delivery[idx].price));
            return clone;
        });
    };

    // palette of popular colors
    const suggestedColors = ["#ffffff", "#000000", "#f4f4f4", "#e6e6e6", "#c0c0c0", "#ff0000", "#00ff00", "#0000ff", "#f5deb3", "#8b4513"];

    return (
        <div className="admin-panel">
            {pressEnter && <div className="press-enter">Для подтверждения нажмите <span>"Enter"</span></div>}
            <div className="admin-panel__header">
                <h1>Admin Panel — Товары</h1>
                <LoadProductMOCK />
                <div className="admin-panel__controls">
                    <button className="btn" onClick={handleCreateNew}>Создать товар</button>
                    <button className="btn btn--muted" onClick={fetchProducts}>Обновить список</button>
                </div>
            </div>

            {loading && <div className="admin-panel__loading">Загрузка...</div>}
            {error && <div className="admin-panel__error">{error}</div>}

            <div className="admin-panel__grid">
                <div className="admin-panel__list">
                    <div className="list-controls">
                        <input className="search" placeholder="Поиск по названию..." value={queryText} onChange={(e) => setQueryText(e.target.value)} />
                        <div className="pagination-controls">
                            <label>Показывать
                                <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                </select>
                                на странице
                            </label>
                        </div>
                    </div>

                    {paginated.map((p) => (
                        <div key={p.id} className="admin-panel__card">
                            <div className="admin-panel__thumb">
                                <img
                                    src={Object.values(p.product?.colors || {})[0]?.thumbnail}
                                    alt={p.name}
                                />
                            </div>
                            <div className="admin-panel__meta">
                                <div className="admin-panel__name">{p.name}</div>
                                <div className="admin-panel__price">{formatPrice(stripPrice(p.price)) || p.price}</div>
                            </div>
                            <div className="admin-panel__actions">
                                <button className="btn" onClick={() => handleEdit(p)}>Редактировать</button>
                                <button className="btn btn--danger" onClick={() => handleDelete(p.id)}>Удалить</button>
                            </div>
                        </div>
                    ))}

                    <div className="pager">
                        <button className="btn" onClick={() => setPage((s) => Math.max(1, s - 1))} disabled={page <= 1}>◀</button>
                        <span>Страница {page} из {totalPages}</span>
                        <button className="btn" onClick={() => setPage((s) => Math.min(totalPages, s + 1))} disabled={page >= totalPages}>▶</button>
                    </div>
                </div>

                <div className="admin-panel__editor">
                    {editing ? (
                        <div>
                            <h2>{editing.id ? `Редактировать: ${editing.name}` : "Новый товар"}</h2>

                            {/* Preview карточки прямо перед добавлением/редактированием */}
                            <div className="live-preview">
                                <h4>Предпросмотр</h4>
                                <div className="preview-card">
                                    <div className="thumb">
                                        <img
                                            src={Object.values(editing.product?.colors || {})[0]?.thumbnail}
                                            alt={editing.name}
                                        />
                                    </div>
                                    <div className="meta">
                                        <div className="name">{editing.name || "Название"}</div>
                                        <div className="price">{formatPrice(stripPrice(editing.price)) || editing.price || "Цена"}</div>
                                    </div>
                                </div>
                            </div>

                            <label className="field">
                                <span>Название</span>
                                <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                            </label>

                            <div className="two-cols">
                                <label className="field">
                                    <span>Цена</span>
                                    <input value={stripPrice(editing.price)}
                                        onChange={(e) => handlePriceChange("price", e.target.value)}
                                        onBlur={() => handlePriceBlur("price")}
                                        placeholder="5000" />
                                </label>
                                <label className="field">
                                    <span>Старая цена</span>
                                    <input value={stripPrice(editing.oldPrice)}
                                        onChange={(e) => handlePriceChange("oldPrice", e.target.value)}
                                        onBlur={() => handlePriceBlur("oldPrice")}
                                        placeholder="7000" />
                                </label>
                            </div>

                            <label className="field">
                                <span>Скидка</span>
                                <input value={editing.discount} onChange={(e) => setEditing({ ...editing, discount: e.target.value })} />
                            </label>

                            <label className="field">
                                <span>Является хитом</span>
                                <input type="checkbox" checked={!!editing.hit} onChange={(e) => setEditing({ ...editing, hit: e.target.checked })} />
                            </label>

                            <label className="field">
                                <span>Оценка товара (productstar)</span>
                                <input type="number" min={0} max={5} step={0.1} value={editing.productstar || 0} onChange={(e) => setEditing({ ...editing, productstar: Number(e.target.value) })} />
                            </label>

                            <label className="field">
                                <span>Миниатюра (URL)</span>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <input value={editing.image || ""} onChange={(e) => onSetPreviewUrl(e.target.value)} placeholder="https://..." />
                                </div>
                                {editing.image && <div className="preview"><img src={editing.image} alt="preview" /></div>}
                            </label>

                            <div className="section">
                                <div className="section-header">
                                    <h3>Цвета (colors)</h3>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <button className="btn" onClick={() => addColor()}>Добавить цвет</button>
                                        {suggestedColors.map((c) => (
                                            <button key={c} title={c} className="color-suggest" onClick={() => addColor(c)}>
                                                <span style={{ background: c, width: 20, height: 20, display: "inline-block", border: "1px solid #000" }} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="colors">
                                    {editing.product && Object.entries(editing.product.colors || {}).map(([code, cd]) => (
                                        <div className="color-row" key={code}>
                                            <input type="color" value={code.startsWith("#") ? code : "#cccccc"} onChange={(e) => changeColorKey(code, e.target.value)} />
                                            <input className="color-code" value={code} readOnly />
                                            <input
                                                className="color-name"
                                                value={cd.name}
                                                onChange={(e) => {
                                                    const clone = JSON.parse(JSON.stringify(editing));
                                                    // гарантируем, что colors существует
                                                    if (!clone.product.colors) { clone.product.colors = {}; }
                                                    // гарантируем, что цвет существует
                                                    if (!clone.product.colors[code]) {
                                                        clone.product.colors[code] = { name: "", images: [] };
                                                    }
                                                    clone.product.colors[code].name = e.target.value;
                                                    setEditing(clone);
                                                }}
                                            />
                                            <div className="color-images">
                                                {cd.images?.map((img: string, idx: number) => (
                                                    <div key={idx} className="color-image">
                                                        <img src={img} alt="" />
                                                        <button onClick={() => removeColorImage(code, idx)} className="btn btn--small">✖</button>
                                                    </div>
                                                ))}

                                                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                                                    <input onFocus={() => setPressEnter(true)} onBlur={() => setPressEnter(false)} placeholder="https://..." onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            const input = e.target as HTMLInputElement;
                                                            const url = input.value.trim();
                                                            if (url) { addColorImageByUrl(code, url); input.value = ""; }
                                                        }
                                                    }} />
                                                </div>
                                            </div>
                                            <button className="btn btn--danger" onClick={() => removeColor(code)}>Удалить цвет</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="section">
                                <h3>Модули</h3>
                                <button className="btn" onClick={() => addModule("module")}>Добавить модуль</button>
                                {(editing.module || []).map((m, idx) => (
                                    <div className="line" key={idx}>
                                        <input value={m.name} onChange={(e) => {
                                            const clone = JSON.parse(JSON.stringify(editing));
                                            clone.module[idx].name = e.target.value;
                                            setEditing(clone);
                                        }} />
                                        <input placeholder="img URL" value={m.img} onChange={(e) => {
                                            const clone = JSON.parse(JSON.stringify(editing));
                                            clone.module[idx].img = e.target.value;
                                            setEditing(clone);
                                        }} />
                                        <img className="mini-img" src={m.img} alt="module-img" />
                                        <input placeholder="price" value={stripPrice(m.price)} onChange={(e) => handleSubItemPriceChange("module", idx, e.target.value)} onBlur={() => handleSubItemPriceBlur("module", idx)} />
                                        <button className="btn btn--danger" onClick={() => removeModule("module", idx)}>Удалить</button>
                                    </div>
                                ))}
                            </div>

                            <div className="section">
                                <h3>Столешницы</h3>
                                <button className="btn" onClick={() => addModule("table")}>Добавить столешницу</button>
                                {(editing.table || []).map((t, idx) => (
                                    <div className="line" key={idx}>
                                        <input value={t.name} onChange={(e) => {
                                            const clone = JSON.parse(JSON.stringify(editing));
                                            clone.table[idx].name = e.target.value;
                                            setEditing(clone);
                                        }} />
                                        <input placeholder="img URL" value={t.img} onChange={(e) => {
                                            const clone = JSON.parse(JSON.stringify(editing));
                                            clone.table[idx].img = e.target.value;
                                            setEditing(clone);
                                        }} />
                                        <img className="mini-img" src={t.img} alt="module-img" />
                                        <input placeholder="price" value={stripPrice(t.price)} onChange={(e) => handleSubItemPriceChange("table", idx, e.target.value)} onBlur={() => handleSubItemPriceBlur("table", idx)} />
                                        <button className="btn btn--danger" onClick={() => removeModule("table", idx)}>Удалить</button>
                                    </div>
                                ))}
                            </div>

                            <div className="section">
                                <h3>Описание (параграфы)</h3>
                                <button className="btn" onClick={addDescription}>Добавить параграф</button>
                                {(editing.description || []).map((d, idx) => (
                                    <div key={idx} className="line">
                                        <textarea value={d} onChange={(e) => {
                                            const clone = JSON.parse(JSON.stringify(editing));
                                            clone.description[idx] = e.target.value;
                                            setEditing(clone);
                                        }} />
                                        <button className="btn btn--danger" onClick={() => removeDescription(idx)}>Удалить</button>
                                    </div>
                                ))}
                            </div>

                            <div className="section">
                                <h3>Доставка</h3>
                                <button className="btn" onClick={addDelivery}>Добавить опцию</button>
                                {(editing.delivery || []).map((d, idx) => (
                                    <div key={idx} className="line">
                                        <input value={d.service} onChange={(e) => {
                                            const clone = JSON.parse(JSON.stringify(editing));
                                            clone.delivery[idx].service = e.target.value;
                                            setEditing(clone);
                                        }} />
                                        <input value={stripPrice(d.price)} onChange={(e) => handleDeliveryPriceChange(idx, e.target.value)} onBlur={() => handleDeliveryPriceBlur(idx)} />
                                        <button className="btn btn--danger" onClick={() => removeDelivery(idx)}>Удалить</button>
                                    </div>
                                ))}
                            </div>
                            <div className="section">
                                <h3>Размеры</h3>
                                <div className="two-cols">
                                    <input placeholder="width" value={editing.sizes?.width} onChange={(e) => setEditing({ ...editing, sizes: { ...editing.sizes, width: e.target.value } })} />
                                    <input placeholder="height" value={editing.sizes?.height} onChange={(e) => setEditing({ ...editing, sizes: { ...editing.sizes, height: e.target.value } })} />
                                    <input placeholder="depth" value={editing.sizes?.depth} onChange={(e) => setEditing({ ...editing, sizes: { ...editing.sizes, depth: e.target.value } })} />
                                </div>
                            </div>
                            <div className="editor-actions">
                                <button className="btn btn--primary" onClick={handleSave} disabled={isSaving}>{isSaving ? "Сохраняем..." : "Сохранить"}</button>
                                <button className="btn btn--muted" onClick={handleCancelEdit}>Отменить</button>
                            </div>
                        </div>
                    ) : (
                        <div className="editor-empty">Выберите товар слева или создайте новый</div>
                    )}
                </div>
            </div >
        </div >
    );
};

export default AdminPanel;
