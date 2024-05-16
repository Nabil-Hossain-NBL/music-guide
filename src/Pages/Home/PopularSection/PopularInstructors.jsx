import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import InstructorCard from "./InstructorCard";

const PopularInstructors = () => {

    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch('https://music-instrument-learning-school-server.vercel.app/users/instructors')
            .then((res) => res.json())
            .then((result) => {
                setInstructors(result.slice(0, 6));
            });
    }, [instructors]);

    return (
        <>
            <Fade>
                <div className="text-3xl font-bold mt-10 text-center">
                    Popular section
                </div>
                <div className="ml-auto mr-auto flex flex-wrap justify-center items-start">
                    <div className=" w-10/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                        {
                            instructors.map(item => <InstructorCard
                                key={item._id}
                                item={item}
                            ></InstructorCard>)
                        }
                    </div>
                </div>
            </Fade>
        </>
    );
};

export default PopularInstructors;