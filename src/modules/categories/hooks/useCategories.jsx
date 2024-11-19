import React from 'react'
import useFetch from '../../../hooks/useFetch'
import { axiosInstance, CATEGORY_URLS } from '../../../services/urls/urls'

let getCategories = async()=>{
      let response= await axiosInstance.get(CATEGORY_URLS.GET_CATEGORY,{
        params:{
          pageSize:10,
          pageNumber:1
        }
      })
      return response
  }

const useCategories = () => {
 const {data,isLoading,isError,error,trigger} = useFetch(getCategories)

 return({categories:data?.data,
    categoriesError:error,
    isLoadingCategories:isLoading,
    isErrorCategories:isError,
    triggerCategories:trigger})
}

export default useCategories