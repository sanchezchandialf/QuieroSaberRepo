import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import Feriados from '../../Types/Types';

export default function BasicCard() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [feriados, setFeriados] = useState<Array<Feriados>>([]);

    useEffect(() => {
        const fetchFeriados = async () => {
            try {
                const res = await fetch('https://api.argentinadatos.com/v1/feriados/2025');
                const data = await res.json();
                setFeriados(data);
            } catch (err) {
                setError('No se pudieron obtener los feriados');
            } finally {
                setLoading(false);
            }
        };

        fetchFeriados();
    }, []);

    const feriadosProximos = feriados
        .filter(f => new Date(f.fecha) > new Date())
        .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
        .slice(0, 3);

    return (
        <>
            <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold' }}>
                Próximos Feriados
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {[1, 2, 3].map(index => (
                        <Skeleton key={index} variant="rectangular" width={300} height={160} />
                    ))}
                </Box>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 3,
                        justifyContent: 'flex-start',
                    }}
                >
                    {feriadosProximos.map((feriado, index) => (
                        <Card
                            key={index}
                            sx={{
                                width: 300,
                                transition: 'transform 0.2s ease, box-shadow 0.3s ease',
                                boxShadow: 2,
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 6,
                                },
                                borderRadius: 2,
                                backgroundColor: '#fdfdfd',
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {feriado.nombre}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary', marginTop: 0.5 }}
                                >
                                    📅 {feriado.fecha}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ marginTop: 1, fontStyle: 'italic', color: 'text.secondary' }}
                                >
                                    {feriado.tipo}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        marginLeft: 1,
                                        textTransform: 'none',
                                        borderRadius: 2,
                                    }}
                                >
                                    Saber más
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            )}
        </>
    );
}
