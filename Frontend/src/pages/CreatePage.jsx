import {
  Box,
  Container,
  Heading,
  useColorModeValue,
  VStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  HStack,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoReturnUpBackOutline } from "react-icons/io5";
import useProductStore from "../../store/product";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [newProductForm, setNewProductForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProductForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProductForm);

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
      setNewProductForm({ name: "", price: "", image: "" });
    }
  };

  return (
    <Container maxW={"container.sm"} py={14}>
      <VStack spacing={8}>
        <Heading size={"xl"} textAlign={"center"} mb={8}>
          Add New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <InputGroup>
              <InputLeftAddon>Name: </InputLeftAddon>
              <Input
                placeholder="e.g. Earphones"
                name="name"
                value={newProductForm.name}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Price: </InputLeftAddon>
              <Input
                placeholder="e.g. $200"
                name="price"
                type="number"
                value={newProductForm.price}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Image URL: </InputLeftAddon>
              <Input
                placeholder="e.g. productimage.com"
                name="image"
                value={newProductForm.image}
                onChange={handleChange}
              />
            </InputGroup>
            <HStack spacing={2}>
              <Tooltip
                label={
                  <Text
                    fontSize="x-small"
                    fontStyle={"italic"}
                    color="cyan.300"
                  >
                    Click to Add
                  </Text>
                }
                bg="gray.800"
                color="white"
              >
                <Button onClick={handleAddProduct}>
                  Add{" "}
                  <IoIosAdd
                    fontSize={20}
                    style={{ display: "inline", marginLeft: "5px" }}
                  />
                </Button>
              </Tooltip>
              <Tooltip
                label={
                  <Text
                    fontSize="x-small"
                    fontStyle={"italic"}
                    color="cyan.300"
                  >
                    Go Back
                  </Text>
                }
                bg="gray.800"
                color="white"
              >
                <Link to={"/"}>
                  <Button>
                    Back{" "}
                    <IoReturnUpBackOutline
                      style={{ display: "inline", marginLeft: "5px" }}
                      fontSize={20}
                    />{" "}
                  </Button>
                </Link>
              </Tooltip>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
