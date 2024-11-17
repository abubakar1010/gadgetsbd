import { useEffect, useState } from "react";
import { useUserData } from "../../../hooks/useUserData"
import axios from "axios";
import { baseURL } from "../../../utils/Constant";
import Loading from "../../Loading";
import ProductCard from "../../Product/ProductCard";


interface Product {
	brand: string;
	category: string;
	description: string;
	email: string;
	imageURL: string;
	price: string;
	stock: string;
	title: string;
	_id: string;
}

export default function Wishlist() {

  const user = useUserData()

  const [wishlist, setWishlist] = useState<Product[] | []>([])
  const [loading, setLoading] = useState<boolean>(false)

  const email = user.email;

  useEffect(() => {
    setLoading(false)
    axios.get(`${baseURL}/wishlist/${email}`)
    .then( res => {
      setWishlist(res.data.result)
      setLoading(false)
    })
    .catch( err => {
      console.log(err);
      
    })
  },[email])


  const handleWishlist = (id: string) => {
		const email = user.email;
		const productId = id;
		axios
			.patch(`${baseURL}/remove-from-wishlist`, { email, productId })
			.then((res) => {
				console.log(res);
        window.location.reload()
			})
			.catch((err) => {
				console.log(err);
			});
	};


  return (
    <>
    {
      loading? <Loading /> : (
        <>
        <div className=" text-center mt-7">
          Total Wishlist Item {wishlist.length}
        </div>

        <div>
          {
            wishlist.length === 0? <div className=" my-12 flex justify-center items-center text-4xl font-bold"><h1>There are nothing in your wishlist or it's empty</h1></div> : (
              <>
              <div className=" grid grid-cols-3 gap-5 my-12">
                {
                  wishlist.map( item => (
                    <ProductCard wishlistItem={true} handleWishlist={handleWishlist} key={item._id} item={item} />
                  ))
                }
              </div>
              </>
            )
          }
        </div>
        
        </>
      )
    }
    
    </>
  )
}
