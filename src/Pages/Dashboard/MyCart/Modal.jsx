import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(`${import.meta.env.VITE_Payment_PK}`);

const Modal = ({item, refetch}) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="w-full">
                <button className='bg-secondary btn' onClick={openModal}>PAY</button>

                {isModalOpen && (
                    <div className="fixed w-full inset-0 flex items-center justify-center z-50">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white rounded-lg w-80">
                            <p className="font-bold text-center">PAY here</p>
                            <Elements stripe={stripePromise}><CheckoutForm item={item} refetch={refetch}></CheckoutForm></Elements>
                            <div className="p-4 bg-gray-100 flex justify-end">
                                <button onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Modal;