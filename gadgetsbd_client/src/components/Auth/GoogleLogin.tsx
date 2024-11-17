import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { User, UserCredential } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../utils/Constant";

const GoogleLogin = () => {
	const auth = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const handleGoogleLogin = () => {
		auth!
			.loginWithGoogle()
			.then((userCredential: UserCredential) => {
				const user: User = userCredential.user;
				if (user) {
					const newUser = {
						name: user.displayName,
						email: user.email,
						password: "123456",
						role: "Buyer",
						status: "approved",
						wishlist: [],
					};

					axios
						.post(`${baseURL}/create-user`, { user: newUser })
						.then((res) => {
							console.log(res.data);
							if (res.data.result) {
								toast("user created successfully", {
									duration: 1000,
									position: "top-center",

									// Styling
									style: {},
									className: "",

									// Custom Icon
									icon: "👏",

									// Change colors of success/error/loading icon
									iconTheme: {
										primary: "#000",
										secondary: "#fff",
									},

									// Aria
									ariaProps: {
										role: "status",
										"aria-live": "polite",
									},
								});
							}
						})
						.catch((error) => {
							console.log(error);
						});
					toast("you are successfully logged in", {
						duration: 2000,
						position: "top-center",

						// Styling
						style: {},
						className: "",

						// Custom Icon
						icon: "👏",

						// Change colors of success/error/loading icon
						iconTheme: {
							primary: "#000",
							secondary: "#fff",
						},

						// Aria
						ariaProps: {
							role: "status",
							"aria-live": "polite",
						},
					});
					navigate(location.state ? location.state : "/");
				}
			})
			.catch((error) => {
				toast(`${error.message}`, {
					duration: 4000,
					position: "top-center",

					// Styling
					style: {},
					className: "",

					// Custom Icon
					icon: "👏",

					// Change colors of success/error/loading icon
					iconTheme: {
						primary: "#000",
						secondary: "#fff",
					},

					// Aria
					ariaProps: {
						role: "status",
						"aria-live": "polite",
					},
				});
			});
	};

	return (
		<>
			<div
				onClick={handleGoogleLogin}
				className=" flex justify-center items-center w-full gap-2 border-2 border-accent p-2 rounded-md mt-3 cursor-pointer"
			>
				<div className=" flex justify-center items-center gap-4">
					<FcGoogle className=" text-2xl" />
					<p className=" text-lg">Login With Google</p>
				</div>
			</div>
			<Toaster />
		</>
	);
};

export default GoogleLogin;
