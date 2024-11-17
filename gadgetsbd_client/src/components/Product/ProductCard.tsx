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
interface ProductCardProps {
	item: Product;
	handleWishlist: (id: string) => void;
	wishlistItem: boolean;
}
export default function ProductCard({
	item,
	handleWishlist,
	wishlistItem = false,
}: ProductCardProps) {
	return (
		<div>
			<div className="card card-compact bg-base-100 h-[620px] shadow-xl">
				<figure>
					<img
						src={item.imageURL}
						alt={item.title}
						className=" h-[340px] w-full object-cover"
					/>
				</figure>
				<div className="card-body">
					<h2 className="card-title text-xl">{item.title}</h2>
					<p>{item.price} $</p>
					<p className=" text-lg ">
						{item.description.length === 30
							? item.description
							: item.description.slice(0, 40)}
					</p>
					<div className="card-actions justify-end">
						{wishlistItem ? (
							<button
								onClick={() => handleWishlist(item._id)}
								className="btn btn-primary btn-error"
							>
								Remove From Wishlist
							</button>
						) : (
							<button
								onClick={() => handleWishlist(item._id)}
								className="btn btn-primary"
							>
								Add To Wishlist
							</button>
						)}
						<button className="btn btn-primary">Buy Now</button>
					</div>
				</div>
			</div>
		</div>
	);
}
