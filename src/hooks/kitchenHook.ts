import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

export const useKitchen = () => {
    const { data, isLoading } = useSelector((state: RootState) => state.kitchen)
    return {
        kitchen: data,
        isLoading,
    }
}