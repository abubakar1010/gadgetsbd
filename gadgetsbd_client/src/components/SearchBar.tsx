export default function SearchBar() {
	return (
		<>
			<div className="form-control flex-row gap-2">
				<div>
                <input
					type="text"
					placeholder="Search"
					className="input input-bordered w-24 md:w-auto lg:w-64"
				/>
                </div>
                <div>
                <button className=" btn btn-accent w-24">Search</button>

                </div>
			</div>
		</>
	);
}
