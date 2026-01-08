import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

export const useKitchen = () => {
    const { items, isLoading } = useSelector((state: RootState) => state.kitchen)
    return {
        kitchen: items,
        isLoading,
    }
}