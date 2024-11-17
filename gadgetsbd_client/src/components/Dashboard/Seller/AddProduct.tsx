import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { baseURL } from "../../../utils/Constant";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../../hooks/useAuth";
interface FormData {
	title: string
	brand: string
	price: string
	stock: string
	category: string
	imageURL: string
	description: string
}
export default function AddProduct() {
	const auth = useAuth();
    const {
		register,
		// setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = (data) => {
        axios.post(`${baseURL}/add-product`,{product: {...data, email: auth!.user?.email}})
        .then((res) => {
            console.log(res?.data?.result?.acknowledged);
            console.log(res);
            if(res?.data?.result?.acknowledged){
                toast("product added successfully", {

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
            
        }).catch( error => {
            console.log(error);
            
        })
        
	};

	return (
		<>
			<div className="w-full px-12 py-8">
				<form onSubmit={handleSubmit(onSubmit)} className="">
					<div className="form-control">
						<label className="label">
							<span className="label-text">Product Title</span>
						</label>
						<input
							type="text"
							placeholder="Product Title"
							className="input input-bordered"
							{...register("title", { required: true })}
						/>
						{errors.title?.type === "required" && (
							<p className={"text-red-500 pt-2"}>Product Title is required</p>
						)}
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Product Brand</span>
						</label>
						<input
							type="text"
							placeholder="Product Brand"
							className="input input-bordered"
							{...register("brand", { required: true })}
						/>
						{errors.brand?.type === "required" && (
							<p className={"text-red-500 pt-2"}>Product Brand is required</p>
						)}
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Product price</span>
						</label>
						<input
							type="text"
							placeholder="Product Price"
							className="input input-bordered"
							{...register("price", { required: true })}
						/>
						{errors.price?.type === "required" && (
							<p className={"text-red-500 pt-2"}>Product Price is required</p>
						)}
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Product Stock</span>
						</label>
						<input
							type="text"
							placeholder="Product Stock"
							className="input input-bordered"
							{...register("stock", { required: true })}
						/>
						{errors.stock?.type === "required" && (
							<p className={"text-red-500 pt-2"}>Product Stock is required</p>
						)}
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Product Category</span>
						</label>
						<input
							type="text"
							placeholder="Product Category"
							className="input input-bordered"
							{...register("category", { required: true })}
						/>
						{errors.category?.type === "required" && (
							<p className={"text-red-500 pt-2"}>Product Category is required</p>
						)}
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Image URL</span>
						</label>
						<input
							type="text"
							placeholder="Image URL"
							className="input input-bordered"
							{...register("imageURL", { required: true })}
						/>
						{errors.imageURL?.type === "required" && (
							<p className={"text-red-500 pt-2"}>Image url is required</p>
						)}
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Product Description</span>
						</label>
                        <textarea className="textarea textarea-bordered" placeholder="Product Description"
                        {...register("description", { required: true })}
                        ></textarea>
						
						{errors.description?.type === "required" && (
							<p className={"text-red-500 pt-2"}>Product description is required</p>
						)}
					</div>
					

					<div className="form-control mt-6">
						<button type="submit" className="btn btn-primary">
							Add Product
						</button>
						
					</div>
				</form>
			</div>
            <Toaster />
		</>
	);
}
