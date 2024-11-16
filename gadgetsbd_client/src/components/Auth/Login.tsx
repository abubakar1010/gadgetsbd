import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { User, UserCredential } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

interface FormData {
	name: string;
	email: string;
	password: string;
	role: string;
}

const Login = () => {
	const auth = useAuth();

	const {
		register,
		// setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = (data) => {
		console.log(data);
		auth
			?.login(data.email, data.password)
			.then((userCredential: UserCredential) => {
				const user: User = userCredential.user;
				if (user) {
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
										<span className="label-text">Email</span>
									</label>
									<input
										type="email"
										placeholder="email"
										autoComplete="username"
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
										autoComplete="current-password"
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

								<div className="form-control mt-6">
									<button type="submit" className="btn btn-primary">
										Login
									</button>
									<div className=" flex justify-center items-center gap-2">
										<span>Don't have an account?</span>
										<Link className=" text-accent underline" to={"/register"}>
											Register
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

export default Login;
