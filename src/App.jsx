import axios from "axios";
import { useEffect, useState } from "react";
import './App.css'

const App = () => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)

  const fetchData = async () => {
    const res = await axios.get('https://dummyjson.com/products?limit=100')
    const data = await res.data;

    if (data && data.products) {
      setProducts(data.products)
    }


  }
  useEffect(() => {
    fetchData();
  }, [])

  const selectPage = (selectedPage ) => {
    if(
      selectedPage >= 1 &&
      selectedPage <= products.length / 10  &&
      selectedPage !== page 
    ){
      setPage(selectedPage)
    }

  }

  return (
    <>
      {products.length > 0 && (
        <div>

          <h1 style={{ textAlign: "center" }}>Products</h1>
          <div className="products">
            {
              products.slice(page * 10 - 10, page * 10).map((prod, key) => {
                return (
                  <div className="products__single">
                    <img src={prod.thumbnail} alt={prod.title} key={prod.id} />
                    <div className="products__title">
                      <h3>{prod.title}</h3>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )}
      {
        products.length > 0 && <div className="pagination">
          <span onClick={ () => selectPage(page - 1)}
          className={ page > 1 ? "" : "pagination__disable"}>◀️</span>

          {
            [...Array(products.length / 10)].map((_, i) => {
              return <span onClick={ () => selectPage(i+1)} key={i} className={ page === i+1 ? "pagination__style" :""}>
                 {i + 1}
                  </span>
            }

            )
          }
          <span onClick={ () => selectPage( page + 1)}
          className={ page < products.length /10 ? "" : "pagination__disable"}>▶️</span>
        </div>
      }
    </>
  )
}

export default App