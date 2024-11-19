import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './RecipeForm.module.css'
import { useForm } from 'react-hook-form';
import { axiosInstance, CATEGORY_URLS, RECIPE_URL, TAGS_URLS } from '../../../../services/urls/urls';
import { toast } from 'react-toastify';
import useBeforUnload from '../../../../hooks/useBeforUnload';
import useCategories from '../../../categories/hooks/useCategories';
import useTags from '../../../../hooks/useTags';
export default function RecipeForm() {
    const {register,formState:{errors ,isSubmitting},setValue,handleSubmit} = useForm({mode:'onChange'});
   // const [tags,setTags]=useState([])
    //const [categoriesItems,setCategoriesItems]= useState([]);
    const categoriesQuery = useCategories()
    const TagsQuery = useTags();
    const navigate =useNavigate()
    const params = useParams()
    const isNewRecipe = !params.recipeId

    useBeforUnload();

    useEffect(()=>{
      /* const getTags= async()=>{
            try{
                let response = await axiosInstance.get(TAGS_URLS.GET_TAGS)
                setTags(response.data)
            }catch(error){
                console.log(error)
            }
        }*/
        /*const getCategories = async()=>{
            try{
              let response= await axiosInstance.get(CATEGORY_URLS.GET_CATEGORY,{
                params:{
                  pageSize:10,
                  pageNumber:1
                }
              })
              setCategoriesItems(response.data.data)
            }catch(error){
              console.log(error)
            }
          }*/
        (async()=>{ 
           //await getTags()
          // await getCategories()
        })()

        if(!isNewRecipe){
            const getRecipe = async()=>{
                const response = await axiosInstance.get(RECIPE_URL.GET_RECIPE(params.recipeId))
                console.log(response)
                setValue('name',response?.data?.name)
                setValue('description',response?.data?.description)
                setValue('price',response?.data?.price)
                setValue('categoriesIds',response?.data?.category[0]?.id)
                setValue('tagId',response?.data?.tag?.id)
            }
            getRecipe()
        }
    },[])

    const onSubmit =async(data)=>{
        const formData = new FormData()

        for(let key in data){
            if(key !=='recipeImage'){
                formData.append(key,data[key])
            }else{
                formData.append(key,data?.[key]?.[0])
            }
        }

        try{
            let response = await axiosInstance[isNewRecipe?'post':'put'](isNewRecipe?RECIPE_URL.ADD_RECIPE:RECIPE_URL.UPDATE_RECIPE(params.recipeId),formData);
            toast.success('Recipe Added successfully')
            navigate('/recipes')

        }catch(error){
            toast.error(error.response.data.message)
        }
        
    }
  return (
    <main>
        <header className={styles['header-wrapper']}>
            <div className={styles['content-wrapper']}>
                <h3>Fill the <span style={{color: '#009247'}}>Recipes</span> !</h3>
                <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
            </div>
            <Link to='/dashboard/recipes' className={styles['btn-primary']}>All Recipes <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.9927 7.70752C17.9927 8.01676 17.8783 8.28271 17.6494 8.50537L11.5542 14.5913C11.4367 14.7088 11.313 14.7954 11.1831 14.8511C11.0532 14.9067 10.9202 14.9346 10.7842 14.9346C10.4749 14.9346 10.2214 14.8356 10.0234 14.6377C9.82552 14.446 9.72656 14.2048 9.72656 13.9141C9.72656 13.7656 9.75749 13.6265 9.81934 13.4966C9.875 13.3667 9.95231 13.2523 10.0513 13.1533L12.1294 11.0566L15.5156 7.94873L15.8867 8.58887L12.6118 8.78369H1.46045C1.13883 8.78369 0.879069 8.68473 0.681152 8.48682C0.477051 8.2889 0.375 8.02913 0.375 7.70752C0.375 7.39209 0.477051 7.13542 0.681152 6.9375C0.879069 6.73958 1.13883 6.64063 1.46045 6.64063L12.6118 6.64062L15.8867 6.83545L15.5156 7.46631L12.1294 4.36768L10.0513 2.271C9.95231 2.17204 9.875 2.05762 9.81934 1.92773C9.75749 1.79785 9.72656 1.65869 9.72656 1.51025C9.72656 1.21956 9.82552 0.978353 10.0234 0.786621C10.2214 0.588704 10.4749 0.489746 10.7842 0.489746C11.0625 0.489746 11.3161 0.601074 11.5449 0.82373L17.6494 6.91895C17.8783 7.13542 17.9927 7.39827 17.9927 7.70752Z" fill="white"/>
            </svg>
            </Link>
        </header>
        <form className={styles['form-wrapper']} onSubmit={handleSubmit(onSubmit)}>
            {/*recipe name */}
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Recipe Name" 
                    aria-label="name" 
                    aria-describedby="basic-addon1"
                    {...register('name',{
                        required:'Recipe Name is required'
                    })}
                    />
                </div>
                {errors.name&&<span className='text-danger '>{errors.name.message}</span>}
                {/*tag */}
                <div>
                    <select className="form-control" {...register('tagId',{
                        required:'Tag is required'
                    })}>
                        <option value=''>Tag</option>
                        {TagsQuery?.tags.map(({id,name})=>
                            <option key={id} value={id}>{name}</option>
                        )}
                    </select>
                </div>
                {errors.tagId&&<span className='text-danger '>{errors.tagId.message}</span>}
                {/*price*/}
                <div className="input-group">
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="price" 
                    aria-label="price" 
                    aria-describedby="basic-addon1"
                    {...register('price',{
                        required:'Price is required',
                        min:0
                    })}
                    />
                </div>
                {errors.price&&<span className='text-danger '>{errors.price.message}</span>}
                {/*categ */}
                <div>
                    <select className="form-control" {...register('categoriesIds',{
                        required:'Category is required'
                    })}>
                        <option value=''>Categ</option>
                        {categoriesQuery?.categories?.data.map(({id,name})=>
                            <option key={id} value={id}>{name}</option>
                        )}
                    </select>
                </div>
                {errors.categoriesIds&&<span className='text-danger '>{errors.categoriesIds.message}</span>}
                {/*description */}
                <div>
                    <textarea 
                     className="form-control" 
                     placeholder='Description'
                     {...register('description',{
                        required:'Description is required'
                     })}
                     ></textarea>
                </div>
                {errors.description&&<span className='text-danger '>{errors.description.message}</span>}
                {/*Recipe Image */}
                <div>
                    <span style={{paddingRight:'10px'}}>Recipe Image</span>
                    <input 
                        type="file" 
                        aria-label="recipe image" 
                        aria-describedby="basic-addon1"
                        {...register('recipeImage')}
                        />
                </div>
                <div className='d-flex justify-content-end'>
                    <Link to='/dashboard/recipes' className={styles['btn-primary-outline']}>Cancle</Link>
                    <button disabled={isSubmitting} type='submit' className={styles['btn-primary']}>
                        {isSubmitting?'...Loading':'Save'}
                    </button>
                </div>
        </form>
    </main>
  )
}