import { Fade } from "react-awesome-reveal";
import useApprovedClass from "../../hooks/useApprovedClass";
import ClassCard from "../Shared/ClassCard/ClassCard";

const AllClass = () => {
    const [approvedClass] = useApprovedClass()

    return (
        <>
            <Fade>
                <div className="text-3xl font-bold text-center">
                    All Classes
                </div>
                <div className="ml-auto mr-auto flex flex-wrap justify-center items-start">
                    <div className=" w-10/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                        {
                            approvedClass.map(item => <ClassCard
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

export default AllClass;