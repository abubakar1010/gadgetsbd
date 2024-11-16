import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { User, UserCredential } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { baseURL } from "../../utils/Constant";

interface FormData {
	name: string;
	email: string;
	password: string;
	role: string;
}

const Register = () => {
	const auth = useAuth();
	const navigate = useNavigate()

	const {
		register,
		// setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = (data) => {
		auth!
			.createUser(data.email, data.password)
			.then((userCredential: UserCredential) => {
				const user: User = userCredential.user;
				if (user.email) {
					toast("you are successfully registered", {
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

					const user = {
						name: data.name,
						email: data.email,
						password: data.password,
						role: data.role,
						status: data.role === "Buyer"? "approved" : "pending" ,
						wishlist: [],
					}

					axios.post(`${baseURL}/user`, {user})
					.then( res => {
						console.log(res.data);
						
					})
					.catch( (error) => {
						console.log(error);
						
					})
				}
				navigate("/")
			})
			.catch((error) => {
				toast(`${error.message}`, {
					duration: 4000,
					position: "top-center",

					// Styling
					style: {},
					className: "",

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
			<div>
				<div className="hero bg-base-200 min-h-screen">
					<div className="hero-content flex-col lg:flex-row">
						<div className="text-center lg:text-left">
							<h1 className="text-5xl font-bold">Login now!</h1>
							<p className="py-6">
								Provident cupiditate voluptatem et in. Quaerat fugiat ut
								assumenda excepturi exercitationem quasi. In deleniti eaque aut
								repudiandae et a id nisi.
							</p>
						</div>
						<div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
							<form onSubmit={handleSubmit(onSubmit)} className="card-body">
								<div className="form-control">
									<label className="label">
										<span className="label-text">Name</span>
									</label>
									<input
										type="name"
										placeholder="name"
										className="input input-bordered"
										{...register("name", { required: true })}
									/>
									{errors.name?.type === "required" && (
										<p className={"text-red-500 pt-2"}>Name is required</p>
									)}
								</div>
								<div className="form-control">
									<label className="label">
										<span className="label-text">Email</span>
									</label>
									<input
										type="email"
										placeholder="email"
										className="input input-bordered"
										{...register("email", { required: true })}
									/>
									{errors.email?.type === "required" && (
										<p className={"text-red-500 pt-2"}>Email is required</p>
									)}
								</div>
								<div className="form-control">
									<label className="label">
										<span className="label-text">Password</span>
									</label>
									<input
										type="password"
										placeholder="password"
										className="input input-bordered"
										{...register("password", {
											required: true,
											minLength: 6,
											maxLength: 30,
										})}
									/>
									{errors.password?.type === "required" && (
										<p className={"text-red-500 pt-2"}>Password is required</p>
									)}
									{errors.password?.type === "minLength" && (
										<p className={"text-red-500 pt-2"}>
											Password must be at least 6 character long
										</p>
									)}
									{errors.password?.type === "maxLength" && (
										<p className={"text-red-500 pt-2"}>
											Password is too long. Please limit it to 30 characters.
										</p>
									)}
								</div>
								<div className="form-control">
									<label className="label">
										<span className="label-text">Role</span>
									</label>
									<select
										className="input input-bordered"
										defaultValue={"Buyer"}
										{...register("role", { required: true })}
									>
										<option value="Seller">Seller</option>
										<option value="Buyer">Buyer</option>
									</select>
									{errors.role?.type === "required" && (
										<p className={"text-red-500 pt-2"}>Role is required</p>
									)}
								</div>
								<div className="form-control mt-6">
									<button type="submit" className="btn btn-accent">
										Register
									</button>
									<div className=" flex justify-center items-center gap-2">
										<span>Already have an account?</span>
										<Link className=" text-accent underline" to={"/login"}>
											login
										</Link>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<Toaster />
		</>
	);
};

export default Register;
