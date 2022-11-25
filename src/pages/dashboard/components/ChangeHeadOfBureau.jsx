import { useState,useRef } from 'react';
import { Modal, Button, Group, Text, Select,Loader } from '@mantine/core';
import { Grid } from '@mantine/core';
import axios from "../../../axios/index";
import { showNotification } from '@mantine/notifications';
import logo from "../../../assets/images/logo.png"
import { useSelector} from 'react-redux'
import { useForm, } from '@mantine/form';
import {  useDispatch } from 'react-redux'
import {setBureaus} from '../../../store/app/index'
import "./style.css"

export default function ChangeHeadOfBureau({data}) {
  const dispatch = useDispatch()
  const [opened, setOpened] = useState(false);
  const [changeLoading, setChangeLoading] = useState(false);
  const bureauLeads = useSelector((state) => state.app.bureauLeads)
  const bureauValues = bureauLeads.map(
    function(x){return {value:`${x.id}`,label: `${x.first_name} ${x.last_name}`}}
  )
  

  const leadRef = useRef(null)
  const form = useForm({
    initialValues: {  headObureau: '' },

    validate: {
      headObureau: (value) => value ? null : 'Head of bureau is required',
    },
  })

  function load_bureaus(){
    axios.get(`/get_bureau`)
    .then(function (response) {
        dispatch(setBureaus({bureaus:response.data}))
        }
    ).catch(function (error) {}
    )
}

  function change(){
    
    const bureau_id = data.bureau.id
    const lead = leadRef.current.value
    const bureaulead = bureauValues.filter((x)=> x.label === lead)[0].value
    axios.patch(`/change_bureau_lead`,{bureauLead_id: bureaulead,bureau_id})
    .then(function (response) {
      load_bureaus()
      showNotification({
        title: 'Success',
        message: "Bureau lead changed successfully",
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
      leadRef.current.value = ""
      setChangeLoading(false)
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
          setChangeLoading(false)

        }
    )

 
  }

  function submit(){
    setChangeLoading(true)
    if(form.isValid()){
       change()
    }
  }
  return (
    <>
      <Modal
        radius="lg"
        style={{marginTop: '30px'}}
        opened={opened}
        zIndex={0}

        size="md"
        onClose={() => setOpened(false)}
      >
            <Grid>
                <Grid.Col span={12}>
                    <img src={logo} alt="logo" className='model-logo text-center mx-auto'></img>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Text ta="center"  fw={700} fz="lg">Change Head Of Bureau</Text>
                    <Text ta="center"  c="dimmed" fz="lg" className='mb-3 mt-1'>{data.bureau.name}</Text>
                      <Select
                       ref={leadRef}
                       label="New Head of Bureau"
                        data={bureauValues}
                        placeholder="Bureau Head"
                        searchable
                        size="md"
                        nothingFound="No one found"
                        {...form.getInputProps('headObureau')}
                      />  
                </Grid.Col>
            </Grid>
            <div className='flex flex-col items-center w-100 my-4'>
            {changeLoading && <Loader  color="indigo" size="xl" variant="dots" className='text-center mx-auto' />}
                <Button disabled={changeLoading} onClick={form.onSubmit((values) => submit())} radius="md" size="md" className='create-bureau-btn my-4 '>
                    Change
                </Button>
            </div>
      </Modal>

      <Group position="center">
        <Button color="gray" radius="md" size="md" onClick={() => setOpened(true)}  compact className='change-btn my-1 mx-2'>
          Change
        </Button>
      </Group>
    </>
  );
}