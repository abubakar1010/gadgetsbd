const Banner = (props: { image: string }) => {
	const { image } = props;
	console.log(image);

	return (
		<>
			<div
				className="bg-center bg-cover w-full  min-h-[90vh] "
				style={{
					backgroundImage: `url(${image})`,
				}}
			>
				<div className=" flex flex-col items-center pt-16 justify-center text-neutral-content text-center">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold">I Phone 16 Pro</h1>
						<p className="mb-5 text-xl ">Hello, Apple Intelligence</p>
						<div className=" flex items-center justify-center gap-8">
							<button className="btn btn-accent ">Learn More</button>
							<button className="btn btn-outline btn-accent
							">Buy Now</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Banner;
