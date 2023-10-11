import React, { useState } from 'react'
import StoreIcon from '@mui/icons-material/Store';
import Tab from '../../page-components/utils/Tab';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CustomInput from '../../page-components/utils/CustomInput';
import TextButton from '../../page-components/utils/TextButton';

const NAME_RULES = {
  required: "Full name is required",
  minLength: {
    value: 2,
    message: "Name must be at least 2 characters long"
  }
};

const EMAIL_RULES = {
  required: "Email is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message: "Invalid email format"
  }
};

const PASSWORD_RULES = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters long"
  }
};


function LoginRegister() {

  const [ isLogin, setIsLogin ] = useState(true);
  const { control, register, handleSubmit, formState: { errors }, watch } = useForm();

  const handleTabChange = () => {
    setIsLogin(!isLogin);
  }

  const onLoginSubmit = (data) => {
    if (Object.keys(errors).length === 0) {
      console.log("Datos del formulario:", data);
    } else {
      alert("Por favor, complete todos los campos correctamente.");
    }
  };

  const onRegisterSubmit = (data) => {
    if (Object.keys(errors).length === 0) {
      console.log("Datos del formulario:", data);
    } else {
      alert("Por favor, complete todos los campos correctamente.");
    }
  };

  const REPEAT_PASSWORD_RULES = {
    required: "Please repeat the password",
    validate: value => value === watch('password') || "Passwords do not match"
  };
  
  return (
    <div className='overlay'>
        <div className='login-card'>
            <div className='block-tile' 
            style={{flexDirection: 'row', maxHeight: '10%', color: 'white', justifyContent: 'space-between', marginLeft: 0}}>
            <div 
              className='sidebar-header'>
              <StoreIcon fontSize='large' style={{color: '#98FF98', marginRight: '10px'}}/>
              <span>PraiseTheSale</span>
            </div>
            <div>
              <h3>
                {
                  isLogin ? "Hi! Welcome back to PraiseTheSale" : "Dive into deals with PraiseTheSale!"
                }

              </h3>
            </div>
            </div>
            <div className='block-tile ml-0' style={{maxHeight: '90%'}}>
            <div className='tabs' style={{maxWidth: '98%', marginTop: '20px', marginBottom: "10px"}}>
              <Tab 
              label="Login"
              isActive={isLogin}
              onClick={handleTabChange}/>

              <Tab
              label="Register"
              isActive={!isLogin}
              onClick={handleTabChange}/>
            </div>
            <div className='block-tile ml-0' >
              {
                isLogin ? 
                <LoginBody control={control} rules={{ email: EMAIL_RULES, password: PASSWORD_RULES }} errors={errors} />
                :
                <RegisterBody control={control} watch={watch} rules={{ email: EMAIL_RULES, password: PASSWORD_RULES, name: NAME_RULES, repeatPassword: REPEAT_PASSWORD_RULES }}
                errors={errors}/>
              }

              
            </div>
            <div className='block-tile ml-0' style={{flex: 2}}>
            <ActionButton isLogin={isLogin} errors={errors} 
            onLogin={handleSubmit(onLoginSubmit)} 
            onRegister={handleSubmit(onRegisterSubmit)}/>
            </div>
            </div>
        </div>
    </div>
  )
}


function RegisterBody({control, rules, errors, watch}){

  const [ role, setRole ] = useState('buyer');

  const handleRoleChange = (role) => {
    setRole(role);
  }

  return (
     <motion.form className='login-form'>
      <div className='block-tile ml-0' style={{flex: 1, flexDirection: 'row'}}>
      <div className='block-tile ml-0'>
        <CustomInput
        error={errors.name}
        style={{marginBottom: 0, padding: 0}}
        invert={false}
        label="Full Name"
        placeholder="Write your name here..."
        type="text"
        control={control}
        name="name"
        rules={rules.name}
        />
      </div>
      <div className='block-tile'>
        <CustomInput
        error={errors.email}
        style={{marginBottom: 0, padding: 0}}
        invert={false}
        label="Email"
        placeholder="Write your email here..."
        type="email"
        control={control}
        name="email"
        rules={rules.email}
        />
      </div>
      </div>
      <div className='block-tile ml-0' style={{flex: 1, flexDirection: 'row'}}>
      <div className='block-tile ml-0'>
        <CustomInput
        error={errors.password}
        style={{marginBottom: 0, padding: 0}}
        invert={false}
        label="Password"
        placeholder="Write your password here..."
        type="password"
        control={control}
        name="password"
        rules={rules.password}
        />
      </div>
      <div className='block-tile'>
      <CustomInput
        error={errors.repeatPassword}
        style={{marginBottom: 0, padding: 0}}
        invert={false}
        label="Repeat Password"
        placeholder="Repeat your password here..."
        type="password"
        control={control}
        name="repeatPassword"
        rules={rules.repeatPassword}
      />
      </div>

      </div>
      <div className='block-tile ml-0' style={{flex: 1, color: 'white', flexDirection: 'row', padding: '8px'}}>
        <h4 style={{marginRight: '20px'}}> Role:</h4>
        <div className='tabs' style={{marginBottom: "10px", maxWidth: '98%'}}>
        <Tab
          label="Buyer"
          isActive={role === 'buyer'}
          onClick={() => handleRoleChange('buyer')}/>
        <Tab
          label="Seller"
          isActive={role === 'seller'}
          onClick={() => handleRoleChange('seller')}/>
        </div>
      </div>

     </motion.form>
  )
}

function LoginBody({control, rules, errors}){

  return (
    <form className='login-form'>
      <div className='block-tile ml-0'>
        <CustomInput
        error={errors.email}
        style={{marginBottom: 0, paddingBottom: 0}}
        invert={false}
        label="Email"
        placeholder="Write your email here..."
        type="email"
        control={control}
        name="email"
        rules={rules.email}
        />
      </div>
      <div className='block-tile ml-0'>
        <CustomInput
        error={errors.password}
        style={{marginBottom: 0, paddingBottom: 0}}
        invert={false}
        label="Password"
        placeholder="Write your password here..."
        type="password"
        control={control}
        name="password"
        rules={rules.password}
        />
        <Link 
          to='/forgot-password'
          style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer',
          textAlign: 'right', 
          color: 'whitesmoke',
          paddingBottom: '15px'}}>
           
              Forgot Password? 
            
        </Link>
       
      </div>
    </form>
  )
}

function ActionButton({ isLogin, onLogin, onRegister }) {
  return (
    <TextButton 
      text={isLogin ? "Login" : "Register"}
      onClick={isLogin ? onLogin : onRegister}
    />
  );
}

export default LoginRegister