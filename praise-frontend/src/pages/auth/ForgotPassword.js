import React from 'react'
import CustomInput from '../../components/common/CustomInput';
import TextButton from '../../components/common/TextButton';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import StoreIcon from '@mui/icons-material/Store';
import AnimatedButton from '../../components/common/AnimatedButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const EMAIL_RULES = {
  required: "Email is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message: "Invalid email format"
  }
};

function ForgotPassword() {

  const { control, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const onSubmit = data => {
      console.log(data);
      
  };

  return (
    <div className='overlay'>
        <div className='login-card' style={{height: '55vh', width: '55vw'}}>
         <div className='block-tile' 
            style={{flexDirection: 'row', maxHeight: '10%', color: 'white', justifyContent: 'space-between', marginLeft: 0}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <AnimatedButton Icon={<ArrowBackIcon/>} margin={10} onClick={() => navigate(-1)}/>
            <div 
              className='sidebar-header'>
              <StoreIcon fontSize='large' style={{color: '#98FF98', marginRight: '10px'}}/>
              <span>PraiseTheSale</span>
            </div>
            </div>
            <div>
              <h3> Forgot Password </h3>
            </div>
            </div>
            <div className='divider-horizontal' style={{width: '98%', marginTop: '20px'}}/>
            <div className='block-tile ml-0' 
            style={{color: 'white', alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                <h3>So, you has been forget you password ... There is no problem!</h3>
                <h4> Please, write the associated email account, and we will send you an email to reset your password.</h4>
            </div>
            <div className='block-tile ml-0' style={{flex: 2}}>
                <CustomInput
                  style={{paddingTop: 0}}
                  invert = {false}
                  control={control}
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  rules={EMAIL_RULES}
                  error={errors.email}
                />
                <TextButton
                text='Send Email'
                onClick={handleSubmit(onSubmit)}/>
            </div>
        </div>

    </div>
  )
}

export default ForgotPassword