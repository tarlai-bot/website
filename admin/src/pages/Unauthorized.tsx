import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Lock } from "@mui/icons-material";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Lock sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
        <Typography variant="h3" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          You don't have permission to access this page.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </Button>
      </Container>
    </Box>
  );
}
