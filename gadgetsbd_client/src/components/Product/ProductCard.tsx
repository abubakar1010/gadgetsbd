
interface Product{
    brand: string
    category: string
    description: string
    email: string
    imageURL: string
    price: string
    stock: string
    title: string
    _id: string
}
interface ProductCardProps {
    item: Product; 
}
export default function ProductCard({item}: ProductCardProps) {
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
					<p className=" text-lg ">{item.description.length === 30? item.description : item.description.slice(0, 40)}</p>
					<div className="card-actions justify-end">
						<button className="btn btn-primary">Buy Now</button>
					</div>
				</div>
			</div>
		</div>
	);
}
