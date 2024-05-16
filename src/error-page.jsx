import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex w-full flex-col justify-around lg:flex-row">
                <img src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=996&t=st=1684491474~exp=1684492074~hmac=7d03c402051f663bc5fb6c1d689a17a090272a1fe16c831ae6c080f6e20ea0bb" className="max-w-sm lg:w-1/2 rounded-lg shadow-2xl" />
                <div className="lg:w-1/2">
                    <h1 className="text-5xl my-5 font-bold">Page Not Found</h1>
                    
                    <Link to={"/"}><button className="btn btn-primary">Back to Home</button></Link>
                </div>
            </div>
        </div>
  );
}