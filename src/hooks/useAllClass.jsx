import { useQuery } from "@tanstack/react-query";

const useAllClass = () => {

    const {data: allClass = [], refetch} = useQuery({
        queryKey: ['allClass'],
        queryFn: async () =>{
            const res = await fetch('https://music-instrument-learning-school-server.vercel.app/allClass');
            return res.json()
        }
    })

    return [allClass, refetch]
};
export default useAllClass;