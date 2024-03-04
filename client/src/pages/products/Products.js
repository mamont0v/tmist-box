import { useState, useEffect } from "react";
 
const Products = () => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      // Загрузка данных о товарах (может быть асинхронным запросом к серверу)
      const fetchData = async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/todos/1'); // Путь к вашему JSON файлу
          const data = await response.json();
          setProducts(data.products);
          
        } catch (error) {
          console.error('Ошибка загрузки данных о товарах:', error);
        }
      };
  
      fetchData();
    }, []);

    return (
      <div>
      {Array.isArray(products) && products.map(product => (
        <li key={product.id}>
            <h2>{product.title}</h2>
            <p>Размеры: {product.sizes.join(', ')}</p>
            </li>
      ))}
    </div>
    );
  };

export default Products