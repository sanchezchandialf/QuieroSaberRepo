import { Box, Card, Skeleton, Typography } from "@mui/material"
import { Dolares } from "../../../Types/Types"
import { useEffect, useState } from "react"

const Dolar = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [dolarData, setDolarData] = useState<{
        oficial: Dolares[]
        blue: Dolares[]
        cripto: Dolares[]
    }>({
        oficial: [],
        blue: [],
        cripto: [],
    })

    useEffect(() => {
        const fetchDolar = async () => {
            try {
                const [res1, res2, res3] = await Promise.all([
                    fetch('https://dolarapi.com/v1/dolares/oficial'),
                    fetch('https://dolarapi.com/v1/dolares/blue'),
                    fetch('https://dolarapi.com/v1/dolares/cripto'),
                ])

                const [data1, data2, data3] = await Promise.all([
                    res1.json(),
                    res2.json(),
                    res3.json(),
                ])

                setDolarData({
                    oficial: Array.isArray(data1) ? data1 : [data1],
                    blue: Array.isArray(data2) ? data2 : [data2],
                    cripto: Array.isArray(data3) ? data3 : [data3],
                })
            } catch (err) {
                setError('No se pudieron obtener los datos del dólar.')
            } finally {
                setLoading(false)
            }
        }

        fetchDolar()
    }, [])

    const formatearFecha = (fecha: string) =>
        new Date(fecha).toLocaleString('es-AR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })

    const renderCards = (title: string, data: Dolares[]) => (
        <Box sx={{ flex: 1, minWidth: 280 }}>
            <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', marginBottom: 2 }}>{title}</Typography>
            {data.map((dolar, index) => (
                <Card key={index} sx={{ padding: 2, marginBottom: 2, borderRadius: 2, boxShadow: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{dolar.casa}</Typography>
                    <Typography variant="body2">Compra: {dolar.compra}</Typography>
                    <Typography variant="body2">Venta: {dolar.venta}</Typography>
                    <Typography variant="caption" color="text.secondary">Actualizado: {formatearFecha(dolar.fechaActualizacion)}</Typography>
                </Card>
            ))}
        </Box>
    )

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', marginBottom: 4 }}>
                Cotización del Dólar 💵
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                    {[1, 2, 3].map(index => (
                        <Skeleton key={index} variant="rectangular" width={300} height={160} />
                    ))}
                </Box>
            ) : error ? (
                <Typography color="error" align="center">{error}</Typography>
            ) : (
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 3,
                    justifyContent: 'space-between'
                }}>
                    {renderCards('Dólar Oficial', dolarData.oficial)}
                    {renderCards('Dólar Blue', dolarData.blue)}
                    {renderCards('Dólar Cripto', dolarData.cripto)}
                </Box>
            )}
        </Box>
    )
}

export default Dolar
