import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getPrice } from '../../../../redux/feature/price-slice';
import { getQuantity } from '../../../../redux/feature/quantity-slice';

const Tr = ({item}) => {
    const [editMood, setEditeMood] = useState(false);
    const [editMood2, setEditeMood2] = useState(false);
    const dispatch=useDispatch()
    const priceHandler=(e,item)=>{
        const editItem={...item,price:e.target.value}
        dispatch(getPrice(editItem))
    }
    const quantityHandler=(e,item)=>{
      const editItem2={...item,quantity:e.target.value}
      dispatch(getQuantity(editItem2))
  }
      
  return (
    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
    <td className="py-4 ">{item.name}</td>

    <td className="px-14 py-4">
      {!editMood ? (
        <p onClick={()=>setEditeMood(true)}>{item.price}تومان</p>
      ) : (
        <input defaultValue={item.price} onBlur={()=>setEditeMood(false)} type="number" onChange={(e)=>priceHandler(e,item)} className='w-14 text-right'/>
      )}
    </td>
    <td className=" pl-[5rem] py-4">
    {!editMood2 ? (
        <p onClick={()=>setEditeMood2(true)}>{item.quantity}</p>
      ) : (
        <input defaultValue={item.quantity} onBlur={()=>setEditeMood2(false)} type="number" onChange={(e)=>quantityHandler(e,item)} className='w-14 text-right'/>
      )}
    </td>
  </tr>
  )
}

export default Tr
