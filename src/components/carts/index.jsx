import React, { useEffect, useState } from "react";
import Cart from "../cart";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "../../redux/feature/cart-slice";
import {IoIosArrowBack} from "react-icons/io"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Category from "../category";

const Carts = () => {

  const navigate=useNavigate()
  const handleNavigate=(route)=>{
    navigate(`/${route}`)
  }
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
   axios.get()
  }, [dispatch]);


  return (
    <>
    <Category id={3} navigationText='spingCollection' text='شال بهاره'/>
    <Category id={2} navigationText='summerCollection' text='شال تابستانه'/>
    <Category id={4} navigationText='fallCollection' text=' شال پاییزه'/>
    <Category id={1} navigationText='winterCollection' text='شال زمستانه'/>
    </>
  );
};

export default Carts;
