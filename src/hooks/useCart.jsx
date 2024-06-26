import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {

    const [axiosSecure] = useAxiosSecure();

    const {user, loading} = useContext(AuthContext);
    const { refetch, data: cart = []} = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure(`/carts?email=${user?.email}`);
            return res.data;
        }
    })
    return [cart, refetch];
};

export default useCart;