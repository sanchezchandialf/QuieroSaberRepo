import { Box } from '@mui/material';
import Argentina from '../Argentina/Argentina';
import GameDay from '../../shared/components/GameDay';
import Doggys from '../../shared/components/dogs';
const Home = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
        }}
      >
        <Argentina />
        <GameDay />
      </Box>
      <Box sx={{display: 'flex', 
        padding: 2 , 
        flexDirection: { xs: 'column', md: 'row' },
        alignContent: 'center',
        justifyContent: 'center',
       
      
      }}>
      <Doggys />

      </Box>

  
    </Box>
  );
};

export default Home;
