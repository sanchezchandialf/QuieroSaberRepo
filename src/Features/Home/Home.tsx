import { Box, Button, Card, Grid, Typography } from '@mui/material'
import react from 'react'
import Argentina from '../Argentina/Argentina'

const Home = () => {
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    height: "70vh",
                    textAlign: "center",
                    paddingTop: "30px",
                    paddingBottom: "190px", // Reducido para acercar el botón al título
                    paddingLeft: "650px"
                }}
            >
                <Typography component="h1" variant="h1" color="primary" fontWeight="bold" textAlign={"center"}>
                    Quiero Saber
                </Typography>
                <p className="text-xl text-muted-foreground max-w-2xl">
                    Toda la información que necesitas en un solo lugar, de forma simple y accesible.
                </p>
                <Typography component={"h2"} variant='h2' color="primary" fontWeight="bold" textAlign={"center"} paddingTop={"20px"}>Feriados Proximos</Typography>
                <Argentina />
            </Box>
          
        </Box>
    )
}
export default Home
