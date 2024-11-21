import React, { useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { axiosInstance, CATEGORY_URLS } from '../../../services/urls/urls'

let getCategories = async(setArrayOfPages,pageNumber,nameValue)=>{

      let response= await axiosInstance.get(CATEGORY_URLS.GET_CATEGORY,{
        params:{
          pageSize:5,
          pageNumber:pageNumber,
          name:nameValue
        }
      })

      setArrayOfPages(()=>Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1))
      return response
  }

const useCategories = () => {
{/*values for pagination */}
 const [pageNumber,setPageNumber]=useState(1);
 const updateParams =(value)=>{
  setPageNumber(value)
  trigger()
  };
  const[arrayOfPages,setArrayOfPages]=useState([]);

  {/*values for filteration */}
  const [nameValue, setNameValue] = useState('')

  const getNameValue=(input)=>{
    setNameValue(input.target.value)
    trigger()
  }


 const {data,isLoading,isError,error,trigger} = useFetch(()=>getCategories(setArrayOfPages,pageNumber,nameValue))


 return({categories:data?.data,
    categoriesError:error,
    isLoadingCategories:isLoading,
    isErrorCategories:isError,
    triggerCategories:trigger,
    updateParams:updateParams,
    arrayOfPages:arrayOfPages,
    getNameValue:getNameValue
  })
}

export default useCategories