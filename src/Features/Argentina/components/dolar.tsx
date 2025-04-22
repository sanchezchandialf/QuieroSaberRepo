import { Box, Card, Skeleton, Typography } from "@mui/material"
import { Dolares } from "../../../Types/Types"
import { useEffect, useState } from "react"

const Dolar = () => {
    const [loading, setLoading] = useState<boolean>(true)
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

    const renderCards = (data: Dolares[]) => (
        data.map((dolar, index) => (
            <Card key={index} sx={{ padding: 2, marginBottom: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>{dolar.casa}</Typography>
                <Typography variant="body1">Compra: {dolar.compra}</Typography>
                <Typography variant="body1">Venta: {dolar.venta}</Typography>
                <Typography variant="body1">Fecha Actualización: {formatearFecha(dolar.fechaActualizacion)}</Typography>
            </Card>
        ))
    )

    return (
        <Box>
            <Box sx={{ display: 'flex' }}>
                <Card sx={{ padding: 2, width: '100%' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Dólar Hoy</Typography>
                </Card>
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {[1, 2, 3].map(index => (
                        <Skeleton key={index} variant="rectangular" width={300} height={160} />
                    ))}
                </Box>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <>
                    <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                        {renderCards(dolarData.oficial)}
                    </Box>
                    <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                        {renderCards(dolarData.blue)}
                    </Box>
                    <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                        {renderCards(dolarData.cripto)}
                    </Box>
                </>
            )}
        </Box>
    )
}

export default Dolar
