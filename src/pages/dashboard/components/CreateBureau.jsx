import { useState, useRef } from "react";
import { Modal, Button, Group, Text,TextInput } from '@mantine/core';
import { Container,Loader, Textarea, Grid } from '@mantine/core';
import { useForm, } from '@mantine/form';
import logo from "../../../assets/images/logo.png"
import "./style.css"

export default function CreateBureau(props) {
  const [opened, setOpened] = useState(false);
  const nameRef =  useRef(null)
  const descriptionRef =  useRef(null)


  const form = useForm({
    initialValues: {  name: '',description: '' },

    validate: {
      name: (value) => value ? null : 'Name is required',
      description: (value) => value ? null : 'Description is required',
    },
  }
  )

  function submit(){
    if(form.isValid){
      const name = nameRef.current.value;
      const description = descriptionRef.current.value
      props.createBureau({name,description})
    }
    else{

    }
    
  }

  return (
    <>
      <Modal
        style={{marginTop: '30px'}}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <Container>

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
            <div className='flex flex-col items-center w-100 my-4'>
                {props.loading && <Loader  color="indigo" size="xl" variant="dots" className='text-center mx-auto' />}
                <Button disabled={props.loading}color="gray" onClick={form.onSubmit((values) => submit())}  radius="md" size="md" className='create-bureau-btn my-4 '>
                    Create
                </Button>
            </div>
        </Container>
      </Modal>

      <Group position="center">
        <Button color="gray" radius="md" size="md" onClick={() => setOpened(true)} className='create-btn my-4 mx-2'>
            Create Bureau
        </Button>
      </Group>
    </>
  );
}