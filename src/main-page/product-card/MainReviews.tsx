import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchCommentsByProduct } from "../../redux/thunks/commentThunks";

interface FeedbackItem {
    id: string;
    name: string;
    date?: string;
    star: number;
    comment: string;
    photo?: string | null;
}

export const MainReviews: FC<{
    renderStars: (stars: number) => any;
    productId: any
}> = ({ renderStars, productId }) => {
    const commentItems = useSelector((state: RootState) => state.comment.items);
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        if (productId) {
            dispatch(fetchCommentsByProduct(productId));
        }
    }, [productId, dispatch]);
    const filteredComments = commentItems.filter(
        (item) => item.productId === productId
    );
    const userFeedbacks: FeedbackItem[] = filteredComments.map((item) => ({
        productId: productId,
        id: item.id,
        name: item.name || "Пользователь",
        date: new Date().toLocaleDateString(),
        star: item.stars,
        comment: item.text,
        photo: item.photo || null,
    }));
    return (
        <div className="extra__body">
            {userFeedbacks.length >= 1 ? userFeedbacks.map((feed, index) => (
                <div className="extra__body-comment" key={feed.id + index}>
                    <div className="extra__comment comment-extra">
                        <div className="comment-extra__header">
                            <div className="comment-extra__name">{feed.name || "Аноним"}</div>
                            <div className="comment-extra__date">{feed.date || "Сегодня"}</div>
                            <div className="product-rating">
                                {renderStars(feed.star)}
                            </div>
                        </div>
                        <div className="comment-extra__comment">
                            <p>{feed.comment}</p>
                        </div>
                    </div>
                    {feed.photo && (
                        <div className="extra__product">
                            <img src={feed.photo} alt="Фото отзыва" className="extra__product-img" />
                        </div>
                    )}
                </div>
            )) : <div className="extra__blank-title">К сожалению, пока никто не оставил отзыв для данного
                товара, будьте первым!
            </div>}
        </div>
    );
};
