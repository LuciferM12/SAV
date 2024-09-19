import { createTheme } from '@mui/material/styles';
import { brown, deepOrange } from '@mui/material/colors';


const Theme = createTheme({
    palette: {
        primary: {
            main: deepOrange[500],
        },
        secondary: {
            main: brown[500],
        },
    },
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    color: '#ffffff'
                }
            }
        }
    }
})

export default Theme