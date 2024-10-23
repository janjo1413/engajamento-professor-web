import { Box, LinearProgress, Typography } from "@mui/material";

export default function ProgressBar(props) {
    const value = (props.current / props.target) * 100;
    return (
      <Box sx={{ width: '100%'}}>
        <Box>
          <LinearProgress variant="determinate" value={value}/>
        </Box>
      </Box>
    );
  }
  