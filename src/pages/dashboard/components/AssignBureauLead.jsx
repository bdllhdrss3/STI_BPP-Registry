import { useState, useRef } from "react";
import { useForm, } from '@mantine/form';
import { Select,Modal, Button, Group, Text,TextInput,} from '@mantine/core';
import { Container,  Grid,Loader } from '@mantine/core';
import logo from "../../../assets/images/logo.png"
import { showNotification } from '@mantine/notifications';
import axios from "../../../axios/index";
import "./style.css"

export default function AssignBureauLead({data}) {
  const [opened, setOpened] = useState(false);
  const [createLoading,setCreateLoading] = useState(false)
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

  function submit() {

    
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
            setCreateLoading(true)
            setCreateLoading(false)
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
              setCreateLoading(false)
            }
        )
    }

  }

  return (
    <>
      <Modal
        style={{marginTop: '30px',zIndex:'100'}}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <Container>
            <Grid>
                <Grid.Col span={12}>
                    <img src={logo} alt="logo" className='model-logo text-center mx-auto'></img>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Text ta="center"  fw={500} fz="md">Create Head Of Bureau</Text>
                    <Text ta="center"  c="dimmed" fz="md">
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
                          size="sm"
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
                          size="sm"
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
                          size="sm"
                          {...form.getInputProps('email')}
                      />
                      <Select
                        ref={genderRef}
                        label="Gender" 
                        defaultValue="Male"
                        data={[
                            { value: 'Male', label: 'Male' },
                            { value: 'Female', label: 'Female' },
                        ]}
                        />
                      <div className='flex flex-col items-center w-100 '>
                      {createLoading && <Loader  color="indigo" size="xl" variant="dots" className='text-center mx-auto' />}
                        <Button disabled={createLoading} type="submit" radius="md" size="md" className='create-bureau-btn my-2 '>
                            Save
                        </Button>
                      </div>   
                    </form> 
                </Grid.Col>
            </Grid>
        </Container>
      </Modal>

      <Group position="center">
        {data.bureau.head_of_bureau?<Button color="gray" radius="md" size="md" onClick={() => setOpened(true)}  compact className='assign-btn mx-2'>
            Assign
        </Button>: 
        <Button color="gray" radius="md" size="md" onClick={() => setOpened(true)}  compact className='change-btn my-1 mx-2'>
        Change
      </Button>
        }
      </Group>
    </>
  );
}