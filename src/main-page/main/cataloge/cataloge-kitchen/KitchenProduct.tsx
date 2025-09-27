import { FC, useEffect, useState } from "react";
import { KitchenProductAside } from "./KitchenProductAside";
import ProductCard from "../../PopProductHOC";

interface KitchenProductProps { kitchen: any }

export const KitchenProduct: FC<KitchenProductProps> = ({ kitchen }) => {
    const [filtered, setFiltered] = useState([]);
    const [allColors, setAllColors] = useState<{ code: string; name: string }[]>([]);
    const [allStyles, setAllStyles] = useState<string[]>([]);
    const [allMaterial, setAllMaterial] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<"popular" | "dearer" | "cheaper">("popular");
    const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({ min: 0, max: Infinity });
    const [filterColor, setFilterColor] = useState<string[]>([]);
    const [filterStyle, setFilterStyle] = useState<string[]>([]);
    const [filterMaterial, setFilterMaterial] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [activeAsideFilter, setActiveAsideFilter] = useState<boolean>(false)
    const totalPages = Math.ceil(filtered.length / 6);

    useEffect(() => {
        if (kitchen) {
            applyFilters({
                minPrice: priceFilter.min,
                maxPrice: priceFilter.max,
                sort: sortOrder
            });
        }
        if (kitchen && kitchen.length > 0) {
            const uniqueColors = new Map<string, string>(); // hex -> name
            const uniqueStyle = new Set<string>()
            const uniqueMaterial = new Set<string>()
            kitchen.forEach((item: any) => {
                const colorObj = item.product?.color;
                const styleStr = item.style;
                const materialStr = item.material;
                if (colorObj) {
                    Object.entries(colorObj).forEach(([code, value]: any) => {
                        uniqueColors.set(code, value.name);
                    });
                }
                if (styleStr) {
                    uniqueStyle.add(styleStr)
                }
                if (materialStr) {
                    uniqueMaterial.add(materialStr)
                }
            });

            const colorArray = Array.from(uniqueColors.entries()).map(
                ([code, name]) => ({ code, name })
            );
            const styleArray = Array.from(uniqueStyle)
            const materialArray = Array.from(uniqueMaterial)
            setAllStyles(styleArray)
            setAllColors(colorArray);
            setAllMaterial(materialArray);
        }
    }, [kitchen]);

    const applyFilters = ({
        minPrice = priceFilter.min, maxPrice = priceFilter.max,
        sort = sortOrder, color = filterColor,
        style = filterStyle,
        material = filterMaterial
    }: {
        minPrice?: number;
        maxPrice?: number;
        sort?: "popular" | "dearer" | "cheaper";
        color?: string[];
        style?: string[];
        material?: string[]
    }) => {
        let result: any = [...kitchen];

        // ФИЛЬТРАЦИЯ по цене
        result = result.filter((product: any) => product.price >= minPrice && product.price <= maxPrice);

        // ФИЛЬТРАЦИЯ по цвету
        if (color && color.length > 0) {
            result = result.filter((product: any) =>
                product.product?.color &&
                Object.keys(product.product.color).some((colorCode) => color.includes(colorCode))
            );
        }
        if (style && style.length > 0) {
            result = result.filter((product: any) =>
                product?.style && style.includes(product.style)
            );
        }
        if (material && material.length > 0) {
            result = result.filter((product: any) =>
                product?.material && material.includes(product.material)
            );
        }
        // СОРТИРОВКА
        if (sort === "cheaper") {
            result.sort((a: any, b: any) => a.price - b.price);
        } else if (sort === "dearer") {
            result.sort((a: any, b: any) => b.price - a.price);
        } else if (sort === "popular") {
            result.sort((a: any, b: any) => b.tag === "popular" ? -1 : 1);
        }

        setFiltered(result);
    };
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };
    const getProductsForCurrentPage = () => {
        const startIndex = (currentPage - 1) * 6;
        return filtered.slice(startIndex, startIndex + 6);
    };
    const onFilterChange = ({ minPrice, maxPrice }: { minPrice: number; maxPrice: number }) => {
        setPriceFilter({ min: minPrice, max: maxPrice });
        applyFilters({ minPrice, maxPrice, sort: sortOrder });
    };
    const changeSorting = (order: "popular" | "dearer" | "cheaper") => {
        setSortOrder(order);
        applyFilters({ minPrice: priceFilter.min, maxPrice: priceFilter.max, sort: order });
    };

    return <section className="main-kitchen kitchen product">
        <div className="product__container kitchen__container">
            <KitchenProductAside
                allColors={allColors}
                allStyles={allStyles}
                allMaterial={allMaterial}
                filterColor={filterColor}
                filterStyle={filterStyle}
                filterMaterial={filterMaterial}
                applyFilters={applyFilters}
                onFilterChange={onFilterChange}
                setFilterMaterial={setFilterMaterial}
                setFilterColor={setFilterColor}
                setFilterStyle={setFilterStyle}
                activeAsideFilter={activeAsideFilter}
                setActiveAsideFilter={setActiveAsideFilter}
            />
            <div className="kitchen__content">
                <div className="kitchen__filters product__filters">
                    <h4 className="kitchen__nav-title">Сортировать:</h4>
                    <button className="kitchen__tablinks-filter" onClick={() => changeSorting("popular")}>
                        Популярность
                    </button>
                    <button className="kitchen__tablinks-filter" onClick={() => changeSorting("dearer")}>
                        Дороже
                    </button>
                    <button className="kitchen__tablinks-filter" onClick={() => changeSorting("cheaper")}>
                        Дешевле
                    </button>
                    <button className="kitchen__tablinks-filter" onClick={() => changeSorting("popular")}>
                    </button>
                </div>
                <button className="kitchen__aside-btn" onClick={() => setActiveAsideFilter(true)}>ФИЛЬТР</button>
                <div className="kitchen__items product__items">
                    {getProductsForCurrentPage().length === 0 ? <div className="kitchen__subtitle">Нет товаров по данному запросу</div> : getProductsForCurrentPage()?.map((kitch: any) => (
                        <ProductCard
                            key={kitch.id}
                            id={kitch.id}
                            name={kitch.name}
                            price={kitch.price}
                            oldPrice={kitch.oldPrice}
                            product={kitch.product}
                            maxStroke={1}
                        />
                    ))}
                </div>
                <div className="kitchen__navigation">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page: number) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={page === currentPage ? "kitchen__tablinks active" : "kitchen__tablinks"}>
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </section>
}