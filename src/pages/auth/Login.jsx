
import "./style.css";
import { useState, useRef } from "react";
import { LoadingOverlay, Paper,Container,Grid,Text, TextInput,Button,PasswordInput } from '@mantine/core';
import { useForm, } from '@mantine/form';
// import { useSelector, useDispatch } from 'react-redux'
import { useDispatch } from 'react-redux'
import {setUser,setToken} from '../../store/auth/index'
import axios from "../../axios/index";
import { useNavigate, } from "react-router-dom";
import { showNotification } from '@mantine/notifications';


import logo from "../../assets/images/logo.png"



export default function Login(){
    
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [loading,setLoading] = useState(false)

    function validate(password) {
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
    }
    
    const form = useForm({
        initialValues: {  email: '', passowrd: '' },

        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          password: (value) => ( validate(value) ? null: 'Password should include atleast a special character,number and alphabet and 8 characters'),
        },
      }); 

    async function login(){
        const email = emailRef.current.value
        const password = passwordRef.current.value

        if(form.isValid()){
            setLoading(true)
            axios.post(`/login/`,{email,password})
            .then(function (response) {
                  dispatch(setUser({user:response.data?.user}))
                  dispatch(setToken({token:response.data?.token}))
                  setLoading(false)
                  navigate("/dashboard");
                }
            ).catch(function (error) {
                  const err = Object.values(error.response.data)
                  const message = err[0][0]
                  showNotification({
                    title: 'Error!!!!',
                    message: message,
                    styles: (theme) => ({
                        root: {
                          backgroundColor: theme.colors.red[7],
                          borderColor: theme.colors.red[7],
                          '&::before': { backgroundColor: theme.blue },
                        },
          
                        title: { color: theme.blue },
                        description: { color: theme.white },
                      }),
                  })
                
                  setLoading(false)
                }
            )
        
        }else{
        
            form.isValid()
        }

    }
    return(
        <div className="content h-100 w-100">
    
        <div className="grid h-screen place-items-center">
            <div className="login-container">
                
                <Paper shadow="md" radius="lg" p="xl" className='px-0' style={{ width: 400, position: 'relative' }}>
                    <Container className="px-5">
                   
                        <LoadingOverlay
                            radius="lg"
                            loaderProps={{ size: 'xl', color: 'blue', variant: 'bars' }}
                            overlayOpacity={0.5}
                            overlayColor="#c5c5c5"
                            visible={loading}
                        />
                        <Grid>
                        <Grid.Col span={12}>
                            <img src={logo} alt="logo" className='model-logo text-center mx-auto'></img>
                        </Grid.Col>
                        <Grid.Col span={12}>
                        <form>
                            <Text ta="center"  fw={700} fz="lg">Please Login</Text>
                            <TextInput
                                ref={emailRef}
                                label="Email"
                                variant="filled"
                                placeholder="Email"
                                radius="md"
                                value=""
                                size="md"
                                {...form.getInputProps('email')}
                            />
                            <PasswordInput
                                ref={passwordRef}
                                label="Passowrd"
                                variant="filled"
                                value=""
                                placeholder="Password"
                                radius="md"
                                size="md"
                                {...form.getInputProps('password')}
                            />
                        <div className='flex flex-col items-center w-100 my-4'>
                            <Button onClick={form.onSubmit((values) => login())}  radius="md" size="md" className='create-bureau-btn my-4 '>
                                Login
                            </Button> 
                        </div>
                        </form>
                        </Grid.Col>
                    </Grid>

                    <div className="px-4 flow-root">
                        <span className="inline-block float-left ">Sign Up</span>
                        <span className="inline-block float-right">Forgot Password</span>
                    </div>
                    
                    </Container>
                </Paper>
            </div>
        </div>
        </div>
    )
}