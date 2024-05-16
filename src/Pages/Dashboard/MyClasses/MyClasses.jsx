import { FaEdit } from "react-icons/fa";
import useMyClasses from "../../../hooks/useMyClasses";
import { useState } from "react";

const MyClasses = () => {
    const [instructorClass] = useMyClasses()
    const [feedback, setFeedback] = useState('')
    console.log(instructorClass);
    return (
        <div className="w-full">
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class</th>
                            <th>Class Name</th>
                            <th>Price</th>
                            <th>Total Student</th>
                            <th>Status</th>
                            <th>update</th>
                            <th>feedback</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            instructorClass.map((item, index) => <tr
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
                                <td>{item.totalStudent}</td>
                                <td>{item.status}</td>

                                <td>
                                    <button className="btn bg-neutral text-white"><FaEdit></FaEdit></button>
                                </td>
                                {
                                    item?.feedback ?
                                        <td>
                                            {/* You can open the modal using ID.showModal() method */}
                                            <button className="btn" onClick={() => {
                                                window.my_modal_3.showModal()
                                                setFeedback(item?.feedback)

                                            }}>open modal</button>

                                        </td>
                                        :
                                        <></>
                                }

                            </tr>)
                        }


                    </tbody>
                </table>
                <dialog id="my_modal_3" className="modal">
                    <form method="dialog" className="modal-box">
                        <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <h3 className="font-bold text-lg">Feedback from admin!</h3>
                        <p className="py-4">{feedback}</p>
                    </form>
                </dialog>

            </div>
        </div>
    );
};

export default MyClasses;