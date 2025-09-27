import { FC, useEffect, useState } from "react";

interface KitchenProductAsideProps {
    onFilterChange: (filters: any) => void,
    filterColor: string[],
    filterStyle: string[],
    filterMaterial: any
    setFilterColor: any,
    applyFilters: any,
    setFilterStyle: any,
    allColors: any[],
    allStyles: string[],
    allMaterial: string[],
    setFilterMaterial: any,
    activeAsideFilter: any
    setActiveAsideFilter: any
}

export const KitchenProductAside: FC<KitchenProductAsideProps> = ({
    onFilterChange, allColors,
    filterColor, setFilterColor,
    applyFilters, allStyles,
    setFilterStyle, filterStyle,
    allMaterial,
    filterMaterial, setFilterMaterial,
    activeAsideFilter, setActiveAsideFilter
}) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [reset, setReset] = useState<boolean>(false)
    useEffect(() => {
        if (reset === true) {
            applyFilters({
                minPrice: 0,
                maxPrice: Infinity,
                color: "",
                style: "",
                material: ""
            });
        }
    }, [reset]);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const min = minPrice ? parseInt(minPrice, 10) : 0;
        const max = maxPrice ? parseInt(maxPrice, 10) : Infinity;

        onFilterChange({
            minPrice: min,
            maxPrice: max,
        });
        setReset(false)
    };
    const handleReset = (e: React.FormEvent) => {
        e.preventDefault();
        setFilterColor("")
        setFilterStyle("")
        setFilterMaterial("")
        onFilterChange({
            minPrice: 0,
            maxPrice: Infinity,
        });
        setReset(true)
    };
    const toggleStyle = (style: string) => {
        setFilterStyle((prev: any) =>
            prev.includes(style)
                ? prev.filter((s: any) => s !== style)
                : [...prev, style]
        );
    };
    const toggleColor = (code: string) => {
        setFilterColor((prev: any) =>
            prev.includes(code)
                ? prev.filter((c: any) => c !== code)
                : [...prev, code]
        );
    };
    const toggleMaterial = (mat: string) => {
        setFilterMaterial((prev: any) =>
            prev.includes(mat)
                ? prev.filter((m: any) => m !== mat)
                : [...prev, mat]
        );
    };
    return <aside className={activeAsideFilter ? "kitchen__aside aside-kitchen active" : "kitchen__aside aside-kitchen"}>
        <form onSubmit={handleSubmit} onReset={handleReset} action="#">
            <div className="aside-kitchen__body">
                <button className="kitchen__aside-btn-close" onClick={() => setActiveAsideFilter(false)}>
                </button>
                <h4 className="aside-kitchen__title">Цена, Грн.</h4>
                <div className="aside-kitchen__cost">
                    <div className="aside-kitchen__cost-inputs">
                        <label>
                            <span>от </span>
                            <input
                                min="1500"
                                max="10000"
                                placeholder="1500"
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>до </span>
                            <input
                                min="1500"
                                max="10000"
                                placeholder="10000"
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <div className="aside-kitchen__colors">
                    <h4 className="aside-kitchen__title">Цвет фасадов</h4>
                    {allColors.map(({ code, name }: any) => {
                        const isActive = filterColor.includes(code);
                        return (
                            <div
                                key={code}
                                onClick={() => toggleColor(code)}
                                className="aside-kitchen__color-checkbox"
                            >
                                <input
                                    className={isActive ? "aside-kitchen__color-input active" : "aside-kitchen__color-input"}
                                    type="checkbox"
                                    checked={isActive}
                                    readOnly
                                />
                                <label
                                    className={isActive ? "aside-kitchen__color-label active" : "aside-kitchen__color-label"}
                                    style={{ backgroundColor: code }}>
                                </label>
                                <span className={isActive ? "aside-kitchen__color-text active" : "aside-kitchen__color-text"}>{name}</span>
                            </div>
                        );
                    })}
                </div>
                <div className="aside-kitchen__style">
                    <h4 className="aside-kitchen__title">Стиль</h4>
                    <div className="aside-kitchen__style-filter">
                        {allStyles.map((style: string) => {
                            const isActive = filterStyle.includes(style);
                            return (
                                <div
                                    key={style}
                                    onClick={() => toggleStyle(style)}
                                    className={isActive ? "aside-kitchen__style-checkbox question__form-accept active" : "aside-kitchen__style-checkbox question__form-accept"}
                                >
                                    <input
                                        className={isActive ? "aside-kitchen__style-input active" : "aside-kitchen__style-input"}
                                        type="checkbox"
                                        checked={isActive}
                                        readOnly
                                    />
                                    <label
                                        className={isActive ? "aside-kitchen__style-label active" : "aside-kitchen__style-label"}>
                                    </label>
                                    <span
                                        className={isActive ? "aside-kitchen__style-text active" : "aside-kitchen__style-text"}>{style}</span>
                                </div>
                            );
                        })}

                    </div>
                </div>
                <div className="aside-kitchen__material">
                    <h4 className="aside-kitchen__title">Материал фасадов</h4>
                    <div className="aside-kitchen__material-filter">
                        {allMaterial.map((material: string) => {
                            const isActive = filterMaterial.includes(material);
                            return (
                                <div
                                    key={material}
                                    onClick={() => toggleMaterial(material)}
                                    className={isActive ? "aside-kitchen__material-checkbox question__form-accept active"
                                        : "aside-kitchen__material-checkbox question__form-accept"}
                                >
                                    <input
                                        className={isActive ? "aside-kitchen__material-input active" : "aside-kitchen__material-input"}
                                        type="checkbox"
                                        checked={isActive}
                                        readOnly
                                    />
                                    <label
                                        className={isActive ? "aside-kitchen__material-label active" : "aside-kitchen__material-label"}>
                                    </label>
                                    <span
                                        className={isActive ? "aside-kitchen__material-text active" : "aside-kitchen__material-text"}>{material}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="aside-kitchen__actions">
                    <button className="aside-kitchen__submit" type="submit" onClick={() => setActiveAsideFilter(false)}>ПОКАЗАТЬ</button>
                    <button className="aside-kitchen__reset" type="reset" onClick={() => setActiveAsideFilter(false)}>Сбросить</button>
                </div>
            </div>
        </form>
    </aside >
}