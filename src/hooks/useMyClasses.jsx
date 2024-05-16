import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useMyClasses = () => {
    const [axiosSecure] = useAxiosSecure();

    const { user, loading } = useContext(AuthContext);
    const { refetch, data: instructorClass = [] } = useQuery({
        queryKey: ['instructorClass', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/instructorClass?email=${user?.email}`);
            return res.data;
        }
    })
    return [instructorClass, refetch];
};

export default useMyClasses;