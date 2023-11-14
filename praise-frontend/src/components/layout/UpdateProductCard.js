import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '../common/AnimatedButton';
import CustomInput from '../common/CustomInput';
import SelectInput from '../common/SelectInput';
import ImageUploaderButton from '../common/ImageUploaderButton';
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { categoriesValues, conditionValues } from '../../test-api/products/Product';
import TextButton from '../common/TextButton';
import { useProducts } from '../../context/ProductContext';


const NAME_RULES = {
  required: "Product name is required",
  minLength: {
    value: 2,
    message: "Product name should have at least 2 characters"
  }
};

const PRICE_RULES = {
  required: "Price is required",
  pattern: {
    value: /^[+]?([0-9]*[.])?[0-9]+$/,
    message: "Price should be a positive number"
  }
};

const DESCRIPTION_RULES = {
  required: "Description is required"
};

const CATEGORY_RULES = {
  required: "Category is required"
};

const CONDITION_RULES = {
  required: "Condition is required"
};

const IMAGE_RULES = {
  required: "You must select an image!"
};



function UpdateProductCard({setIsAddingProduct, product, layoutID}) {

    const { control, handleSubmit, formState: { errors } } = useForm();
    const [ selectedFile, setSelectedFile ] = useState(null);

    const { createOrUpdateProduct } = useProducts();
  
    const onSubmit = async (productData) => {
      if(Object.keys(errors).length === 0){
        try {

          if(product){
            productData.id = product.id
          }

          await createOrUpdateProduct(productData, selectedFile);
          setIsAddingProduct(false); 
        } catch (error) {
          console.log(error);
        }
      } 
    };

    const handleFileSelect = (file) => {
      setSelectedFile(file);
    }
  
    return (
      <motion.div className='create-product-card' layoutId={layoutID} style={{borderRadius: '8px'}}> 
        <div className='create-product-header'>
          <div className='flex-aligned-container'>
          <AnimatedButton Icon={<ArrowBackIcon/>} onClick={() => setIsAddingProduct(false)} margin={10}/>
          <h3> { product ? 'Update Product' : 'Create Product'} </h3>
          </div>
          <TextButton 
          text='Done'
          onClick={handleSubmit(onSubmit)}
          style={{backgroundColor: '#98FF98', maxWidth: '8%', height: '50px'}}/>
          
        </div>
        <div className='divider-horizontal' style={{width: '99%'}}/>
        <form className='create-product-content' onSubmit={onSubmit}>
          <div className='block-tile ml-0' style={{flex: 1, flexDirection: 'row'}}>
            <div className='block-tile ml-0' style={{flex: 2}}>
              <CustomInput 
              name='name'
              rules={NAME_RULES}
              error={errors.name}
              control={control}
              defaultValue={product?.name}
              placeholder='Write the product name...'
              label='Name' style={{marginButtom: 0, height: '100%'}}/>
            </div>
            <div className='block-tile' style={{flex: 1}}>
              <CustomInput 
              name='price'
              rules={PRICE_RULES}
              error={errors.price}
              control={control}
              defaultValue={product?.price}
              placeholder='Write the price...'
              label='Price' style={{marginButtom: 0, height: '100%'}}/>
            </div>
          </div>
          <div className='block-tile ml-0' style={{flex: 4, flexDirection: 'row'}}>
            <div className='block-tile ml-0' style={{flex: 2}}>
            <div className='block-tile ml-0' style={{flex: 1, flexDirection: 'row'}}>
              <div className='block-tile ml-0'>
              <SelectInput 
              defaultValue={product?.category}
              control={control}
              name='category'
              label='Category'
              options={categoriesValues} 
              error={errors.category}
              rules={CATEGORY_RULES}/>
              
            </div>
            <div className='block-tile'>
              <SelectInput
              defaultValue={product?.condition}
              control={control}
              name='condition'
              label='Condition'
              options={conditionValues}
              error={errors.condition}
              rules={CONDITION_RULES}/>
            </div>
            </div>
            <div className='block-tile ml-0' style={{flex: 4}}>
              <CustomInput 
              name='description'
              rules={DESCRIPTION_RULES}
              error={errors.description}
              control={control}
              defaultValue={product?.description}
              placeholder='Write your product description...'
              style={{height: '100%', flex: 1}}
              label='Description'
              isTextarea={true}
              />
            </div>
  
            </div>
            <div className='block-tile' style={{flex: 1, height: '100%'}}>
            <ImageUploaderButton 
            onFileSelect={handleFileSelect}
            control={control} 
            name="productImage" 
            rules={IMAGE_RULES} 
            error={errors.productImage} 
            defaultValue={product?.imageLink}/>

            </div>
          </div>
          
        </form>
              
      </motion.div>
    )
  }
  

export default UpdateProductCard