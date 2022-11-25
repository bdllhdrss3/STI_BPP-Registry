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
import { useSelector, useDispatch } from 'react-redux'
import {setBureaus,setBureauLeads} from '../../store/app/index'
import axios from "../../axios/index";

export default function Dashboard(){
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(true)

    const bureaus = useSelector((state) => state.app.bureaus)

    useEffect(() => {
        // Fetch Bureaus
        setLoading(true)
        axios.get(`/get_bureau`)
            .then(function (response) {
                setLoading(true)
                dispatch(setBureaus({bureaus:response.data}))
                setLoading(false)
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
                  setLoading(false)
                }
            )

        // get leads
        axios.get(`/get_bureau_lead`)
            .then(function (response) {
                setLoading(true)
                dispatch(setBureauLeads({bureauLeads:response.data.data}))
                setLoading(false)
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
                  setLoading(false)
                }
            )
      },[dispatch]);

 
    return(
        <Container fluid>
            <div class="flow-root">  
                <CreateBureau/>
            </div>
            <Grid  grow gutter="lg" >
                <Grid.Col span={6} md={6} sm={12} >     
                    <Paper shadow="md" radius="lg" p="xl" className='px-0' style={{height: '350px'}}>
                        <Skeleton visible={loading} height='350px' style={{position:'relative'}}>
                            <Title order={3} className="py-4 mx-6 ">Bureaus</Title>
                            {
                                bureaus.length?
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
                                bureaus.length?
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