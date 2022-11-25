import { useState, useRef } from "react";
import { useForm, } from '@mantine/form';
import { Select,Modal, Button, Group, Text,TextInput,} from '@mantine/core';
import { Grid,Loader } from '@mantine/core';
import logo from "../../../assets/images/logo.png"
import { showNotification } from '@mantine/notifications';
import axios from "../../../axios/index";
import {  useDispatch } from 'react-redux'
import {setBureaus} from '../../../store/app/index'
import "./style.css"

export default function AssignBureauLead({data}) {
  const dispatch = useDispatch()
  const [opened, setOpened] = useState(false);
  const [loading,setLoading] = useState(false)
  const emailRef = useRef(null)
  const firsNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const genderRef = useRef(null)


  const form = useForm({
    initialValues: {  email: '', first_name: '',last_name:'',contact:'' },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      first_name: (value) => value ? null : 'Name is required',
      last_name: (value) => value ? null : 'Last Name is required'
    },
  }); 

  function load_bureaus(){
    axios.get(`/get_bureau`)
    .then(function (response) {
        dispatch(setBureaus({bureaus:response.data}))
        }
    ).catch(function (error) {}
    )
}
  function submit() {
    setLoading(true)  
    if(form.isValid()){
      const email =  emailRef.current.value
      const first_name = firsNameRef.current.value
      const last_name = lastNameRef.current.value
      const gender = genderRef.current.value

      axios.post('/add_bureau_lead',{
        bureau_id: data.bureau.id,
        email,
        first_name,
        last_name,
        gender,
        password: '@A!@#$%^gsgsh7',
        contact:"078888856"
    })
        .then(function (response) {
            load_bureaus()
            showNotification({
                title: 'Success',
                message: "Bureau created successfully",
                styles: (theme) => ({
                    root: {
                      backgroundColor: theme.colors.blue[6],
                      borderColor: theme.colors.blue[6],
                      '&::before': { backgroundColor: theme.white },
                    },      
                    title: { color: theme.blue },
                    description: { color: theme.white },
                  }),
              }) 
              setLoading(false)
            }
        ).catch(function (error) {
              showNotification({
                title: 'Error!!!!: Something wrong happend',
                message: "Couldnt Add bureau Lead",
                styles: (theme) => ({
                    root: {
                      backgroundColor: theme.colors.red[3],
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
    }
    
  }

  return (
    <>
      <Modal
        radius="lg"
        style={{marginTop: '30px'}}
        opened={opened}
        zIndex={100}
        size="md"
        onClose={() => setOpened(false)}
      >
            <Grid>
                <Grid.Col span={12}>
                    <img src={logo} alt="logo" className='model-logo text-center mx-auto'></img>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Text ta="center"  fw={500} fz="md" >Create Head Of Bureau</Text>
                    <Text ta="center"  c="dimmed" fz="md" className="mt-1">
                      {data.bureau.name}
                    </Text>
                    <form onSubmit={form.onSubmit(()=>submit())} >
                        <TextInput
                          ref={firsNameRef}
                          label="First Name"
                          required
                          variant="filled"
                          placeholder="First Name"
                          radius="md"
                          value=""
                          size="md"
                          {...form.getInputProps('first_name')}
                        />
                      <TextInput
                        ref={lastNameRef}
                         label="Last Name" 
                         required
                          variant="filled"
                          placeholder="Last Name"
                          radius="md"
                          value=""
                          size="md"
                          {...form.getInputProps('last_name')}
                      />
                      <TextInput
                          ref={emailRef}
                          label="Email" 
                          required
                          variant="filled"
                          value=""
                          placeholder="Email"
                          radius="md"                     
                          size="md"
                          {...form.getInputProps('email')}
                      />
                      <Select
                        ref={genderRef}
                        label="Gender" 
                        defaultValue="Male"
                        size="md"
                        data={[
                            { value: 'Male', label: 'Male' },
                            { value: 'Female', label: 'Female' },
                        ]}
                        />
                      <div className='flex flex-col items-center w-100 '>
                      {loading && <Loader  color="indigo" size="xl" variant="dots" className='text-center mx-auto' />}
                        <Button disabled={loading} type="submit" radius="md" size="md" className='create-bureau-btn my-2 '>
                            Save
                        </Button>
                      </div>   
                    </form> 
                </Grid.Col>
            </Grid>
      </Modal>

      <Group position="center">
        <Button color="gray" radius="md" size="md" onClick={() => setOpened(true)}  compact className='assign-btn mx-2'>
            Assign
        </Button>
      </Group>
    </>
  );
}