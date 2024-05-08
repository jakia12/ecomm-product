import { useEffect, useState } from "react";
import Searchfield from "./Searchfield";
import SingleProduct from "./SingleProduct";

const Productpage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Searchfield data={data} />
      <div className="grid lg:grid-cols-3 grid-cols-1 mx-auto w-100 max-w-[1080px] gap-3 pt-[120px] pb-[200px]">
        {data.map((item) => (
          <SingleProduct key={item.id} data={item} />
        ))}
      </div>
    </>
  );
};

export default Productpage;
