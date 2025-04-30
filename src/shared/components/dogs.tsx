import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material";
import { useState } from "react"

const doggys = () => {
    const [doggypic, setDoggypic] = useState('')
    const [loading, setLoading] = useState(true)

    const fetchDog = async () => {
        try {
            const res = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await res.json();
            setDoggypic(data.message);
        } catch (err) {
            console.error('Error fetching dog image:', err);
        } finally {
            setLoading(false);
        }
    };




    return (
        <>
            <Box>
                <Typography variant="h4">¡Perrito del dia!</Typography>
                <Button sx={{alignContent:'center', textAlign:'center'}} variant="contained" onClick={fetchDog}>Otro perrito</Button>

                {loading && <CircularProgress />}
                {doggypic && (
                    <Card>
                        <CardMedia
                            component="img"
                            height="300"
                            image={doggypic}
                            alt="A cute dog"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Perrito del dia! 🐾
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </Box>

        </>

    )


}

export default doggys