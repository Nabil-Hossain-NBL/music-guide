import { useQuery } from "@tanstack/react-query";

const useApprovedClass = () => {

    const {data: approvedClass = [], refetch} = useQuery({
        queryKey: ['approvedClass'],
        queryFn: async () =>{
            const res = await fetch('https://music-instrument-learning-school-server.vercel.app/allClass/approved');
            return res.json()
        }
    })
    console.log(approvedClass);

    return [approvedClass, refetch]
};

export default useApprovedClass;