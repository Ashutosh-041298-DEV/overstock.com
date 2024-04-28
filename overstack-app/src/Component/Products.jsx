import React, { useEffect, useState } from "react";
import "./Mugs.css";
import {
  ChevronDownIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";

import { Button, Flex, Spinner, useToast } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Icon } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import { useSelector } from "react-redux";

const Products = () => {
  const toast = useToast();
  const { category: initialCategory } = useParams();
  const [state, setState] = useState({
    category: initialCategory,
    page: 1,
    order: "asc",
    data: [],
    loading: false,
    color: false,
  });

  const { isAdmin } = useSelector((state) => state);
 
// CALLING THE API WHENEVER THERE IS A CHANGE IN THE COMPONENTS
  useEffect(() => {
    fetchData();
  }, [state.category, state.page, state.order]);

// CHANGING DATA AS PER THE CHANGE OF PAGE
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      page: 1,
      category: initialCategory,
      order: "asc"
    }));
  }, [initialCategory]);

  const fetchData = () => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    axios
      .get(
        `https://stock-server.onrender.com/products?category=${state.category}&_limit=12&_page=${state.page}&_sort=price&_order=${state.order}`
      )
      .then((r) => {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          data: r.data,
        }));
        console.log(r.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://stock-server.onrender.com/products/${id}`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          data: prevState.data.filter((e) => e.id !== id),
        }));
        toast({
          title: "Delete Successfull.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => console.log(err));
  };

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const handleHeart = (id) => {
    setState((prevState) => ({
      ...prevState,
      color: !prevState.color,
    }));
    console.log(id);
  };

  return (
    <div className="Container">
      <h1>{toTitleCase(state.category)}</h1>
      <div className="SearchBy">
        <label>SortBy:</label>
        <select
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              order: e.target.value,
            }))
          }
          style={{ width: "16%", border: "1px solid black", marginLeft: "15px" }}
        >
          <option name="price" value="asc">
            Price Low-High
          </option>
          <option name="price" value="desc">
            Price High-Low
          </option>
        </select>
      </div>
      {state.loading && (
        <Flex justifyContent={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            mt="8%"
          />
        </Flex>
      )}
      <div className="MugsData">
        {!state.loading &&
          state.data.length > 0 &&
          state.data.map((item) => (
            <div className="Mugs" key={item.id}>
              <div>
                <Icon
                  className="heart"
                  onClick={() => handleHeart(item.id)}
                  backgroundColor={state.color ? "red" : null}
                  cursor="pointer"
                  m="5px"
                  padding="2px"
                  color={state.color ? "white" : "grey"}
                  w={6}
                  h={5}
                  border="1px solid grey"
                  borderRadius="50%"
                  as={FiHeart}
                />
              </div>
              <div>
                <img alt="some" src={item.image} />
              </div>
              <span>Featured</span>
              <div style={{ display: "flex" }}>
                <h1>${item.price}</h1>
                <Link to={`/products/${item.id}`}>
                  <span className="icon">
                    <ChevronDownIcon />
                    More details
                  </span>
                </Link>
              </div>
              {item.count && (
                <Flex ml={"10px"}>
                  {[...Array(item.count)].map((_, index) => (
                    <img
                      key={index}
                      alt="rating-star"
                      src="https://ak1.ostkcdn.com/img/mxc/20200227_rating-star-full.svg"
                    />
                  ))}
                </Flex>
              )}
              <div>
                <p>{item.name}</p>
              </div>
              <div>
                <h3>
                  <CheckCircleIcon />
                  Free Shipping
                </h3>
              </div>
              {isAdmin && (
                <div>
                  <Button
                    bg={"red"}
                    width="60%"
                    ml="20%"
                    mb="20px"
                    color="white"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ))}
      </div>

      <div style={{ margin: "auto", marginTop: "50px", marginBottom: "50px" }}>
        <Button isDisabled={state.page <= 1} onClick={() => setState((prevState) => ({ ...prevState, page: prevState.page - 1 }))}>
          <ChevronLeftIcon />
        </Button>
        <Button bg={"lightblue"}>{state.page}</Button>
        <Button
          isDisabled={state.data.length < 12}
          onClick={() => setState((prevState) => ({ ...prevState, page: prevState.page + 1 }))}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default Products;
