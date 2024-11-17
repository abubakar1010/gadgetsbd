import { ChangeEvent, FC, MouseEvent } from "react";

interface ProductInfo{
    productBrand: string[]
    productCategory: string[]
    totalProduct: number
}
interface SideBarProps {
	handleBrand: (event: ChangeEvent<HTMLSelectElement>) => void;
	handleCategory: (event: ChangeEvent<HTMLSelectElement>) => void;
	handleReset: (event: MouseEvent<HTMLButtonElement>) => void;
    productInfo: ProductInfo
}

const SideBar: FC<SideBarProps> = ({handleBrand, handleCategory, handleReset, productInfo}) => {
    
	return (
		<div className=" max-w-64 bg-[rgb(192,196,200)] min-h-screen px-4 py-16">
			<h1 className=" text-2xl font-medium">Filter Products</h1>

			<div className=" mt-6">
				<select onChange={handleCategory}  className="select select-bordered w-full max-w-xs">
					<option disabled selected>
						Category
					</option>
                    {
                        productInfo.productCategory.map( item =><option>{item}</option> )
                    }
				</select>
			</div>
			<div className=" mt-6">
				<select onChange={handleBrand} className="select select-bordered w-full max-w-xs">
					<option disabled selected>
						Brand
					</option>
					{
                        productInfo.productBrand.map( item =><option>{item}</option> )
                    }
				</select>
			</div>
            <button onClick={handleReset} className=" btn btn-accent w-full mt-6">Reset</button>
		</div>
	);
}

export default SideBar