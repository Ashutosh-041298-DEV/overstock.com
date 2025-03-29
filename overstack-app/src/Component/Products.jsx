import React, { useEffect, useState } from "react";
import "./Mugs.css";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";
import { Button, Flex, Spinner, useToast } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Products = () => {
  const toast = useToast();
  const { category: initialCategory } = useParams();
  const { isAdmin } = useSelector((state) => state);

  const [state, setState] = useState({
    category: initialCategory,
    page: 1,
    order: "asc",
    data: [],
    loading: true,
    totalPages: 1, // Track total pages
  });

  // Fetch data when category, page, or order changes
  useEffect(() => {
    fetchData(state.category, state.page, state.order);
  }, [state.category, state.page, state.order]);

  // Reset page when category changes
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      category: initialCategory,
      page: 1,
    }));
  }, [initialCategory]);

  const fetchData = (category, page, order) => {
    setState((prevState) => ({ ...prevState, loading: true }));

    axios
      .get(
        `https://stock-server.onrender.com/products?category=${category}&_limit=12&_page=${page}&_sort=price&_order=${order}`
      )
      .then((r) => {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          data: r.data,
          totalPages: r.data.length < 12 ? prevState.page : prevState.page + 1, // Update total pages dynamically
        }));
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://stock-server.onrender.com/products/${id}`)
      .then(() => {
        setState((prevState) => ({
          ...prevState,
          data: prevState.data.filter((e) => e.id !== id),
        }));
        toast({
          title: "Delete Successful.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Container">
      <h1>{state.category}</h1>
      {state.loading && (
        <Flex justifyContent={"center"}>
          <Spinner size="xl" mt="8%" />
        </Flex>
      )}
      <div className="MugsData">
        {!state.loading &&
          state.data.length > 0 &&
          state.data.map((item) => (
            <div className="Mugs" key={item.id}>
              <img alt="some" src={item.image} />
              <h1>${item.price}</h1>
              <p>{item.name}</p>
              {isAdmin && (
                <Button
                  bg={"red"}
                  color="white"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
      </div>

      {/* Pagination Controls */}
      <Flex justifyContent="center" mt="20px" mb="50px">
        <Button
          isDisabled={state.page <= 1}
          onClick={() => setState((prevState) => ({ ...prevState, page: prevState.page - 1 }))}
        >
          <ChevronLeftIcon />
        </Button>
        <Button bg={"lightblue"}>{state.page}</Button>
        <Button
          isDisabled={state.data.length < 12}
          onClick={() => setState((prevState) => ({ ...prevState, page: prevState.page + 1 }))}
        >
          <ChevronRightIcon />
        </Button>
      </Flex>
    </div>
  );
};

export default Products;
