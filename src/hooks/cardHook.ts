import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

export const useCard = () => {
    const { items, isLoading, activeColor, currentProduct } = useSelector((state: RootState) => state.card)
    return {
        cards: items,
        isLoading,
        activeColor,
        currentProduct
    }
}