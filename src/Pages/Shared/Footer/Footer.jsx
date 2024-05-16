import { FaFacebook, FaGuitar, FaInstagram, FaMusic, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (

        <footer className=" mb-0 p-10 bg-neutral mt-14 text-neutral-content">
            <div className="footer">
                <div className="text-center" >
                    <Link to='/' className="btn btn-ghost normal-case text-white font-bold text-xl">MusicGuide</Link>
                    <span className="flex font-bold text-5xl text-center"><FaGuitar></FaGuitar> <FaMusic></FaMusic></span>
                </div>
                <div>
                    <h1 to='/' className="font-bold text-2xl">Pages</h1>
                    <Link to={"/"}><p>Home</p></Link>
                    <Link to={"/allclass"}><p>Classes</p></Link>
                    <Link to={"/allinstructors"}><p>Instructors</p></Link>
                </div>
                <div>
                    <span className="font-bold text-2xl">Social</span>
                    <div className="grid text-4xl grid-flow-col gap-4">
                        <FaYoutube></FaYoutube>
                        <FaFacebook></FaFacebook>
                        <FaInstagram></FaInstagram>
                    </div>
                </div>
            </div>
            <hr className="mt-10" />
            <p className="mb-0 mt-5 text-center">© 2024 MusicGuide</p>
        </footer>
    );
};

export default Footer;