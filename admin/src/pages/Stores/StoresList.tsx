import { useState, useEffect } from "react";
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
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { StoreType, Store } from "../../types";
import {
  storesData,
  restaurantsData,
  entertainmentData,
  hypermarketData,
} from "../../data/stores";

interface StoresListProps {
  type: StoreType;
}

export default function StoresList({ type }: StoresListProps) {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFloor, setFilterFloor] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Get data based on type - directly from mall website data
  const getStoresByType = (): Store[] => {
    switch (type) {
      case "store":
        return storesData;
      case "restaurant":
        return restaurantsData;
      case "entertainment":
        return entertainmentData;
      case "hypermarket":
        return hypermarketData;
      default:
        return [];
    }
  };

  const [stores, setStores] = useState<Store[]>([]);

  // Update stores when type changes
  useEffect(() => {
    setStores(getStoresByType());
  }, [type]);

  const filteredStores = stores
    .filter((store) => store.type === type)
    .filter((store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((store) => filterFloor === "all" || store.floor === filterFloor)
    .filter(
      (store) => filterCategory === "all" || store.category === filterCategory
    );

  const floors = [
    "Lower Ground",
    "Ground Floor",
    "First Floor",
    "Second Floor",
    "Third Floor",
  ];

  const categories: Record<StoreType, string[]> = {
    store: [
      "Fashion",
      "Electronics",
      "Home & Living",
      "Beauty",
      "Sports",
      "Toys",
      "Books",
    ],
    restaurant: ["Italian", "Asian", "Arabic", "Fast Food", "Cafe", "Desserts"],
    entertainment: ["Cinema", "Gaming", "Kids Zone", "Arcade"],
    hypermarket: ["Groceries", "Supermarket"],
  };

  const getTypeTitle = (type: StoreType): string => {
    const titles: Record<StoreType, string> = {
      store: "Stores",
      restaurant: "Dining",
      entertainment: "Entertainment",
      hypermarket: "Hypermarket",
    };
    return titles[type];
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      setStores(stores.filter((s) => s.id !== id));
      setSuccessMessage("Store deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleToggleActive = (id: string) => {
    setStores(
      stores.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
    setSuccessMessage("Store status updated!");
    setTimeout(() => setSuccessMessage(""), 3000);
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
        <Typography variant="h4">{getTypeTitle(type)} Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("new")}
        >
          Add New
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
            placeholder="Search by name..."
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
            <InputLabel>Floor</InputLabel>
            <Select
              value={filterFloor}
              label="Floor"
              onChange={(e) => setFilterFloor(e.target.value)}
            >
              <MenuItem value="all">All Floors</MenuItem>
              {floors.map((floor) => (
                <MenuItem key={floor} value={floor}>
                  {floor}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={filterCategory}
              label="Category"
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories[type].map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Card>

      {/* Store Cards */}
      <Grid container spacing={3}>
        {filteredStores.map((store) => (
          <Grid item xs={12} sm={6} md={4} key={store.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={store.image || "/placeholder.jpg"}
                alt={store.name}
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
                    {store.name}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleToggleActive(store.id)}
                    color={store.isActive ? "success" : "default"}
                  >
                    {store.isActive ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </Box>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip label={store.category} size="small" />
                  <Chip label={store.floor} size="small" variant="outlined" />
                </Stack>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {store.description || "No description"}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => navigate(`${store.id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(store.id, store.name)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredStores.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No {getTypeTitle(type).toLowerCase()} found
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("new")}
            sx={{ mt: 2 }}
          >
            Add First {getTypeTitle(type).slice(0, -1)}
          </Button>
        </Box>
      )}
    </Container>
  );
}
