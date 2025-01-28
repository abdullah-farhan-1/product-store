import { Container, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { TbDatabaseX } from "react-icons/tb";
import { TbDatabase } from "react-icons/tb";
import { Link } from "react-router-dom";
import useProductStore from "../../store/product";
import { useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { PiSmileyXEyes } from "react-icons/pi";
import { TbError404 } from "react-icons/tb";

const HomePage = () => {
  const { products, fetchProducts } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={40}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
          {products && products.length > 0 ? (
            <TbDatabase
              style={{
                display: "inline",
                fontSize: "30px",
                margin: "0px 10px",
                color: "#20f7f7",
              }}
            />
          ) : (
            <TbDatabaseX
              style={{
                display: "inline",
                fontSize: "30px",
                margin: "0px 10px",
                color: "#20f7f7",
              }}
            />
          )}
        </Text>

        {products && products.length === 0 ? (
          <Text
            as="div"
            fontSize={"30"}
            textAlign={"center"}
            fontWeight={"bold"}
            color="gray.500"
          >
            Oh, Found Nothing!{" "}
            <PiSmileyXEyes
              style={{
                display: "inline",
                color: "#757574",
                paddingTop: "5px",
              }}
            />
            <Link to={"/create"}>
              <Text
                fontSize={"15"}
                color={"blue.500"}
                fontStyle={"italic"}
                _hover={{ textDecoration: "underline" }}
                m={5}
              >
                Click here to add
              </Text>
              <TbError404
                style={{
                  margin: "10px",
                  fontSize: "400px",
                  display: "inline",
                  color: "#757574",
                }}
              />
            </Link>
          </Text>
        ) : (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w={"full"}
          >
            {products.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
