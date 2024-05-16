import useEnrolledClass from "../../../hooks/useEnrolledClass";

const EnrolledClasses = () => {
    const [enrolledClass] = useEnrolledClass()
    return (
        <div className="w-full">
            <div className="overflow-x-auto w-full">
                <h1 className="text-center text-4xl font-bold">Class selected {enrolledClass.length}</h1>
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class</th>
                            <th>Class Name</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            enrolledClass.map((item, index) => <tr
                                key={item._id}
                            >
                                <td>
                                    {index + 1}
                                </td>

                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.img} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    {item.className}
                                </td>

                                <td>${item.price}</td>
                                <td className="text-green-600">{item.status}</td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EnrolledClasses;