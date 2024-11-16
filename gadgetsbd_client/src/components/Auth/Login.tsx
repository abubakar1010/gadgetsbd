import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface FormData {
	name: string;
	email: string;
	password: string;
	role: string;
}

const Login = () => {
	const {
		register,
		// setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = (data) => {
		console.log(data);
	};

	return (
		<div>
			<div className="hero bg-base-200 min-h-screen">
				<div className="hero-content flex-col lg:flex-row">
					<div className="text-center lg:text-left">
						<h1 className="text-5xl font-bold">Login now!</h1>
						<p className="py-6">
							Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
							excepturi exercitationem quasi. In deleniti eaque aut repudiandae
							et a id nisi.
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
									className="input input-bordered"
									{...register("email", { required: true })}
								/>
								{errors.email?.type === "required" && (
									<p className={"text-red-500 pt-2"} >Email is required</p>
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
									{...register("password", { required: true, minLength: 6, maxLength: 30 })}
								/>
								{errors.password?.type === "required" && (
									<p className={"text-red-500 pt-2"} >Password is required</p>
								)}
								{errors.password?.type === "minLength" && (
									<p className={"text-red-500 pt-2"} >Password must be at least 6 character long</p>
								)}
								{errors.password?.type === "maxLength" && (
									<p className={"text-red-500 pt-2"} >
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
	);
};

export default Login;
