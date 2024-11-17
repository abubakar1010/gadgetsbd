export default function SideBar() {
	return (
		<div className=" max-w-64 bg-[rgb(192,196,200)] min-h-screen px-4 py-16">
			<h1 className=" text-2xl font-medium">Filter Products</h1>

			<div className=" mt-6">
				<select  className="select select-bordered w-full max-w-xs">
					<option disabled selected>
						Category
					</option>
					<option>Laptop</option>
					<option>Smartphone</option>
					<option>Smartwatch</option>
					<option>Headphone</option>
				</select>
			</div>
			<div className=" mt-6">
				<select className="select select-bordered w-full max-w-xs">
					<option disabled selected>
						Brand
					</option>
					<option value="apple">Apple</option>
					<option value={"samsung"}>Samsung</option>
                    <option value="Sonic">Sonic</option>
                    <option value="Sonic">Vivo</option>
				</select>
			</div>
            <button className=" btn btn-accent w-full mt-6">Reset</button>
		</div>
	);
}
