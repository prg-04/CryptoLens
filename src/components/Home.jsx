import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useNavigate } from 'react-router-dom';
import { countries } from '../constants/constant';
import { fetchAllNews } from '../redux/IntlNews/globalNewsSlice';
import { fetchNews } from '../redux/news/newsSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (country) => {
    dispatch(fetchNews(country.symbol));

    navigate(`/news/${country.country}`);
  };

  const getAllNews = () => {
    dispatch(fetchAllNews());
    navigate('/news/intl');
  };

  return (
    <Box>
      <Box className="hero ">
        <h1 className="text-white my-4">
          Explore over 100,000+ Finance & Market News from All Over The World.
        </h1>
        <ArrowCircleRightOutlinedIcon
          onClick={getAllNews}
          sx={{ color: '#fff', fontSize: '1.5rem', marginTop: '3rem' }}
        />
      </Box>
      <Grid container spacing={1}>
        {countries.map((country) => (
          <Grid item key={country.entities} xs={6}>
            <Card
              sx={{
                backgroundImage: `url(${country.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '200px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end',
                justifyContent: 'flex-end',
              }}
              onClick={() => handleClick(country)}
            >
              <CardContent
                sx={{
                  position: 'relative',
                  zIndex: 10,
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'end',
                  height: '100%',
                }}
              >
                <ArrowCircleRightOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                <Box>
                  <Typography variant="h3" className="fs-6 text-white">
                    {country.country}
                  </Typography>
                  <Typography variant="h5">{country.entities}</Typography>
                </Box>
              </CardContent>
            </Card>
            <div className="overlay" />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
