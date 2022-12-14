import './Style.css'
import logo from "../../assets/images/logo.png"
import aerospaceImage from "../../assets/images/aerospace.jpeg"
import exportImage from "../../assets/images/export.jpeg"
import importImage from "../../assets/images/import.jpeg"
import industryImage from "../../assets/images/industry.jpeg"
import infrastructureImage from "../../assets/images/infrastructure.jpeg"
import mobilityImage from "../../assets/images/mobility.jpeg"
import pathogenImage from "../../assets/images/pathogen.jpg"
import productivityImage from "../../assets/images/productivity.jpeg"
import BureauCard from "./bureauCard"
import Footer from "./footer"
import Grid from '@mui/material/Grid';
import { Button } from '@mantine/core';
import { useNavigate, } from "react-router-dom";
import { useSelector } from 'react-redux'


export default function Home(){
    const navigate = useNavigate();
    const loggedIn = useSelector((state) => state.app.loggedIn)

    const toLogin = () => {
        navigate("/login")
    }

    const toHome = () => {
        navigate("/")
    }
    const toDashboard = () => {
        navigate("/dashboard")
    }
    return(
        <div>
            <div className="top-row py-8">
                <header className="px-4 flow-root">
                    <img className='logo mx-10 inline-block float-left ' alt='logo' src={logo}></img>
                    <div className="inline-block float-right my-3 mx-10">
                        <Button.Group>
                            <Button radius="xs" compact size="lg" variant="subtle" color="blue" onClick={toHome}>Home</Button>
                           {loggedIn === false
                            ? <Button radius="xs" compact size="lg" variant="subtle" onClick={toLogin} >Log in</Button>
                            :<Button radius="xs" compact size="lg" variant="subtle" onClick={toDashboard} >Dashboard</Button>
                            }                   
                        </Button.Group>
                    </div>
                </header>
                <div className=" top-banner mt-8">
                    <h1 className="text-5xl text-white font-bold">
                        Implementing the future of Uganda
                    </h1>
                    <p className='text-2xl text-white font-light py-8'>An ecosystem focusing on building a self-sustaining economy</p>
                </div>
                
            </div>
            <section className='mx-10 my-10 bureaus'>
                <Grid  container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                    <Grid item xs={12} md={4}>
                        <BureauCard title="Pathogen Economy" image={pathogenImage} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <BureauCard title="Industry 4.0+" image={industryImage} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <BureauCard title="Mobility" image={mobilityImage} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <BureauCard title="Infrastructure and Innovations" image={infrastructureImage} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <BureauCard title="Aeronautics and space science" image={aerospaceImage} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <BureauCard title="Productivity Accelaration" image={productivityImage} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <BureauCard title="Import substitution" image={importImage} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <BureauCard title="Export promotion" image={exportImage} />
                    </Grid>
                
                </Grid>
            </section>
            <Footer />
            

                 
        </div>
    )
}