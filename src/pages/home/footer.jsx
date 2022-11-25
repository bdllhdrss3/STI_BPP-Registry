
import './Style.css'
import logo from "../../assets/images/logo.png"
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FacebookIcon from '@mui/icons-material/Facebook';
import ListItemIcon from '@mui/material/ListItemIcon';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer(){
    return(
        <footer>
            <Grid className="text-white"   container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                    <Grid item xs={12} md={12}>
                        <img className='footerlogo' alt='logo' src={logo}></img>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <List sx={{ width: '100%', maxWidth: 360}}>
                            <ListItem  className="text-white font-bold">
                                <ListItemIcon>
                                    <PhoneIcon className="text-white font-bold" />
                                </ListItemIcon>
                                <ListItemText className="text-white font-bold" primary="+256 781 191 255"/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon >
                                    <MailOutlineIcon  className="text-white" />
                                </ListItemIcon>
                                <ListItemText className="text-white " primary="info@sti.go.ug" />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={3}>
                       <h2 className="text-2xl font-bold mb-5">Quick Links</h2>
                       <ul className='py-5'>
                            <li><a href='https://www.parliament.go.ug/'>Parliament of Uganda</a></li>
                            <li><a href='https://op.go.ug/'>Office of the President</a></li>
                            <li><a href='https://op.go.ug/'>Bureaus</a></li>
                            <li><a href='https://op.go.ug/'>About us</a></li>
                            <li><a href='https://op.go.ug/'>Contact us</a></li>
                       </ul>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <h2 className="text-2xl font-bold mb-5">Site Links</h2>
                       <ul className='py-5'>
                            <li><a href='https://op.go.ug/'>Privacy</a></li>
                            <li><a href='https://op.go.ug/'>Terms of use</a></li>
                            <li><a href='https://op.go.ug/'>Help Center</a></li>
                       </ul>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <h2 className="text-2xl font-bold mb-5">Social Links</h2>
                        <List sx={{ width: '100%', maxWidth: 360}}>
                            <ListItem  className="text-white font-bold">
                                <ListItemIcon>
                                    <FacebookIcon className="text-white font-bold" />
                                </ListItemIcon>
                                <ListItemText className="text-white font-bold" primary="Facebook"/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon >
                                    <TwitterIcon  className="text-white" />
                                </ListItemIcon>
                                <ListItemText className="text-white " primary="Twitter" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon >
                                    <InstagramIcon  className="text-white" />
                                </ListItemIcon>
                                <ListItemText className="text-white " primary="Instagram" />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <span>2022. All Rights Reserved</span>
                    </Grid>
                
                </Grid>
        </footer>
    )
}