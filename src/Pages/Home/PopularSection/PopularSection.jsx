import ClassCard from "../../Shared/ClassCard/ClassCard";
import useApprovedClass from "../../../hooks/useApprovedClass";
import { Fade } from "react-awesome-reveal";

const PopularSection = () => {
    const [approvedClass] = useApprovedClass();

    const popularSix = approvedClass.sort((a, b) => b - a).reduce((acc, val) => {
        if (acc.length < 6) {
            acc.push(val);
        }
        return acc;
    }, []);

    return (
        <>
            <Fade>
                <div className="text-3xl font-bold text-center">
                    Popular section
                </div>
                <div className="ml-auto mr-auto flex flex-wrap justify-center items-start">
                    <div className=" w-10/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                        {
                            popularSix.map(item => <ClassCard
                                key={item._id}
                                item={item}
                            ></ClassCard>)
                        }
                    </div>
                </div>
            </Fade>
        </>
    );
};

export default PopularSection;