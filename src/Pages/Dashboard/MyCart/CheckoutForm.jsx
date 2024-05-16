import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

// import '../../Style/style.css'
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutForm = ({ item, refetch }) => {
    const stripe = useStripe();
    const elements = useElements();

    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure()

    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('')

    useEffect(() => {
        if (item.price > 0) {
            axiosSecure
                .post('/create-payment-intent', { price: item.price })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [item, axiosSecure])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous',
                    },
                },
            })


        if (confirmError) {
            console.log(confirmError)
            setCardError(confirmError.message)
        }

        console.log('payment intent', paymentIntent)


        if (paymentIntent.status === 'succeeded') {

            // save payment information to the server
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price: item.price,
                date: new Date(),
                cartItem: item._id,
                classItem: item.classItemId,
                img: item.img,
                className: item.className,
                status: 'paid',
                itemName: item.name
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertResult) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'payment successful.',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          refetch()
                    }
                })
        }



    };

    return (
        <>
            <form className='my-10' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-sm mt-8 myButton ' type="submit" disabled={!stripe}>
                    Pay ${item.price}
                </button>
            </form>
            {cardError && <p className='text-red-600 ml-6'>{cardError}</p>}
        </>
    );
};

export default CheckoutForm;