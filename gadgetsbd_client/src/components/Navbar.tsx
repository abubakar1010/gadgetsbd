import { Link, NavLink } from "react-router-dom";
import Profile from "./Profile";
import { useUserData } from "../hooks/useUserData";

const Navbar = () => {
	const user = useUserData()
	const listItem = (
		<>
			<NavLink
				to={"/"}
				className={({ isActive }) =>
					isActive
						? "text-lg  rounded-md text-accent border border-accent px-4 py-1 mx-2"
						: "text-lg text-gray-600 px-3"
				}
			>
				<li>Home</li>
			</NavLink>
			<NavLink
				to={"/product"}
				className={({ isActive }) =>
					isActive
						? "text-lg  rounded-md text-accent border border-accent px-4 py-1 mx-2"
						: "text-lg text-gray-600 px-3"
				}
			>
				<li>Product</li>
			</NavLink>
			<NavLink
				to={"/support"}
				className={({ isActive }) =>
					isActive
						? "text-lg  rounded-md text-accent border border-accent px-4 py-1 mx-2"
						: "text-lg text-gray-600 px-3"
				}
			>
				<li>Support</li>
			</NavLink>
		</>
	);

	return (
		<>
			<div className="navbar bg-base-100">
				<div className="navbar-start">
					<div className="dropdown">
						<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
						>
							{listItem}
						</ul>
					</div>
					<a className="btn btn-ghost text-xl">daisyUI</a>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal px-1">{listItem}</ul>
				</div>
				<div className="navbar-end">
					<div className=" w-full flex justify-end gap-5">
						{user ? (
							<Profile />
						) : (
							<>
								<Link to={"/login"}>
									<button className=" btn  btn-accent">Login</button>
								</Link>
								<Link to={"/register"}>
									<button className=" btn btn-outline btn-accent">
										Register
									</button>
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
