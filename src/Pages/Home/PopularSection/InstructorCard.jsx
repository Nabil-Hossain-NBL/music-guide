const InstructorCard = ({item}) => {
    return (
        <div className="card w-80 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={item.img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2>{item.name}</h2>

            </div>
        </div>
    );
};

export default InstructorCard;