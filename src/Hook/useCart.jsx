import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useCart = () => {
    const {user} = useAuth()
    const token = localStorage.getItem("access-token");
     const {
       isPending,
       data: cart = [],
       refetch
     } = useQuery({
       queryKey: ["carts"],
       queryFn: async () =>{
        const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        return res.json()
    }
     });
    return [cart, isPending, refetch]
};

export default useCart;