import { SimpleGrid } from "@chakra-ui/react";
import { Card, CardBody, Image , Text, Box ,Heading,Divider } from "@chakra-ui/react";

export const Deals = ({ offers }) => {
  return (
    <>      
      <Box width="70%" ml="15%" mt="50px">
      <Heading align="center" mb="50px" fontSize="27px" > Limited Time Deals </Heading>
        <SimpleGrid columns={[1, 2, 2, 3]} gap="30px">
          {offers.map((e) => {
            return (
              <Card>
                <CardBody align="center" backgroundColor={"#FEF8E8"}>
                  <Image src={e.src} mb="10px" />
                  <Divider/>
                  <Text fontSize={"16px"} fontWeight={"bold"}>
                    {e.title}
                  </Text>
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>
      </Box>
    </>
  );
};
