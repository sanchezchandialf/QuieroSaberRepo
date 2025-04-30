import { Box, Button, Card, CardActions, CardContent, Typography, Container } from "@mui/material"

const GameDay = () => {
    return (
        <Container maxWidth="sm" sx={{ paddingTop: 4 }}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', marginBottom: 4 }}>
                Juegos del Día 🎮
            </Typography>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
            }}>
                <Card elevation={3} sx={{ borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                            Wordle del Día
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Adivina la palabra del día en seis intentos. ¡Pon a prueba tu vocabulario!
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end', paddingX: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            href="https://lapalabradeldia.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Jugar
                        </Button>
                    </CardActions>
                </Card>

                <Card elevation={3} sx={{ borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                            Sudoku del Día
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Resuelve el rompecabezas diario de Sudoku. ¡Entrena tu mente!
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end', paddingX: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            href="https://sudoku.com/es/challenges/sudoku-diario"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Jugar
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    )
}

export default GameDay
