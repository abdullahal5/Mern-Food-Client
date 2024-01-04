import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosScure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logout, setLoading } = useAuth();

    axiosScure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token')
      config.headers.authorization = `Bearer ${token}`
      return config;
    },(error) => {
        return Promise.reject(error)
    });

    axiosScure.interceptors.response.use((response) =>{

        return response;
    }, async(error) =>{
        const status = error.response.status
        if(status === 401 || status === 403){
            await logout()
            setLoading(false)
            navigate("/register")
        }
        return Promise.reject(error)
    })

    return axiosScure
};

export default useAxiosSecure;