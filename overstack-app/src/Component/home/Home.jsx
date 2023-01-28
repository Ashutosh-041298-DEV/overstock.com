
import { Deals } from "./Deals";
import { StaticProd } from "./StaticProduct"
import { ImageSlider } from "./HomeCrousel"
import { imagess, Offer_Deals, Static_Products } from "./data";
import { Image } from "@chakra-ui/react";
import banner from "./bannerimg.png"
export const Home = () => {
    
    return (
        <>
            <Image src={banner} mt="98px"/>
            <Deals offers={Offer_Deals} />
            <StaticProd prod = {Static_Products} />
            <ImageSlider imagess = {imagess} />
        </>
    )

}