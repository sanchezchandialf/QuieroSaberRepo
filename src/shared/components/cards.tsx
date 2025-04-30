import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Skeleton,
 
} from '@mui/material';
import Feriados from '../../Types/Types';

export default function FeriadosWidget() {
  const [loading, setLoading] = useState(true);
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
    <Box
      sx={{
        width: '100%',
        maxWidth: 420,
        margin: '0 auto',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        Próximos Feriados 🇦🇷
      </Typography>

      <Card
        sx={{
          padding: 2,
          boxShadow: 3,
          borderRadius: 3,
          backgroundColor: '#fff',
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[1, 2, 3].map(index => (
              <Skeleton key={index} variant="rounded" height={100} />
            ))}
          </Box>
        ) : error ? (
          <Typography color="error" align="center">{error}</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {feriadosProximos.map((feriado, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  backgroundColor: '#f9f9f9',
                  boxShadow: 1,
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {feriado.nombre}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 0.5 }}>
                    📅 {feriado.fecha}
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary', marginTop: 1 }}>
                    {feriado.tipo}
                  </Typography>
                </CardContent>
               
              </Card>
            ))}
          </Box>
        )}
      </Card>
    </Box>
  );
}
