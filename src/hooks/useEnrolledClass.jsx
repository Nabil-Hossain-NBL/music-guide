import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useEnrolledClass = () => {

    const [axiosSecure] = useAxiosSecure();

    const { user, loading } = useContext(AuthContext);
    const { refetch, data: enrolledClass = [] } = useQuery({
        queryKey: ['enrolledClass', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure(`/enrolled?email=${user?.email}`);
            return res.data;
        }
    })
    return [enrolledClass, refetch];
};

export default useEnrolledClass;