import { FC, useState, FormEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { saveCommentToFirestore } from "../../redux/thunks/commentThunks";
import { sendComment } from "../../redux/reducers/commentReducer";

export const Reviews: FC<{ uid: any, productId: any }> = ({ uid, productId }) => {
    const [comment, setComment] = useState<string>("");
    const [stars, setStars] = useState<number>(5);
    const [hoveredStars, setHoveredStars] = useState<number | null>(null);
    const [photo, setPhoto] = useState<string | null>(null); // base64 image
    const name = useSelector((state: RootState) => state.auth.name);
    const dispatch = useDispatch<AppDispatch>();

    const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert("Файл слишком большой. Максимальный размер 5MB.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setPhoto(reader.result as string);
        };
        reader.readAsDataURL(file);
    };
    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            if (file.size > 5 * 1024 * 1024) {
                alert("Файл слишком большой. Максимальный размер 5MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const onSendComment = (e: FormEvent) => {
        e.preventDefault();
        const item = {
            productId: productId,
            name: name || "Аноним",
            id: uid,
            text: comment,
            photo: photo ?? null,
            stars: stars,
        };
        if (uid) {
            dispatch(sendComment(item));
            dispatch(saveCommentToFirestore());
            setComment("");
            setStars(5);
            setPhoto(null);
        }
    };

    return (
        <form className="reviews-form" onSubmit={onSendComment}>
            <label className="reviews-form__label" htmlFor="comment">Ваш отзыв:</label>
            <textarea
                id="comment"
                className="reviews-form__textarea"
                value={comment}
                placeholder="Поделитесь впечатлениями о товаре..."
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
            />

            <div className="reviews-form__stars">
                {[1, 2, 3, 4, 5].map((num) => (
                    <span
                        key={num}
                        className={`reviews-form__star ${num <= (hoveredStars || stars) ? "active" : ""}`}
                        onMouseEnter={() => setHoveredStars(num)}
                        onMouseLeave={() => setHoveredStars(null)}
                        onClick={() => setStars(num)}
                    >
                        ★
                    </span>
                ))}
            </div>

            <div className="reviews-form__upload">
                <label
                    htmlFor="photo-upload"
                    className="reviews-form__upload-label"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    🖼️ Перетащите или нажмите, чтобы выбрать фото
                </label>
                <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handlePhotoUpload}
                />
                {photo && (
                    <div className="reviews-form__preview-box">
                        <img src={photo} alt="Предпросмотр" className="reviews-form__preview" />
                        <button
                            type="button"
                            className="reviews-form__remove-photo"
                            onClick={() => setPhoto(null)}
                        >
                            ✖
                        </button>
                    </div>
                )}
            </div>


            <button type="submit" className="reviews-form__submit">Оставить отзыв</button>
        </form>
    );
};
