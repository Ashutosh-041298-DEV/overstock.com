import { SimpleGrid } from "@chakra-ui/react";
import { Card, CardBody, Image, Text, Box, Heading ,Divider } from "@chakra-ui/react";

export const StaticProd = ({ prod }) => {
  return (
    <>
      <Box width="90%" ml="5%" mt="50px">
        <Heading align="center" mb="50px" fontSize="27px">
          Fresh Finds in Each Category
        </Heading>
        <SimpleGrid columns={[1, 2, 3, 4]} gap="30px">
          {prod.map((e) => {
            return (
              <Card>
                <CardBody align="center">
                  <Image src={e.src} mb="10px" width="300px" />
                  <Divider/>
                   <Text fontSize={"12px"} fontWeight={"bold"}>
                    {e.Title}
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
