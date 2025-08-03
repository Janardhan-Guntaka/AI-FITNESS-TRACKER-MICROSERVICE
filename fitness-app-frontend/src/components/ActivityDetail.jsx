import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getActivityDetail } from '../services/api';
import { Box, Card, CardContent, Divider, Typography, Avatar, Chip, Stack } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import PoolIcon from '@mui/icons-material/Pool';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';

const activityIcons = {
  RUNNING: <DirectionsRunIcon />,
  WALKING: <DirectionsWalkIcon />,
  CYCLING: <DirectionsBikeIcon />,
  SWIMMING: <PoolIcon />,
};

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await getActivityDetail(id);
        setActivity(response.data);
        setRecommendation(response.data.recommendation);
      } catch (error) {
        console.error(error);
      }
    }

    fetchActivityDetail();
  }, [id]);

  if (!activity) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box sx={{
      maxWidth: 400,
      mx: 'auto',
      p: 2,
      borderRadius: '50%',
      background: 'radial-gradient(circle at 60% 40%, #222 70%, #111 100%)',
      boxShadow: '0 4px 32px #000a',
      minHeight: 500,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Card sx={{
        mb: 2,
        borderRadius: '2rem',
        background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
        color: '#fff',
        boxShadow: '0 2px 16px #0006',
        width: '90%',
        mx: 'auto'
      }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Avatar sx={{ bgcolor: '#1e88e5', width: 64, height: 64, mx: 'auto', mb: 1 }}>
            {activityIcons[activity.type] || <DirectionsRunIcon />}
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{activity.type}</Typography>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 1 }}>
            <Chip label={`${activity.duration} min`} color="primary" sx={{ fontWeight: 600 }} />
            <Chip label={`${activity.caloriesBurned} kcal`} color="secondary" sx={{ fontWeight: 600 }} />
          </Stack>
          <Typography variant="body2" sx={{ color: '#bbb' }}>
            {new Date(activity.createdAt).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>

      {recommendation && (
        <Card sx={{
          borderRadius: '2rem',
          background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
          color: '#fff',
          boxShadow: '0 2px 16px #0006',
          width: '90%',
          mx: 'auto'
        }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>AI Recommendation</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#90caf9' }}>Analysis</Typography>
            <Typography paragraph sx={{ mb: 2 }}>{activity.recommendation}</Typography>

            <Divider sx={{ my: 2, bgcolor: '#444' }} />

            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#a5d6a7' }}>Improvements</Typography>
            {activity?.improvements?.map((improvement, index) => (
              <Typography key={index} paragraph sx={{ fontSize: '1rem' }}>• {improvement}</Typography>
            ))}

            <Divider sx={{ my: 2, bgcolor: '#444' }} />

            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#ffe082' }}>Suggestions</Typography>
            {activity?.suggestions?.map((suggestion, index) => (
              <Typography key={index} paragraph sx={{ fontSize: '1rem' }}>• {suggestion}</Typography>
            ))}

            <Divider sx={{ my: 2, bgcolor: '#444' }} />

            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#ffab91' }}>Safety Guidelines</Typography>
            {activity?.safety?.map((safety, index) => (
              <Typography key={index} paragraph sx={{ fontSize: '1rem' }}>• {safety}</Typography>
            ))}
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default ActivityDetail