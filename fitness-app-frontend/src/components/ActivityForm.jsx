import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Card, CardContent, Typography } from '@mui/material'
import React, { useState } from 'react'
import { addActivity } from '../services/api'

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = useState({
    type: "RUNNING", duration: '', caloriesBurned: '',
    additionalMetrics: {}
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addActivity(activity);
      onActivityAdded();
      setActivity({ type: "RUNNING", duration: '', caloriesBurned: '' });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card sx={{
      mb: 4,
      borderRadius: '2rem',
      background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
      color: '#fff',
      boxShadow: '0 2px 16px #0006',
      width: '100%',
      maxWidth: 400,
      mx: 'auto'
    }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>Add Activity</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: '#fff' }}>Activity Type</InputLabel>
            <Select
              value={activity.type}
              label="Activity Type"
              onChange={(e) => setActivity({ ...activity, type: e.target.value })}
              sx={{ color: '#fff', '.MuiOutlinedInput-notchedOutline': { borderColor: '#444' } }}
            >
              <MenuItem value="RUNNING">Running</MenuItem>
              <MenuItem value="WALKING">Walking</MenuItem>
              <MenuItem value="CYCLING">Cycling</MenuItem>
              <MenuItem value="SWIMMING">Swimming</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Duration (Minutes)"
            type='number'
            sx={{ mb: 2 }}
            value={activity.duration}
            onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
            InputLabelProps={{ style: { color: '#bbb' } }}
            InputProps={{ style: { color: '#fff' } }}
          />
          <TextField
            fullWidth
            label="Calories Burned"
            type='number'
            sx={{ mb: 2 }}
            value={activity.caloriesBurned}
            onChange={(e) => setActivity({ ...activity, caloriesBurned: e.target.value })}
            InputLabelProps={{ style: { color: '#bbb' } }}
            InputProps={{ style: { color: '#fff' } }}
          />
          <Button type='submit' variant='contained' fullWidth sx={{ borderRadius: '1rem', fontWeight: 600 }}>
            Add Activity
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ActivityForm