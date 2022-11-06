import './Style.css'
import Button from '@mui/material/Button';

export default function BureauCard(props){
    return(
        <div className="container">
            <div className='bureau-card'>
                <img src={props.image} alt="bureau" className="bureau-image"></img>
                <span className='bureau-name text-2xl text-white font-bold'>{props.title}</span>
            </div>
            <div class="join-us">
                <Button variant="contained" href="https://forms.gle/bDVctHHgTn2fbsH16">Join us</Button>
            </div>
        </div>
    )
}
