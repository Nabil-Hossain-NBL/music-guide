import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import Modal from "./Modal";

const MyCart = () => {
    const [cart, refetch] = useCart()

    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able undo this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://music-instrument-learning-school-server.vercel.app/carts/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'selecetedclass has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }


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
                            <th>pay</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr
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

                                <td><Modal item={item} refetch={refetch} ></Modal></td>

                                <td>
                                    <button onClick={() => handleDelete(item)} className="btn bg-neutral text-white"><FaTrashAlt></FaTrashAlt></button>
                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCart;