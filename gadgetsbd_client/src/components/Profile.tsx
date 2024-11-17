import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {

    const auth = useAuth()

    const handleLogout = () => {
        auth!.logout()
        .then( () => {
            console.log(auth);
            toast('you are successfully logout', {
                duration: 2000,
                position: 'top-center',
              
                // Styling
                style: {},
                className: '',
              
                // Custom Icon
                icon: '👏',
              
                // Change colors of success/error/loading icon
                iconTheme: {
                  primary: '#000',
                  secondary: '#fff',
                },
              
                // Aria
                ariaProps: {
                  role: 'status',
                  'aria-live': 'polite',
                },
              });
        })
        .catch( (error) => {
            toast(`${error.message}`, {
                duration: 4000,
                position: 'top-center',
              
                // Styling
                style: {},
                className: '',
              
                // Custom Icon
                icon: '👏',
              
                // Change colors of success/error/loading icon
                iconTheme: {
                  primary: '#000',
                  secondary: '#fff',
                },
              
                // Aria
                ariaProps: {
                  role: 'status',
                  'aria-live': 'polite',
                },
              });
        })
    }

	const listItem = (
		<>
			<li>
				<Link to="/profile" className="justify-between">
					Profile
				</Link>
			</li>
			<li>
				<Link to="/dashboard" className="justify-between">
					Dashboard
				</Link>
			</li>
			<li>
				<p onClick={handleLogout}>Logout</p>
			</li>
		</>
	);
	return (
		<>
			<div className="dropdown dropdown-end">
				<div
					tabIndex={0}
					role="button"
					className="btn btn-ghost btn-circle avatar"
				>
					<div className="w-10 rounded-full">
						<img
							alt="Tailwind CSS Navbar component"
							src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						/>
					</div>
				</div>
				<ul
					tabIndex={0}
					className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
				>
					{listItem}
				</ul>
			</div>
            <Toaster />
		</>
	);
};

export default Profile;
