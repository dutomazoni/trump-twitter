import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../styles/scss/tweet-dashboard.scss'
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, Input, InputLabel, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import {Spinner} from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { format } from 'date-fns';
import LoopIcon from '@material-ui/icons/Loop';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


export default () => {
    let [tweets, setTweets] = useState([]);
    let [text, setText] = useState('');
    let [number, setNumber] = useState(50);
    const [isLoading, updateLoading] = useState(true)

    const getTweets =  (parameter) => {
        axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
        axios.get("http://192.168.0.36:5001/tweets?from="+parameter)
            .then((response) => {
                // console.log(response)
                setTweets([...tweets, ...response.data.tweets])
                if(tweets === undefined) {
                    updateLoading(true)
                }else {
                    updateLoading(false)
                }
                return response.data.tweets
            })
    }

    const getTweet =  (target, parameter) => {
        axios.get("http://192.168.0.36:5001/tweet?target="+target+"&from="+parameter)
            .then((response) => {
                setTweets(response.data.tweets)
            })
    }
    useEffect( () => {
        getTweets()
    }, [])

    const handleLoad = () => {
        if(text){
            if(number > tweets.length){
                return(
                    toast.info('Nothing more to load!')
                )
            }else{
                getTweet(text,number)
            }
        }else{
            getTweets(number)
        }
        setNumber(number+50)
    }

    const reset = () => {
        setTweets([])
        setText('')
        getTweets(0)
    }

    const StyledTableCell = withStyles(() => ({
        head: {
            backgroundColor: "#002984",
            color: "white",
            fontSize: 20
        },
        body: {
            fontSize: 16,
            backgroundColor: "#9da2ef",
        },
    }))(TableCell);


    const tweetsTable = (props) => {
            return (
                <div className={"table-div"}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Date</StyledTableCell>
                                    <StyledTableCell align="center">Target</StyledTableCell>
                                    <StyledTableCell align="center"><strong>Insult</strong></StyledTableCell>
                                    <StyledTableCell align="center">Full Tweet</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.map((tweet) => {
                                    return (
                                        <TableRow>
                                            <StyledTableCell align="center">
                                                {format(new Date(tweet.date),'dd/MM/yyyy')}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {tweet.target}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <strong>{tweet.insult}</strong>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {tweet.tweet}
                                            </StyledTableCell>
                                        </TableRow>
                                    )
                                })}

                            </TableBody>
                        </Table>
                        <Button variant={'contained'} color={'primary'} size={'large'} style={{margin: '2vh auto', display:'flex'}} endIcon={<LoopIcon/>} onClick={handleLoad} >Load More </Button>
                    </TableContainer>
                </div>
            )
    }
    return (
        <div className={"container"}>
            <h2 style={{color:'blue'}}> Trump has tweeted over <strong>ten thousand times</strong> from 2015 to 2021.</h2>
            <h3 style={{color:'blue'}}> Here you can search for one of his targets by name!</h3>
            <form className={'form'} style={{margin:"1vw"}}>
                <InputLabel  style={{marginTop:"2vw", fontSize:"2rem", color:"#3f51b5"}}> Target:  </InputLabel>
                <TextField  variant="outlined" placeholder="NFL" style={{margin:"1vw",width: "30%", fontSize: "2rem"}} value={text} onChange={e => setText(e.target.value)}/>
                <Button variant={'contained'} color={'primary'} size={'medium'} style={{margin: '2vh', display:'flex', alignContent:'flex-end', padding:'1vh'}} endIcon={<SearchIcon/>}
                        onClick={() => getTweet(text, 0)}> Search </Button>
                <Button variant={'contained'} color={'primary'} size={'medium'} style={{margin: '2vh', display:'flex', alignContent:'flex-end', padding:'1vh'}} endIcon={<HighlightOffIcon/>}
                        onClick={reset}> Reset </Button>
            </form>

            {isLoading ? <div className={'spinner-div'}><Spinner animation="border" variant={"primary"}/></div> : tweetsTable(tweets)}
            <ToastContainer/>
        </div>
    )

}
