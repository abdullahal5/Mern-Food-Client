import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
    const {user} = useAuth()
    const token = localStorage.getItem("access-token");
    const axiosSecure = useAxiosSecure()
     const {
       isPending,
       data: cart = [],
       refetch
     } = useQuery({
       queryKey: ["carts"],
       queryFn: async () =>{
        const res = await axiosSecure.get(`/add?email=${user?.email}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        return res.data
    }
     });
    return [cart, isPending, refetch]
};

export default useCart;