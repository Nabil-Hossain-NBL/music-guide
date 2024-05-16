import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";

const ClassCard = ({ item }) => {

    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor()

    const { img, name, availableSeat, className, price, _id } = item;
    const { user } = useContext(AuthContext);
    const [, refetch] = useCart()
    const navigate = useNavigate()
    const handleAddToCart = item => {
        console.log(item);
        if (user && user.email) {
            const cartItem = { classItemId: _id, name, className, img, price, email: user.email }
            fetch('https://music-instrument-learning-school-server.vercel.app/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'class added on the cart.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login to select',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }
    return (

        <div className={availableSeat === 0 ? "card w-80 bg-red-600 shadow-xl" : "card w-80 bg-base-100 shadow-xl"}>
            <figure className="px-10 pt-10">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2>{className}</h2>
                <span className="flex w-full">
                    <p className="bg-gray-200 p-0">Available Seat:{availableSeat}</p>
                    <p className="bg-gray-200 ml-3 p-0">Price{price}</p>

                </span>
                <p>Instructor: {name}</p>
                <div className="card-actions">
                    <button onClick={() => handleAddToCart(item)} disabled={isAdmin || isInstructor || availableSeat === 0} className="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>

    );
};

export default ClassCard;