import React, { useEffect, useState } from "react";
import "../App.css";
// Array Data
import data from './Data';

// MUI components
import { Button, Grid, Typography } from "@mui/material";

// MUI Icons
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
// images are imported here
// import {image_0, image_1, image_2, image_3, image_4 } from "./image/image";

const Home = () => {

  const [currentImage, setCurrentImage] = useState(0);
  const [timerImage, setTimerImage] = useState(false);
  const [intervalId, setIntervalId] = useState(null)
  const styleIcon = {
    fontSize: '80px'
  }

  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? data.length - 1 : prevImage - 1
    );
  };

  useEffect(()=>{
    if(timerImage){
      const interval = setInterval(()=>{
        setCurrentImage((prevIndex) => (prevIndex + 1) % data.length);
      }, 1000);
      setIntervalId(interval)
    }else{
      clearInterval(intervalId)
    }
    return () => {clearInterval(intervalId);}
      
   }, [timerImage]);

   
   const handleTimerImage = () =>{
    setTimerImage((prevState) => !prevState);
    }


  const handleImageClick = (id) => {
    setTimerImage(false);
    setCurrentImage(id)
  }
  return (
    <div className="home">
      {/*Main Container Grid use to divide 2 section */}
      <Grid container>
        {/*This grid item contains the Image body on the left*/}
        <Grid item sm={12} md={7}>
          {/*This Container contains the main Image and bottom Image carousel */}
          <Grid container>
            <Grid item xs={12}>
              <div className="left-top-content">
                <img src={data[currentImage].image} alt="image" className="responsive" />
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className="left-bottom">
                <Grid container spacing={1}>
                  <Grid item xs={2}>
                    <Button onClick={handlePrev}>
                      <ArrowLeftIcon />
                    </Button>
                  </Grid>

                  {
                    data && data.map((item) => {
                      return <Grid item xs={2}>
                        <img onClick={() => handleImageClick(item.id)}
                          id={item.id}
                          src={item.image}
                          alt="image 1"
                          className="responsive-bottom"
                          style={{ filter: item.id === currentImage ? 'none' : 'grayscale(100%)' }}
                        />
                      </Grid>
                    })
                  }
                  <Grid item xs={2}>
                    <Button onClick={handleNext}>
                      <ArrowRightIcon />
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>

        {/*This Grid Item contains the Details body on the right */}
        <Grid item sm={12} md={5}>
          {/*This Container contains the heading and the details*/}
          <div className="right-content">


            <Grid container >
              <Grid item xs={12}>
                <h1>{data[currentImage].title}</h1>
              </Grid>

              <Grid item xs={12}>
                <div className="description">
                  <p>
                    {data[currentImage].description}
                  </p>
                </div>
              </Grid>



            </Grid>
          </div>
          <Grid item xs={12}>
            <Button onClick={handleTimerImage}>{timerImage ? <PauseCircleIcon style={styleIcon}/> : <PlayCircleIcon style={styleIcon} />}</Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;