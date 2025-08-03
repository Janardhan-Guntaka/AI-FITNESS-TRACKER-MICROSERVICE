import { Card, CardContent, Grid, Typography, Avatar, Stack, Chip, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { getActivities } from '../services/api';
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

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 3 }}>
      <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 600 }}>
        {activities.map((activity) => (
          <Grid item xs={12} sm={8} md={6} key={activity.id}>
            <Card
              sx={{
                borderRadius: '2rem',
                background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
                color: '#fff',
                boxShadow: '0 2px 16px #0006',
                cursor: 'pointer',
                width: '100%',
                transition: 'transform 0.15s',
                '&:hover': { transform: 'scale(1.03)' }
              }}
              onClick={() => navigate(`/activities/${activity.id}`)}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: '#1e88e5', width: 48, height: 48, mx: 'auto', mb: 1 }}>
                  {activityIcons[activity.type] || <DirectionsRunIcon />}
                </Avatar>
                <Typography variant='h6' sx={{ fontWeight: 700 }}>{activity.type}</Typography>
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 1, mt: 1 }}>
                  <Chip label={`${activity.duration ?? 'N/A'} min`} color="primary" sx={{ fontWeight: 600 }} />
                  <Chip label={`${activity.caloriesBurned ?? 'N/A'} kcal`} color="secondary" sx={{ fontWeight: 600 }} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ActivityList