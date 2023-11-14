import React, {useState} from "react";
import CustomInput from '../../../common/CustomInput';
import SaveIcon from '@mui/icons-material/Save';
import AnimatedButton from '../../../common/AnimatedButton';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import { USER_TYPES } from "../../../../test-api/UserTypes";
import ImageUploaderButton from "../../../common/ImageUploaderButton";
import { updateUserProfile } from "../../../../services/updateUserProfileService";
import { useAxios } from "../../../../api/useAxios";
import { useAuth } from "../../../../context/AuthContext";
import { uploadImageService } from "../../../../services/uploadImageService";

const NAME_RULES = {
    required: "Full name is required",
    minLength: {
      value: 2,
      message: "Full name should have at least 2 characters!"
    }
};

const PHONE_RULES = {
    required: "Contact phone is required",
    pattern: {
      value: /^(?:\((0[1-9])\)\s?|9)\d{4}\s?\d{4}$/,
      message: "Invalid Chilean phone number format!"
    }
};

const EMAIL_RULES = {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "Invalid email format!"
    }
  };

const IMAGE_RULES = {
    required: "You must select an image!"
  };
  
function UpdateProfileCard({user, toggleUpdating}){

    const [selectedFile, setSelectedFile] = useState(null);
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { updateUserData } = useAuth();
    const axiosInstance = useAxios('user');

    const onSubmit = async (data) => {
        if(Object.keys(errors).length === 0){
            try{

              if(selectedFile){
                const imageLink = await uploadImageService(selectedFile, null, '/users');
                data.imageLink = imageLink;
              }

              await updateUserData(axiosInstance, data, selectedFile);
              
              toggleUpdating();
            } catch (error){
              console.error(error);
            }
          }
    }

    const handleFileSelect = (file) => {
      setSelectedFile(file);
    };

    return (
        <>
        <div className='card-options-container'>
         <AnimatedButton
         Icon={<CloseIcon style={{ color: "#FFFFFF" }} />}
         onClick={toggleUpdating}/>

         <span style={{fontSize: '18px', fontWeight: 'bold'}}> Update Profile </span>
        
         <AnimatedButton
         Icon={<SaveIcon style={{color: '#98FF98'}}/>}
         onClick={handleSubmit(onSubmit)}/>

        </div>
        <div className='card-content-container' style={{ maxHeight: '100%', overflowY: 'auto' }}>
            <div className='block-tile ml-0'>
                <div className='block-tile ml-0' style={{flex: 1, flexDirection: 'row'}}>
                  <div className='block-tile ml-0' style={{flex: 1}}>
                    <ImageUploaderButton
                    rules={IMAGE_RULES}
                    error={errors.profileImage}
                    defaultValue={user.profileImage}
                    control={control}
                    onFileSelect={handleFileSelect}
                    name='profileImage'/>
                  </div>
                  <div className='block-tile' style={{flex: 1}}>
                  <CustomInput 
                   error={errors.fullName}
                   style={{marginBottom: 0, padding: 0}}
                   label='Full Name'
                   placeholder='Write your full name...'
                   type='text'
                   name='name'
                   rules={NAME_RULES}
                   defaultValue={user.name}
                   control={control}/>
                  <CustomInput
                   error={errors.email}
                   style={{marginBottom: 0, padding: 0}}
                   label='Email'
                   placeholder='Write your email...'
                   type='email'
                   name='email'
                   rules={EMAIL_RULES}
                   defaultValue={user.email}
                   control={control}
                  />
                  </div>
                </div>
                <div className='block-tile ml-0' style={{flex: 2}}>
                <CustomInput 
                error={errors.description}
                style={{marginBottom: 0, padding: 0, height: '300px'}}
                label='Description'
                placeholder='Write your description'
                type='text'
                isTextarea={true}
                name='description'
                defaultValue={user.description}
                control={control}/>
                </div>
                {
                    user === USER_TYPES.SELLER && (
                        <>
                        <div className='divider-horizontal'/>
                        <div className='block-tile ml-0'>
                          <CustomInput 
                           error={errors.contactPhone}
                           style={{marginBottom: 0, padding: 0}}
                           label='Contact Phone'
                           placeholder='Write your phone number...'
                           type='text'
                           name='contactPhone'
                           rules={PHONE_RULES}
                           defaultValue={user.contactPhone}
                           control={control}/>
                           <CustomInput 
                           error={errors.contactEmail}
                           style={{marginBottom: 0, padding: 0}}
                           label='Contact Email'
                           placeholder='Write your contact email...'
                           type='text'
                           name='contactEmail'
                           rules={EMAIL_RULES}
                           defaultValue={user.contactEmail}
                           control={control}/>
                        </div>
                        
                        </>
                    )
                }
            </div>
        </div>
        
        </>
    )
}

export default UpdateProfileCard;