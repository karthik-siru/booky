import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import { Typography } from "@mui/material";
import "../../styles.css";

export default function Footer() {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 5 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="#353f43"
        textAlign={"center"}
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={10}>
            <Grid item xs={12} sm={6}>
              <Box borderBottom={1}>
                <Typography variant="h4" gutterBottom>
                  Help
                </Typography>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <Typography variant="h6" gutterBottom>
                    Contact
                  </Typography>
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <Typography variant="h6" gutterBottom>
                    Support
                  </Typography>
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <Typography variant="h6" gutterBottom>
                    Privacy
                  </Typography>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box borderBottom={1}>
                <Typography variant="h4" gutterBottom>
                  Account
                </Typography>
              </Box>
              <Box>
                <Link href="/login" color="inherit">
                  <Typography variant="h6" gutterBottom>
                    Login
                  </Typography>
                </Link>
              </Box>
              <Box>
                <Link href="/register" color="inherit">
                  <Typography variant="h6" gutterBottom>
                    Register
                  </Typography>
                </Link>
              </Box>
            </Grid>
          </Grid>
          Booky :Made by Team : Karthik ,Suman ,Keerthi Bhavan &reg;{" "}
          {new Date().getFullYear()}
        </Container>
      </Box>
    </footer>
  );
}
