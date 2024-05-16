import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

const AllInstructor = () => {

    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch('https://music-instrument-learning-school-server.vercel.app/users/instructors')
            .then((res) => res.json())
            .then((result) => {
                setInstructors(result);
            });
    }, [instructors]);

    return (
        <div>
            <div className="text-3xl font-bold text-center">
                <Fade>All Instructors</Fade>
            </div>
            <table className="table w-full text-center">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        instructors.map((user, index) => <tr
                            key={user._id}
                        >
                            <td>
                                {index + 1}
                            </td>

                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={user.img} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                            </td>

                            <td>
                                {user.name}
                            </td>
                            <td>
                                {user.email}
                            </td>

                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    );
};

export default AllInstructor;