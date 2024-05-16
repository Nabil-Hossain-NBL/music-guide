import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {

    const [axiosSecure] = useAxiosSecure()
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })


    // const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const adminUser = 'admin'
    const instructorUser = 'instructor'

    const handleMakeAdmin = (user, userRole) =>{
        fetch(`https://music-instrument-learning-school-server.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({userRole})
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an ${userRole} Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    const handleDelete = user => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://music-instrument-learning-school-server.vercel.app/users/${user._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }


    return (
        <div>
            <div>
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className="text-end">Promote</th>
                            <th className="text-center"></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.role}</td>
                                <td>{user.role === 'admin' ? 'admin' :
                                    <button onClick={() => {
                                        handleMakeAdmin(user, adminUser)
                                        
                                    }} className="btn btn-ghost bg-secondary  text-white">make admin</button>
                                }</td>
                                <td>{user.role === 'instructor' ? 'instructor' :
                                    <button onClick={() => {
                                        handleMakeAdmin(user, instructorUser)
                                    }} className="btn btn-ghost bg-secondary  text-white" >make instructor</button>
                                }</td>
                                <td><button onClick={() => handleDelete(user)} className="btn btn-ghost bg-red-600  text-white">X</button></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;