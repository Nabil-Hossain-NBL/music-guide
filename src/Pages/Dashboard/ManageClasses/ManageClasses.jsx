import Swal from "sweetalert2";
import useAllClass from "../../../hooks/useAllClass";
import ModalButton from "./ModalButton";

const ManageClasses = () => {
    const [allClass, refetch] = useAllClass();

    const approved = 'approved';
    const denied = 'denied';

    const handleClassUpdate = (data) => {
        console.log(data);
        const newData = { feedback: data?.feedback }
        console.log(newData);
        fetch(`https://music-instrument-learning-school-server.vercel.app/updateFeedback/${data._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: 'Updated successfully!',
                        text: 'Toy Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                }
            });
    };
    const handleStatusUpdate = (data, status) => {
        console.log(data);
        console.log(status);
        const newData = { status: status }
        console.log(newData);
        fetch(`https://music-instrument-learning-school-server.vercel.app/updateStatus/${data}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: 'Updated successfully!',
                        text: 'Toy Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                }
            });
    };

    return (
        <div>
            <div>
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class</th>
                            <th>Class Name</th>
                            <th>Instructor</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Approve</th>
                            <th>Denie</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allClass.map((item, index) => <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.img} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>{item?.className}</td>
                                <td>{item?.name}</td>
                                <td>{item?.email}</td>
                                <td>{item?.status}</td>
                                <td><button className='bg-secondary btn' onClick={() => handleStatusUpdate(item._id, approved)}>Approve</button></td>
                                <td><button className='bg-secondary btn' onClick={() =>handleStatusUpdate(item._id, denied)}>Denie</button></td>

                                <td><ModalButton
                                    item={item}
                                    handleClassUpdate={handleClassUpdate}
                                ></ModalButton></td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClasses;