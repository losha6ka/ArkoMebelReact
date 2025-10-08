// src/admin/AdminPanel.tsx
import React, { useEffect, useState } from "react";
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
        color?: Record<string, { name?: string; images: string[] }>;
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
    image?: string; // preview URL
};

const productsCollection = collection(db, "products");

function getProductThumbnail(p: ProductType): string | null {
    if (p.image) return p.image;
    const colors = p.product?.color;
    if (colors) {
        const entries = Object.values(colors);
        if (entries.length) {
            const first = entries[0];
            if (first.images && first.images.length) return first.images[0];
        }
    }
    if (p.module && p.module.length && p.module[0].img) return p.module[0].img!;
    if (p.table && p.table.length && p.table[0].img) return p.table[0].img!;
    return null;
}

const emptyProduct = (): ProductType => ({
    name: "",
    price: "",
    oldPrice: "",
    discount: "",
    product: { color: {} },
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

export const AdminPanel: React.FC = () => {
    const [items, setItems] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState<ProductType | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    const handleCreateNew = () => setEditing(emptyProduct());

    const handleDelete = async (id?: string) => {
        if (!id) return;
        // if (!confirm("Удалить продукт?")) return;
        try {
            await deleteDoc(doc(db, "products", id));
            setItems((s) => s.filter((p) => p.id !== id));
        } catch (e) {
            console.error(e);
            alert("Ошибка удаления");
        }
    };

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
    const addColor = () => {
        if (!editing) return;
        const clone = JSON.parse(JSON.stringify(editing));
        clone.product = clone.product || { color: {} };
        // выбираем уникальный ключ цвета (можно потом изменить вручную)
        let code = "#cccccc";
        let i = 1;
        while (clone.product.color[code]) {
            code = `#cccccc${i++}`;
        }
        clone.product.color[code] = { name: "Новый цвет", images: [] };
        setEditing(clone);
    };

    const removeColor = (code: string) => {
        if (!editing) return;
        const clone = JSON.parse(JSON.stringify(editing));
        delete clone.product.color[code];
        setEditing(clone);
    };

    const addColorImageByUrl = (code: string, url: string) => {
        if (!editing) return;
        const clone = JSON.parse(JSON.stringify(editing));
        clone.product = clone.product || { color: {} };
        clone.product.color[code].images = clone.product.color[code].images || [];
        clone.product.color[code].images.push(url);
        setEditing(clone);
    };

    const removeColorImage = (code: string, idx: number) => {
        if (!editing) return;
        const clone = JSON.parse(JSON.stringify(editing));
        clone.product.color[code].images.splice(idx, 1);
        setEditing(clone);
    };

    const addModule = (target: "module" | "table") => {
        if (!editing) return;
        const clone = JSON.parse(JSON.stringify(editing));
        clone[target] = clone[target] || [];
        clone[target].push({ name: "Новый элемент", img: "", price: "" });
        setEditing(clone);
    };
    const removeModule = (target: "module" | "table", idx: number) => {
        if (!editing) return;
        const clone = JSON.parse(JSON.stringify(editing));
        clone[target].splice(idx, 1);
        setEditing(clone);
    };

    const addDescription = () => {
        if (!editing) return;
        const clone = JSON.parse(JSON.stringify(editing));
        clone.description = clone.description || [];
        clone.description.push("");
        setEditing(clone);
    };
    const removeDescription = (idx: number) => {
        if (!editing) return;
        const clone = JSON.parse(JSON.stringify(editing));
        clone.description.splice(idx, 1);
        setEditing(clone);
    };

    const addDelivery = () => {
        if (!editing) return;
        const clone = JSON.parse(JSON.stringify(editing));
        clone.delivery = clone.delivery || [];
        clone.delivery.push({ service: "Новый сервис", price: "0 грн" });
        setEditing(clone);
    };
    const removeDelivery = (idx: number) => {
        if (!editing) return;
        const clone = JSON.parse(JSON.stringify(editing));
        clone.delivery.splice(idx, 1);
        setEditing(clone);
    };

    const onSetPreviewUrl = (url: string) => {
        if (!editing) return;
        setEditing({ ...editing, image: url });
    };

    // helper: ask user for URL via prompt (удобно)
    const promptForUrl = async (action: (url: string) => void) => {
        const url = window.prompt("Вставьте прямую ссылку на изображение (URL):");
        if (url && url.trim()) action(url.trim());
    };

    return (
        <div className="admin-panel">
            <div className="admin-panel__header">
                <h1>Admin Panel — Товары</h1>
                <div className="admin-panel__controls">
                    <button className="btn" onClick={handleCreateNew}>Создать товар</button>
                    <button className="btn btn--muted" onClick={fetchProducts}>Обновить список</button>
                </div>
            </div>

            {loading && <div className="admin-panel__loading">Загрузка...</div>}
            {error && <div className="admin-panel__error">{error}</div>}

            <div className="admin-panel__grid">
                <div className="admin-panel__list">
                    {items.map((p) => (
                        <div key={p.id} className="admin-panel__card">
                            <div className="admin-panel__thumb">
                                {getProductThumbnail(p) ? <img src={getProductThumbnail(p) as string} alt={p.name} /> : <div className="placeholder">Нет фото</div>}
                            </div>
                            <div className="admin-panel__meta">
                                <div className="admin-panel__name">{p.name}</div>
                                <div className="admin-panel__price">{p.price}</div>
                            </div>
                            <div className="admin-panel__actions">
                                <button className="btn" onClick={() => handleEdit(p)}>Редактировать</button>
                                <button className="btn btn--danger" onClick={() => handleDelete(p.id)}>Удалить</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="admin-panel__editor">
                    {editing ? (
                        <div>
                            <h2>{editing.id ? `Редактировать: ${editing.name}` : "Новый товар"}</h2>

                            <label className="field">
                                <span>Название</span>
                                <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                            </label>

                            <div className="two-cols">
                                <label className="field">
                                    <span>Цена</span>
                                    <input value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} />
                                </label>
                                <label className="field">
                                    <span>Старая цена</span>
                                    <input value={editing.oldPrice} onChange={(e) => setEditing({ ...editing, oldPrice: e.target.value })} />
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
                                    <button className="btn" onClick={() => promptForUrl((u) => onSetPreviewUrl(u))}>Вставить URL</button>
                                </div>
                                {editing.image && <div className="preview"><img src={editing.image} alt="preview" /></div>}
                            </label>

                            <div className="section">
                                <div className="section-header">
                                    <h3>Цвета (colors)</h3>
                                    <button className="btn" onClick={addColor}>Добавить цвет</button>
                                </div>
                                <div className="colors">
                                    {editing.product && Object.entries(editing.product.color || {}).map(([code, cd]) => (
                                        <div className="color-row" key={code}>
                                            <div className="color-sample" style={{ background: code }} />
                                            <input value={code} readOnly className="color-code" />
                                            <input className="color-name" value={cd.name} onChange={(e) => {
                                                const clone = JSON.parse(JSON.stringify(editing));
                                                clone.product.color[code].name = e.target.value;
                                                setEditing(clone);
                                            }} />
                                            <div className="color-images">
                                                {cd.images?.map((img: string, idx: number) => (
                                                    <div key={idx} className="color-image">
                                                        <img src={img} alt="" />
                                                        <button onClick={() => removeColorImage(code, idx)} className="btn btn--small">✖</button>
                                                    </div>
                                                ))}

                                                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                                                    <input placeholder="https://..." onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            const input = e.target as HTMLInputElement;
                                                            const url = input.value.trim();
                                                            if (url) { addColorImageByUrl(code, url); input.value = ""; }
                                                        }
                                                    }} />
                                                    <button className="btn" onClick={() => promptForUrl((u) => addColorImageByUrl(code, u))}>Добавить URL</button>
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
                                        <input placeholder="price" value={m.price} onChange={(e) => {
                                            const clone = JSON.parse(JSON.stringify(editing));
                                            clone.module[idx].price = e.target.value;
                                            setEditing(clone);
                                        }} />
                                        <button className="btn btn--danger" onClick={() => removeModule("module", idx)}>Удалить</button>
                                    </div>
                                ))}
                            </div>

                            <div className="section">
                                <h3>Столешницы</h3>
                                <button className="btn" onClick={() => addModule("table")}>Добавить столешницу</button>
                                {(editing.table || []).map((m, idx) => (
                                    <div className="line" key={idx}>
                                        <input value={m.name} onChange={(e) => {
                                            const clone = JSON.parse(JSON.stringify(editing));
                                            clone.table[idx].name = e.target.value;
                                            setEditing(clone);
                                        }} />
                                        <input placeholder="img URL" value={m.img} onChange={(e) => {
                                            const clone = JSON.parse(JSON.stringify(editing));
                                            clone.table[idx].img = e.target.value;
                                            setEditing(clone);
                                        }} />
                                        <input placeholder="price" value={m.price} onChange={(e) => {
                                            const clone = JSON.parse(JSON.stringify(editing));
                                            clone.table[idx].price = e.target.value;
                                            setEditing(clone);
                                        }} />
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
                                        <input value={d.price} onChange={(e) => {
                                            const clone = JSON.parse(JSON.stringify(editing));
                                            clone.delivery[idx].price = e.target.value;
                                            setEditing(clone);
                                        }} />
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
            </div>
        </div>
    );
};

export default AdminPanel;
