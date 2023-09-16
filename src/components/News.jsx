import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import CircleLoader from 'react-spinners/CircleLoader';
import { selectNews } from '../redux/news/newsSlice';

const News = () => {
  const newsArr = useSelector(selectNews);
  const location = useLocation();

  const countryName = decodeURI(location.pathname.split('/')[2]);

  const { data } = newsArr;

  const renderHtmlContent = (htmlString) => ({ __html: htmlString });

  const truncateText = (text, maxLength) => {
    const words = text.split(' ');
    if (words.length > maxLength) {
      return `${words.slice(0, maxLength).join(' ')}...`;
    }
    return text;
  };

  const excludedSrc = 'Reddit r/bitcoin';

  if (!data) return <CircleLoader color="#36d7b7" />;

  return (
    <Box>
      <h5 style={{ color: '#fff' }}>
        {countryName}
        {' '}
        News
      </h5>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {data?.map((item) => (item.source === excludedSrc ? null : (
          <Card
            key={item.uuid}
            elevation={1}
            placement="top-center"
            sx={{ background: '#1e0ecF', color: '#fff', padding: '1rem' }}
          >
            <CardActionArea>
              <CardMedia
                image={item.image_url}
                component="img"
                alt={item.source}
                height="140"
              />
              <CardContent>
                <Typography
                  dangerouslySetInnerHTML={renderHtmlContent(item.title)}
                  variant="h6"
                  component="div"
                  gutterBottom
                />
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={renderHtmlContent(
                    truncateText(item.description, 200),
                  )}
                />
              </CardContent>
              <CardActions>
                <Link
                  style={{ textDecoration: 'none', color: 'chartreuse' }}
                  to={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit page...
                </Link>
              </CardActions>
            </CardActionArea>
          </Card>
        )))}
      </Box>
    </Box>
  );
};

export default News;
