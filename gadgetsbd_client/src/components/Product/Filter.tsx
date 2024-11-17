import { ChangeEvent, FC } from "react";
interface FilterProps {
	handleSort: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Filter: FC<FilterProps> = ({ handleSort }) => {
    return (
		<>
			<select onChange={handleSort} className="select select-bordered w-full max-w-xs">
				<option disabled selected>
					Sort By Price
				</option>
				<option value={"acc"}>Low To High</option>
				<option value={"dec"}>High To Low</option>
			</select>
		</>
	);
};

export default Filter;

