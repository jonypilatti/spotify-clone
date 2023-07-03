import axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useDataLayerValue } from '../DataLayer';

const ActualPlayer = () => {
    const [{token, currentlyPlaying,currentlyPlayingDuration}, dispatch] = useDataLayerValue();

    useEffect(()=>{
    const getCurrentTrackInfo=async()=>{
const response= await axios.get(`https://api.spotify.com/v1/tracks/${currentlyPlaying?.id}`

,{
    headers:{Authorization:`Bearer ${token}`,
"Content-Type": "application/json",}})
const data=response.data
await dispatch({type:"CURRENTLY_PLAYING_DURATION",currentlyPlayingDuration:data})

}
getCurrentTrackInfo()
},[currentlyPlaying])
const ms=currentlyPlayingDuration?.duration_ms
const msToMinutesAndSeconds = () => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
return (
    <Container>
    <p className="pro">0:00</p>
    <input type="range" id="Progress" className="progress" value={msToMinutesAndSeconds()}></input>

    <p className="dur">{ ms ? msToMinutesAndSeconds(): "0:00"}</p>
    </Container>
    )
}
const Container= styled.div`
display:flex;
gap:1rem;
font-size:12px;
bottom:0;
margin:0.3rem;
.progress{
    width:28rem;
    height:0.25rem;
    border-radius:200px;
    color:red;
    back
}
.dur{
    color:white;
}
.pro{
    color:white;
}

.`

export default ActualPlayer