import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddClass = () => {
    const { register, handleSubmit, reset } = useForm();
    console.log(img_hosting_token);

    const [axiosSecure] = useAxiosSecure()
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.image[0])
        console.log(data);

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const totalStudent = 0;
                    const status = 'pending';
                    const { className, availableSeat, price, name, email } = data;
                    const newClass = { className, availableSeat: parseInt(availableSeat), price: parseFloat(price), name, email, totalStudent: totalStudent, img: imgURL, status: status, feedback: '' }
                    console.log(newClass)
                    axiosSecure.post('/allClass', newClass)
                        .then(data => {
                            console.log('after posting new menu item', data.data)
                            if (data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Class added successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })
    }


    const { user } = useAuth()
    return (
        <div className="w-full flex justify-center">

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Class Name?</span>
                    </label>
                    <input type="text" {...register("className", { required: true })} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <label className="label">
                        <span className="label-text">Available Seat?</span>
                    </label>
                    <input type="number" {...register("availableSeat", { required: true })} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <label className="label">
                        <span className="label-text">Price?</span>
                    </label>
                    <input type="number" {...register("price", { required: true })} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <label className="label">
                        <span className="label-text">Insatructor Name</span>
                    </label>
                    <input type="text" value={user?.displayName || ""} {...register("name")} readOnly placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <label className="label">
                        <span className="label-text">Insatructor Email</span>
                    </label>
                    <input type="text" value={user?.email || ""} {...register("email")} readOnly placeholder="Type here" className="input input-bordered w-full max-w-xs" />

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Pick a file</span>
                        </label>
                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full max-w-xs" />

                    </div>

                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" type="submit"  > submit</button>

                    </div>

                </div>
            </form>
        </div>
    );
};

export default AddClass;