import { FC, useEffect } from "react";
import { ProfileLayout } from "../ProfileLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useAuth } from "../../hooks/authHook";
import { fetchCommentsByUser } from "../../redux/thunks/commentThunks";
import { Link } from "react-router-dom";
import Loader from "../../customLoader/CustomLoader";


export const ProfileReviews: FC = () => {
    const { uid } = useAuth()
    const dispatch = useDispatch<AppDispatch>()
    const reviews = useSelector((state: RootState) => state.comment.items)
    const loading = useSelector((state: RootState) => state.comment.loading)
    useEffect(() => {
        if (uid) {
            dispatch(fetchCommentsByUser(uid))
        }
    }, [uid, dispatch])
    return <>

        <ProfileLayout title="Отзывы">
            {loading
                ? <Loader />
                :
                reviews.length < 1 ? (
                    <div className="profile__items orders__items-blank reviews__items-blank">
                        <h4 className="orders__item-blank-title reviews__item-blank-title page-title">
                            Вы не оставляли отзывов
                        </h4>
                        <a href="cataloge.html" className="orders__item-blank-cataloge reviews__item-blank-cataloge">
                            ПЕРЕЙТИ В КАТАЛОГ
                        </a>
                    </div>
                ) : (
                    <div className="reviews__grid">
                        {reviews.map((comment: any, index) => (
                            <div key={comment.id + index} className="review__card">
                                <div className="review__header">
                                    <div className="review__user-photo">
                                        {comment.photo ? (
                                            <img src={comment.photo} alt={comment.name} />
                                        ) : (
                                            <div className="review__placeholder">👤</div>
                                        )}
                                    </div>
                                    <div className="review__user-info">
                                        <span className="review__user-name">{comment.name}</span>
                                        <span className="review__date">
                                            {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "—"}
                                        </span>
                                    </div>
                                    <div className="review__stars">
                                        {"★".repeat(comment.stars) + "☆".repeat(5 - comment.stars)}
                                    </div>
                                </div>

                                <div className="review__text">{comment.text}</div>

                                <Link to={`/product/${comment.productId}`} className="review__product-link">
                                    Перейти к товару
                                </Link>
                            </div>
                        ))}
                    </div>

                )}
        </ProfileLayout>

    </>
}