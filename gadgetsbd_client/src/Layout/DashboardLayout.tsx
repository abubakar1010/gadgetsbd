import { NavLink, Outlet } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";
import { CircleLoader } from "react-spinners";

const DashboardLayout = () => {
	const sellerContent = (
		<>
			<NavLink className={({isActive}) => (
			isActive? "bg-accent p-4 rounded-md my-4" : "bg-gray-700 p-4 text-white rounded-md my-4"
		)} to="/"><li>Home</li></NavLink>
			<NavLink className={({isActive}) => (
			isActive? "bg-accent p-4 rounded-md my-4" : "bg-gray-700 p-4 text-white rounded-md my-4"
		)} to="/dashboard/seller-overview"><li>Overview</li></NavLink>
			<NavLink className={({isActive}) => (
			isActive? "bg-accent p-4 rounded-md my-4" : "bg-gray-700 p-4 text-white rounded-md my-4"
		)} to="/dashboard/add-product"><li>Add Product</li></NavLink>
			<NavLink className={({isActive}) => (
			isActive? "bg-accent p-4 rounded-md my-4" : "bg-gray-700 p-4 text-white rounded-md my-4"
		)} to="/dashboard/our-product"><li>Our Products</li></NavLink>
		</>
	);

    const buyerContent = (
        <>
        <NavLink className={({isActive}) => (
			isActive? "bg-accent p-4 rounded-md my-4" : "bg-gray-700 p-4 text-white rounded-md my-4"
		)} to="/"><li>Home</li></NavLink>
        <NavLink className={({isActive}) => (
			isActive? "bg-accent p-4 rounded-md my-4" : "bg-gray-700 p-4 text-white rounded-md my-4"
		)} to="/dashboard/buyer-overview"><li>Overview</li></NavLink>
        <NavLink className={({isActive}) => (
			isActive? "bg-accent p-4 rounded-md my-4" : "bg-gray-700 p-4 text-white rounded-md my-4"
		)} to="/dashboard/cart"><li>Cart</li></NavLink>
        <NavLink className={({isActive}) => (
			isActive? "bg-accent p-4 rounded-md my-4" : "bg-gray-700 p-4 text-white rounded-md my-4"
		)} to="/dashboard/wishlist"><li>Wishlist</li></NavLink>
        </>
    )

    const {user, fetching} = useAdmin()
	console.log(fetching, user);

	if(fetching) return <CircleLoader />
	
    
	return (
		<div className="drawer lg:drawer-open">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col items-center justify-center">
				{/* Page content here */}
				<Outlet />
				<label
					htmlFor="my-drawer-2"
					className="btn btn-primary drawer-button lg:hidden"
				>
					Open drawer
				</label>
			</div>
			<div className="drawer-side">
				<label
					htmlFor="my-drawer-2"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
					{/* Sidebar content here */}
					{
						user?.role === "Buyer"? buyerContent : sellerContent
					}
				</ul>
			</div>
		</div>
	);
};

export default DashboardLayout;
