
import { Hero } from "./Hero";
import { Deals } from "./Deals";
import { StaticProd } from "./StaticProduct"
import { ImageSlider } from "./HomeCrousel"
import { imagess, Offer_Deals, Static_Products } from "./data";
export const Home = () => {
    
    return (
        <>
            <Hero />
            <Deals offers={Offer_Deals} />
            <StaticProd prod = {Static_Products} />
            <ImageSlider imagess = {imagess} />
        </>
    )

}