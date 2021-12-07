import { Button } from "@mui/material"
import { Box } from "@mui/system"
import { Link } from "react-router-dom"

export default function SplashScreen() {

    return (
        <div id="splash-screen">
            The Top 5 Lister
            <div id="welcome-text">
            Here, you can share your Top 5's with everyone, and see other's as well!
            </div>
            <div id="dev-text">
            Here, you can share your Top 5's with everyone, and see other's as well!
            </div>
            <Box sx={{p:1}}>
                <Button sx={{p:1, right:"15px"}}variant="contained"> <Link to='/login/'>Login</Link> </Button>
                <Button sx={{p:1, left:"15px"}}variant="contained"> <Link to='/register/'>register</Link> </Button>
            </Box>
        </div>
    )
}