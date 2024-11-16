import Banner from "../../components/Home/Banner";

const Home = () => {
    const imageUrl = "https://www.apple.com/v/home/bv/images/heroes/iphone-16-pro/hero_iphone16pro_avail__fnf0f9x70jiy_large.jpg"
	return (
		<div>
			<Banner image={imageUrl} />
		</div>
	);
};

export default Home;
