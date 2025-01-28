import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  useColorModeValue,
  useToast,
  VStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Tooltip,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { TiCancel } from "react-icons/ti";
import useProductStore from "../../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { deleteProduct, updateProduct } = useProductStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);
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
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    const { success, message } = await updateProduct(id, updatedProduct);
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
      onClose();
    }
  };

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} mb={4} color={textColor}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <Tooltip
            label={
              <Text fontSize="x-small" fontStyle={"italic"} color="cyan.300">
                Update Item
              </Text>
            }
            bg="gray.800"
            color="white"
          >
            <Button onClick={onOpen}>
              <CiEdit
                style={{
                  color: "#4892bd",
                  fontSize: "22px",
                  cursor: "pointer",
                }}
              />
            </Button>
          </Tooltip>
          <Tooltip
            label={
              <Text
                fontSize="x-small"
                fontStyle={"italic"}
                fontWeight={"bold"}
                color="red.400"
              >
                Delete Item
              </Text>
            }
            bg="gray.800"
            color="white"
          >
            <Button onClick={() => handleDeleteProduct(product._id)}>
              <MdOutlineDeleteForever
                style={{
                  color: "#c24848",
                  fontSize: "22px",
                  cursor: "pointer",
                }}
              />
            </Button>
          </Tooltip>
        </HStack>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          if (
            !updateProduct.name ||
            !updateProduct.price ||
            !updateProduct.image
          ) {
            setUpdatedProduct(product);
            onClose();
          }
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) => {
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  });
                }}
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Tooltip
              label={
                <Text fontSize="x-small" fontStyle={"italic"} color="cyan.300">
                  Click to update
                </Text>
              }
              bg="gray.800"
              color="white"
            >
              <Button
                mr={3}
                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              >
                Update{" "}
                <RxUpdate
                  style={{
                    display: "inline",
                    color: "#20f7f7",
                    fontSize: "25px",
                    padding: "5px",
                  }}
                />
              </Button>
            </Tooltip>

            <Tooltip
              label={
                <Text
                  fontSize="x-small"
                  fontStyle={"italic"}
                  fontWeight={"bold"}
                  color="red.400"
                >
                  Click to cancel
                </Text>
              }
              bg="gray.800"
              color="white"
            >
              <Button
                variant="ghost"
                onClick={() => {
                  if (
                    !updateProduct.name ||
                    !updateProduct.price ||
                    !updateProduct.image
                  ) {
                    setUpdatedProduct(product);
                    onClose();
                  }
                }}
              >
                Cancel{" "}
                <TiCancel
                  style={{
                    display: "inline",
                    color: "#ff3d6a",
                    fontSize: "30px",
                    padding: "5px",
                  }}
                />
              </Button>
            </Tooltip>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
