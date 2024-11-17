import { FC, FormEvent } from "react";

interface SearchBarProps {
	handleSearch: (event: FormEvent<HTMLFormElement>) => void;
}
const SearchBar: FC<SearchBarProps> = ({ handleSearch }) => {
	return (
		<>
			<div className="">
				<form
					action=""
					className=" flex flex-row gap-4"
					onSubmit={handleSearch}
				>
					<div>
						<input
							type="text"
							name="search"
							placeholder="Search"
							className="input input-bordered w-24 md:w-auto lg:w-64"
						/>
					</div>
					<div>
						<button type="submit" className=" btn btn-accent w-24">
							Search
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default SearchBar;
