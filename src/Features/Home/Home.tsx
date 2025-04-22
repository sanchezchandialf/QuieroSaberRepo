import { Box} from '@mui/material'
import Argentina from '../Argentina/Argentina'

const Home = () => {
    return (
        <Box>
            
            <Box
                sx={{
                    display: 'flex',
                    padding: 3,
                    gap: 3,

                }}
            >


                <Argentina />
            </Box>

        </Box>
    )
}
export default Home
