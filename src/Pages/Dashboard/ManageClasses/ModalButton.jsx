import { useState } from 'react';
import { useForm } from "react-hook-form";

const ModalButton = (props) => {
  const id = props?.item?._id
  const {
    register,
    handleSubmit
  } = useForm();

  const { handleClassUpdate } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className='bg-secondary btn' onClick={openModal}>Feedback</button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg w-80">
            <form
              className=" m-10 text-center"
              onSubmit={handleSubmit(handleClassUpdate)}
            >
              <label className="label">
                <span className="label-text">feedback</span>
              </label>
              <input type="text" {...register("feedback", { required: true })} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
              <input type="text" value={id || ""} {...register("_id")}  className="hidden" />
              <input type="submit" value="submit" className='btn btn-secondary mt-5' />
            </form>
            <div className="p-4 bg-gray-100 flex justify-end">
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalButton;
