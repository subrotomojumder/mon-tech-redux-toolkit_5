export const fetchProducts = async () => {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=b");
    const data = await res.json();
    return data.meals;
}