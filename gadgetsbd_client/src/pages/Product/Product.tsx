import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Filter from "../../components/Product/Filter";
import SideBar from "../../components/Product/SideBar";
import SearchBar from "../../components/SearchBar";
import axios from "axios";
import { baseURL } from "../../utils/Constant";
import Loading from "../../components/Loading";
import ProductCard from "../../components/Product/ProductCard";
import { useUserData } from "../../hooks/useUserData";

interface Product {
	brand: string;
	category: string;
	description: string;
	email: string;
	imageURL: string;
	price: string;
	stock: string;
	title: string;
	_id: string;
}

interface Filter {
	title: string;
	sort: string;
	brand: string;
	category: string;
}

interface ProductInfo {
	productBrand: string[];
	productCategory: string[];
	totalProduct: number;
}
const Product = () => {
	const user = useUserData();

	const initialState: Filter = {
		title: "",
		sort: "acc",
		brand: "",
		category: "",
	};

	const initialProductInfo: ProductInfo = {
		productBrand: [],
		productCategory: [],
		totalProduct: 0,
	};

	const [product, setProduct] = useState<Product[] | []>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [filter, setFilter] = useState<Filter>(initialState);
	const [productInfo, setProductInfo] = useState(initialProductInfo);
	const [page, SetPage] = useState(1);
	const limit = 9;
	const totalPage = Math.ceil(productInfo.totalProduct / 9);

	useEffect(() => {
		setLoading(true);
		axios
			.get(
				`${baseURL}/all-product?title=${filter.title}&brand=${filter.brand}&category=${filter.category}&sort=${filter.sort}&page=${page}&limit=${limit}`
			)
			.then((res) => {
				setProduct(res.data.result);
				const productInfos = {
					productBrand: res.data.productBrand,
					productCategory: res.data.productCategory,
					totalProduct: res.data.totalProduct,
				};
				setProductInfo(productInfos);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [filter.brand, filter.category, filter.sort, filter.title, page]);

	const handleSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setFilter((prev) => ({
			...prev,
			title: (e.target as HTMLFormElement).search.value,
		}));
	};

	const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		console.log(e.target.value);
		setFilter((prev) => ({ ...prev, sort: e.target.value }));
	};

	const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		setFilter((prev) => ({ ...prev, category: e.target.value }));
	};
	const handleBrand = (e: ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		setFilter((prev) => ({ ...prev, brand: e.target.value }));
	};

	const handleReset = () => {
		setFilter(initialState);
		window.location.reload();
	};

	const handlePagination = (pageNumber: number) => {
		if (pageNumber >= 1 && pageNumber <= totalPage) {
			SetPage(pageNumber);
		}
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleWishlist = (id: string) => {
		const email = user.email;
		const productId = id;
		axios
			.patch(`${baseURL}/add-to-wishlist`, { email, productId })
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<div className=" container mx-auto ">
				<div className=" flex items-center justify-between my-12">
					<SearchBar handleSearch={handleSearch} />
					<Filter handleSort={handleSort} />
				</div>
				<div className=" flex gap-12">
					<div className="lg:w-72">
						<SideBar
							handleCategory={handleCategory}
							handleBrand={handleBrand}
							handleReset={handleReset}
							productInfo={productInfo}
						/>
					</div>
					<div className=" w-full">
						{loading === true ? (
							<Loading />
						) : (
							<>
								{product.length === 0 ? (
									<>
										<h1>Product not found</h1>
									</>
								) : (
									<div className=" grid grid-cols-3 w-full gap-12">
										{product.map((item) => (
											<div key={item._id}>
												<ProductCard
													handleWishlist={handleWishlist}
													item={item}
													wishlistItem={false}
												/>
											</div>
										))}
									</div>
								)}
							</>
						)}
						<div className="join my-7 text-center flex justify-center">
							<button
								onClick={() => handlePagination(page - 1)}
								className="join-item btn"
							>
								«
							</button>
							<button className="join-item btn">
								Page {page} of {totalPage}{" "}
							</button>
							<button
								onClick={() => handlePagination(page + 1)}
								className="join-item btn"
							>
								»
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Product;
