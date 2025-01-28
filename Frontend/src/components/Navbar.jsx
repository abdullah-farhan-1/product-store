import {
  Container,
  Flex,
  Text,
  HStack,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { LuCirclePlus } from "react-icons/lu";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { useColorMode } from "@chakra-ui/react";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgClip={"text"}
          bgGradient="linear(to-r, #20f7f7, blue.500)"
        >
          <Link to={"/"}>
            Product Store
            <LiaShoppingCartSolid
              style={{
                display: "inline",
                fontSize: "22px",
                margin: "0px 5px",
                color: "#20f7f7",
              }}
            />
          </Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Tooltip
              label={
                <Text fontSize="x-small" fontStyle={"italic"} color="cyan.300">
                  Add a product
                </Text>
              }
              bg="gray.800"
              color="white"
            >
              <Button>
                <LuCirclePlus fontSize={20} />
              </Button>
            </Tooltip>
          </Link>

          <Tooltip
            label={
              <Text fontSize="x-small" fontStyle={"italic"} color="cyan.300">
                Toggle mode
              </Text>
            }
            bg="gray.800"
            color="white"
          >
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? (
                <CiDark fontSize={20} />
              ) : (
                <CiLight fontSize={20} />
              )}
            </Button>
          </Tooltip>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
