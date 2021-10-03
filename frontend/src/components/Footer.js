import Box from '@mui/material/Box';

export default function Footer() {
    return (
        <footer>
            <Box
                px={{ xs: 3, sm: 10 }}
                py={{ xs: 5, sm: 20 }}
                sx={{ mt: 5}}
                bgcolor="info.main"
                color="white"
            >
                <Box
                    textAlign="center"
                    pt={{ xs: 5, sm: 0 }}
                    pb={{ xs: 5, sm: 0 }}
                >
                    <h3>TeamZero &reg; 2021</h3>
                    @Riuley @yuraaaaaa @omen
                </Box>
            </Box>
        </footer>
    );
}