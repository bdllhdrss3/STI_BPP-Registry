import { Grid } from '@mantine/core';
import { Container } from '@mantine/core';
import {  Paper } from '@mantine/core';
import BureauListItem from './components/BureauListItem'
import  BureauHeadsListItem from './components/BureauHeadsListItem';
import CreateBureau from './components/CreateBureau'
import { Title } from '@mantine/core';
import { Divider,Skeleton } from '@mantine/core';
import { Button } from '@mantine/core';
import Empty from './components/Empty'
import { showNotification } from '@mantine/notifications';
import { useState,useEffect } from "react";
import axios from "../../axios/index";

export default function Dashboard(){
    const [loading,setLoading] = useState(true)
    const [createLoading,setCreateLoading] = useState(false)
    const [bureaus,setBureaus] = useState([])

    useEffect(() => {
        // Fetch Bureaus
        setLoading(true)
        axios.get(`/get_bureau`)
            .then(function (response) {
                setLoading(true)
                setBureaus(response.data)
                setLoading(false)
                }
            ).catch(function (error) {
                  showNotification({
                    title: 'Error!!!!: Something wrong happend',
                    message: "Couldnt Load bureaus",
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
      },[]);

    function create(x){
        setCreateLoading(true)
        axios.post('/create_bureau',{
            name: x.name,
            description:x.description,
   
        })
            .then(function (response) {
                setCreateLoading(true)
                setBureaus([response.data,...bureaus])
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
                    message: "Couldnt Load bureaus",
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
    return(
        <Container fluid>
            <div class="flow-root">  
                <CreateBureau createBureau={create} loading={createLoading}/>
            </div>
            <Grid  grow gutter="lg" >
                <Grid.Col span={6} md={6} sm={12} >     
                    <Paper shadow="md" radius="lg" p="xl" className='px-0' style={{height: '350px'}}>
                        <Skeleton visible={loading} height='350px' style={{position:'relative'}}>
                            <Title order={3} className="py-4 mx-6">Bureaus</Title>
                            {
                                bureaus?
                                bureaus.slice(0,3).map((x)=>
                                    <div>
                                        <BureauListItem bureau={x} key={x.id}/>
                                        <Divider my="sm" className='px-0 mx-0' />
                                    </div>
                                )
                                 : 
                                (<Empty text="You have no bureaus, create one"/>)                   
                            }
                            
                            <div style={{position: 'absolute',bottom: '40px',left:'45%',right:'50%'}}>
                                <Button variant="light" color="yellow" radius="md" className='text-center see-more-btn' compact>
                                    see all
                                </Button>
                            </div>
                        </Skeleton>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={6} md={6} sm={12} >     
                    <Paper shadow="md" radius="lg" p="xl" className='px-0' style={{height: '350px'}}>
                        <Skeleton visible={loading} height='350px' style={{position:'relative'}}>
                            <Title order={3} className="py-4 mx-6">Bureau Heads</Title>
                            {
                                bureaus?
                                bureaus.slice(0,3).map((x)=>
                                    <div>
                                        < BureauHeadsListItem bureau={x} key={x.id + "s"} />
                                        <Divider my="sm" className='px-0 mx-0' />
                                    </div> 
                                ) 
                                : (<Empty text="There are no bureaus, create one"/>)                   
                            }
                            
                            <div style={{position: 'absolute',bottom: '40px',left:'45%',right:'50%'}}>
                                <Button variant="light" color="yellow" radius="md" className='text-center see-more-btn' compact>
                                    see all
                                </Button>
                            </div>
                        </Skeleton>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Container>
    )
}