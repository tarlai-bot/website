import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Alert,
  IconButton,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import { Event } from "../../types";
import { eventsData } from "../../data/events";

export default function EventsList() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Use mall website events data
  const [events, setEvents] = useState<Event[]>(eventsData);

  const categories = [
    "Family",
    "Food",
    "Fashion",
    "Technology",
    "Entertainment",
    "Shopping",
    "Culture",
  ];

  const filteredEvents = events
    .filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (event) => filterCategory === "all" || event.category === filterCategory
    )
    .filter((event) => {
      if (filterStatus === "active") return event.isActive;
      if (filterStatus === "inactive") return !event.isActive;
      if (filterStatus === "featured") return event.isFeatured;
      return true;
    });

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setEvents(events.filter((e) => e.id !== id));
      setSuccessMessage("Event deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleToggleFeatured = (id: string) => {
    setEvents(
      events.map((e) => (e.id === id ? { ...e, isFeatured: !e.isFeatured } : e))
    );
    setSuccessMessage("Featured status updated!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleToggleActive = (id: string) => {
    setEvents(
      events.map((e) => (e.id === id ? { ...e, isActive: !e.isActive } : e))
    );
    setSuccessMessage("Event status updated!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Events Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("new")}
        >
          Add New Event
        </Button>
      </Box>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {/* Filters */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            fullWidth
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={filterCategory}
              label="Category"
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              label="Status"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="featured">Featured</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Card>

      {/* Event Cards */}
      <Grid container spacing={3}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} md={6} key={event.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={
                  event.bannerImage || event.images[0] || "/placeholder.jpg"
                }
                alt={event.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 1,
                  }}
                >
                  <Typography variant="h6" component="h2">
                    {event.title}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleToggleFeatured(event.id)}
                    color={event.isFeatured ? "warning" : "default"}
                  >
                    {event.isFeatured ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                </Box>

                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip label={event.category} size="small" color="primary" />
                  <Chip
                    label={event.isActive ? "Active" : "Inactive"}
                    size="small"
                    color={event.isActive ? "success" : "default"}
                  />
                  {event.isFeatured && (
                    <Chip label="Featured" size="small" color="warning" />
                  )}
                </Stack>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {event.description}
                </Typography>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <CalendarIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(event.startDate)} - {formatDate(event.endDate)}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  📍 {event.location}
                </Typography>

                {event.images.length > 1 && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: "block" }}
                  >
                    {event.images.length} images
                  </Typography>
                )}
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleToggleActive(event.id)}
                >
                  {event.isActive ? "Deactivate" : "Activate"}
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => navigate(`${event.id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(event.id, event.title)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredEvents.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No events found
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("new")}
            sx={{ mt: 2 }}
          >
            Add First Event
          </Button>
        </Box>
      )}
    </Container>
  );
}
