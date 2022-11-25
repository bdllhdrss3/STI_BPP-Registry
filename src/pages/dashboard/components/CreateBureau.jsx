import { useState, useRef } from "react";
import { Modal, Button, Group, Text,TextInput } from '@mantine/core';
import { Loader, Textarea, Grid } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useForm, } from '@mantine/form';
import logo from "../../../assets/images/logo.png"
import axios from "../../../axios/index";
import { useDispatch } from 'react-redux'
import {addBureau} from '../../../store/app/index'
import "./style.css"

export default function CreateBureau(props) {
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch()
  const nameRef =  useRef(null)
  const descriptionRef =  useRef(null)
  const [createLoading,setCreateLoading] = useState(false)


  const form = useForm({
    initialValues: {  name: '',description: '' },

    validate: {
      name: (value) => value ? null : 'Name is required',
      description: (value) => value ? null : 'Description is required',
    },
  }
  )
  function create(x){
    setCreateLoading(true)
    axios.post('/create_bureau',{
        name: x.name,
        description:x.description,

    })
        .then(function (response) {
            setCreateLoading(true)
            dispatch(addBureau({bureau:response.data}))
            setCreateLoading(false)
            showNotification({
                title: 'Success',
                message: "Bureau created successfully", 
                styles: (theme) => ({
                    root: {
                      backgroundColor: '#DBC7BE',
                      borderColor: '#DCC7BE',
                    },      
                    title: { color: theme.white },
                    description: { color: theme.white },
                  }),
              }) 
            }
        ).catch(function (error) {
              showNotification({
                title: 'Error!!!!: Something wrong happend',
                message: "Couldnt Load bureaus",
                styles: (theme) => ({
                    root: {
                        backgroundColor: '#CBB3BF',
                        borderColor: '#CBB5BF',
                    },      
                    title: { color: theme.white },
                    description: { color: theme.white },
                  }),
              })   
              setCreateLoading(false)
            }
        )
}
  function submit(){
    if(form.isValid){
      const name = nameRef.current.value;
      const description = descriptionRef.current.value
      create({name,description})
    }
    else{

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
                  <form>
                    <Text ta="center"  fw={700} fz="lg">Create Bureau</Text>          
                      <TextInput
                          ref={nameRef}
                          required
                          label="Bureau Name"
                          variant="filled"
                          placeholder="Name"
                          radius="md"
                          size="md"
                          withAsterisk
                          {...form.getInputProps('name')}
                      />
                    <Textarea
                      ref={descriptionRef}
                      required
                      placeholder="description"
                      label="Description"
                      variant="filled"
                      size="md"
                      radius="md"
                      withAsterisk
                      {...form.getInputProps('description')}
                    />
                    </form>
                </Grid.Col>
            </Grid>
            <div className='flex flex-col items-center  my-4'>
                {createLoading && <Loader  color="indigo" size="xl" variant="dots" className='text-center mx-auto' />}
                <Button disabled={createLoading} color="gray" onClick={form.onSubmit((values) => submit())}  radius="md" size="md" className='create-bureau-btn my-4 '>
                    Create
                </Button>
            </div>
 
      </Modal>

      <Group position="center">
        <Button color="gray" radius="md" size="md" onClick={() => setOpened(true)} className='create-btn my-4 mx-2'>
            Create Bureau
        </Button>
      </Group>
    </>
  );
}