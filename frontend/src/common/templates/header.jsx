import React from 'react'
import '../../styles/scss/header.scss'
import TwitterIcon from '@material-ui/icons/Twitter';
import ListIcon from '@material-ui/icons/List';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import {AppBar, IconButton,Toolbar, Typography, Link} from "@material-ui/core";

export default function props() {
    return (
        <div>
            <AppBar position="static" variant={'primary'} >
                <Toolbar>
                    <IconButton href={'/'} edge="start" color="inherit" aria-label="menu">
                        <TwitterIcon style={{fontSize: 40}} />
                    </IconButton>
                    <Link variant="h4" href={'/'} style={{flexGrow: 1, color: 'white'}}>
                       Trump's Twitter Data
                    </Link>
                    <IconButton edge="start" color="inherit" aria-label="menu" href={'/list'} style={{"&hover":"white"}}>
                        <ListIcon style={{fontSize: 30}} />
                    </IconButton>
                    <Link variant="h5" href={'/list'} style={{marginRight:'1vw', color: 'white'}}>
                        Tweet List
                    </Link>
                    <IconButton edge="start" color="inherit" aria-label="menu" href={'/'}>
                        <EqualizerIcon style={{fontSize: 30}} />
                    </IconButton>
                    <Link variant="h5" href={'/'} style={{marginRight:'1vw', color: 'white'}}>
                        Graphs
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}

// export default props => (
//     <header className={'main-header'} >
//         <a href={'/'} className={'logo'}>
//                 <span className={'logo-lg'} style={{color: "purple"}}>
//                     <b className={"h1"}><PhoneIcon style={{fontSize: 40, color: "purple"}}/> <strong>VxTel</strong> </b>
//                 </span>
//         </a>
//     </header>
// )
