import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
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
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  CheckCircle as OccupiedIcon,
  Cancel as VacantIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { RentalSpace, RentalSpaceStatus } from "../../types";

export default function RentalSpacesList() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFloor, setFilterFloor] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<RentalSpaceStatus | "all">(
    "all"
  );
  const [filterType, setFilterType] = useState<string>("all");

  // Sample rental spaces data
  const [rentalSpaces, setRentalSpaces] = useState<RentalSpace[]>([
    {
      id: "rs-001",
      spaceNumber: "GF-101",
      floor: "Ground Floor",
      area: 150,
      type: "Retail",
      status: "occupied",
      monthlyRent: 15000,
      description: "Prime location near main entrance",
      features: ["High foot traffic", "Corner unit", "Large display window"],
      tenant: {
        name: "Zara",
        contactPerson: "Ahmed Ali",
        phone: "+966 50 123 4567",
        email: "ahmed@zara.com",
        leaseStartDate: "2024-01-01",
        leaseEndDate: "2026-12-31",
      },
      isOnMap: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: "Admin",
    },
    {
      id: "rs-002",
      spaceNumber: "GF-102",
      floor: "Ground Floor",
      area: 120,
      type: "Retail",
      status: "occupied",
      monthlyRent: 12000,
      description: "Adjacent to Zara, high visibility",
      features: ["High foot traffic", "Modern facilities"],
      tenant: {
        name: "H&M",
        contactPerson: "Sara Mohammed",
        phone: "+966 55 234 5678",
        email: "sara@hm.com",
        leaseStartDate: "2024-03-01",
        leaseEndDate: "2027-02-28",
      },
      isOnMap: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: "Admin",
    },
    {
      id: "rs-003",
      spaceNumber: "1F-201",
      floor: "First Floor",
      area: 200,
      type: "Retail",
      status: "vacant",
      monthlyRent: 18000,
      description: "Large space suitable for electronics or home goods",
      features: ["High ceiling", "Storage room", "Easy access"],
      isOnMap: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: "Admin",
    },
    {
      id: "rs-004",
      spaceNumber: "2F-FC-01",
      floor: "Second Floor",
      area: 80,
      type: "Food & Beverage",
      status: "occupied",
      monthlyRent: 10000,
      description: "Food court location",
      features: ["Kitchen equipped", "Seating area", "High traffic"],
      tenant: {
        name: "Pizza Hut",
        contactPerson: "Khalid Hassan",
        phone: "+966 50 345 6789",
        email: "khalid@pizzahut.com",
        leaseStartDate: "2023-06-01",
        leaseEndDate: "2026-05-31",
      },
      isOnMap: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: "Admin",
    },
    {
      id: "rs-005",
      spaceNumber: "3F-301",
      floor: "Third Floor",
      area: 250,
      type: "Entertainment",
      status: "occupied",
      monthlyRent: 25000,
      description: "Large entertainment space",
      features: ["Soundproof", "High ceiling", "Separate entrance"],
      tenant: {
        name: "Cinema Complex",
        contactPerson: "Fatima Ahmed",
        phone: "+966 55 456 7890",
        email: "fatima@cinema.com",
        leaseStartDate: "2023-01-01",
        leaseEndDate: "2028-12-31",
      },
      isOnMap: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: "Admin",
    },
    {
      id: "rs-006",
      spaceNumber: "OUTDOOR-01",
      floor: "Ground Floor - Outdoor",
      area: 30,
      type: "Kiosk",
      status: "vacant",
      monthlyRent: 5000,
      description: "Outdoor kiosk near parking entrance",
      features: ["High visibility", "24/7 access", "Covered"],
      isOnMap: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: "Admin",
    },
    {
      id: "rs-007",
      spaceNumber: "2F-FC-02",
      floor: "Second Floor",
      area: 60,
      type: "Food & Beverage",
      status: "vacant",
      monthlyRent: 8000,
      description: "Food court space with partial equipment",
      features: ["Basic kitchen", "Counter space"],
      isOnMap: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: "Admin",
    },
    {
      id: "rs-008",
      spaceNumber: "STORAGE-01",
      floor: "Lower Ground",
      area: 100,
      type: "Storage",
      status: "vacant",
      monthlyRent: 3000,
      description: "Storage space for retailers",
      features: ["Climate controlled", "24/7 access", "Security"],
      isOnMap: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: "Admin",
    },
  ]);

  const filteredSpaces = rentalSpaces
    .filter(
      (space) =>
        space.spaceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.tenant?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((space) => filterFloor === "all" || space.floor === filterFloor)
    .filter((space) => filterStatus === "all" || space.status === filterStatus)
    .filter((space) => filterType === "all" || space.type === filterType);

  const floors = [
    "all",
    ...Array.from(new Set(rentalSpaces.map((s) => s.floor))),
  ];

  const types = [
    "all",
    ...Array.from(new Set(rentalSpaces.map((s) => s.type))),
  ];

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this rental space?")) {
      setRentalSpaces(rentalSpaces.filter((space) => space.id !== id));
      setSuccessMessage("Rental space deleted successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const getStatusColor = (status: RentalSpaceStatus) => {
    switch (status) {
      case "occupied":
        return "success";
      case "vacant":
        return "primary";
      case "maintenance":
        return "warning";
      case "reserved":
        return "info";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: RentalSpaceStatus) => {
    return status === "occupied" ? (
      <OccupiedIcon fontSize="small" />
    ) : (
      <VacantIcon fontSize="small" />
    );
  };

  // Calculate statistics
  const stats = {
    total: rentalSpaces.length,
    occupied: rentalSpaces.filter((s) => s.status === "occupied").length,
    vacant: rentalSpaces.filter((s) => s.status === "vacant").length,
    maintenance: rentalSpaces.filter((s) => s.status === "maintenance").length,
    totalArea: rentalSpaces.reduce((sum, s) => sum + s.area, 0),
    occupancyRate: Math.round(
      (rentalSpaces.filter((s) => s.status === "occupied").length /
        rentalSpaces.length) *
        100
    ),
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold">
            Rental Spaces Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/rental-spaces/new")}
          >
            Add Rental Space
          </Button>
        </Box>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={2}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Total Spaces
                </Typography>
                <Typography variant="h4" component="div">
                  {stats.total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card sx={{ bgcolor: "success.light" }}>
              <CardContent>
                <Typography color="white" gutterBottom variant="body2">
                  Occupied
                </Typography>
                <Typography variant="h4" component="div" color="white">
                  {stats.occupied}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card sx={{ bgcolor: "primary.light" }}>
              <CardContent>
                <Typography color="white" gutterBottom variant="body2">
                  Vacant
                </Typography>
                <Typography variant="h4" component="div" color="white">
                  {stats.vacant}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card sx={{ bgcolor: "warning.light" }}>
              <CardContent>
                <Typography color="white" gutterBottom variant="body2">
                  Maintenance
                </Typography>
                <Typography variant="h4" component="div" color="white">
                  {stats.maintenance}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Total Area
                </Typography>
                <Typography variant="h5" component="div">
                  {stats.totalArea} m²
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Occupancy Rate
                </Typography>
                <Typography variant="h4" component="div">
                  {stats.occupancyRate}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters */}
        <Card sx={{ mb: 3, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search by space number, tenant, or description..."
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
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) =>
                    setFilterStatus(e.target.value as RentalSpaceStatus | "all")
                  }
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="occupied">Occupied</MenuItem>
                  <MenuItem value="vacant">Vacant</MenuItem>
                  <MenuItem value="maintenance">Maintenance</MenuItem>
                  <MenuItem value="reserved">Reserved</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <FormControl fullWidth>
                <InputLabel>Floor</InputLabel>
                <Select
                  value={filterFloor}
                  label="Floor"
                  onChange={(e) => setFilterFloor(e.target.value)}
                >
                  {floors.map((floor) => (
                    <MenuItem key={floor} value={floor}>
                      {floor === "all" ? "All Floors" : floor}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={filterType}
                  label="Type"
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  {types.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type === "all" ? "All Types" : type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Card>

        {/* Results Info */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Showing {filteredSpaces.length} of {rentalSpaces.length} rental
            spaces
          </Typography>
        </Box>
      </Box>

      {/* Rental Spaces List */}
      {filteredSpaces.length === 0 ? (
        <Card sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="textSecondary">
            No rental spaces found
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/rental-spaces/new")}
            sx={{ mt: 2 }}
          >
            Add First Rental Space
          </Button>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredSpaces.map((space) => (
            <Grid item xs={12} key={space.id}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                          {space.spaceNumber}
                        </Typography>
                        <Chip
                          label={space.status.toUpperCase()}
                          color={getStatusColor(space.status)}
                          size="small"
                          icon={getStatusIcon(space.status)}
                          sx={{ mr: 1 }}
                        />
                        <Chip
                          label={space.type}
                          variant="outlined"
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        {!space.isOnMap && (
                          <Tooltip title="Not displayed on mall map">
                            <Chip
                              label="Custom Space"
                              variant="outlined"
                              size="small"
                              color="warning"
                            />
                          </Tooltip>
                        )}
                      </Box>

                      <Stack spacing={1}>
                        <Typography variant="body2" color="textSecondary">
                          <strong>Floor:</strong> {space.floor} |{" "}
                          <strong>Area:</strong> {space.area} m² |{" "}
                          <strong>Monthly Rent:</strong> SAR{" "}
                          {space.monthlyRent.toLocaleString()}
                        </Typography>
                        {space.description && (
                          <Typography variant="body2">
                            {space.description}
                          </Typography>
                        )}
                        {space.features && space.features.length > 0 && (
                          <Box
                            sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}
                          >
                            {space.features.map((feature, idx) => (
                              <Chip
                                key={idx}
                                label={feature}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                          </Box>
                        )}
                        {space.tenant && (
                          <Box
                            sx={{
                              mt: 2,
                              p: 2,
                              bgcolor: "success.light",
                              borderRadius: 1,
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ mb: 1, fontWeight: "bold" }}
                            >
                              Current Tenant
                            </Typography>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2">
                                  <strong>Tenant:</strong> {space.tenant.name}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Contact:</strong>{" "}
                                  {space.tenant.contactPerson}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2">
                                  <strong>Phone:</strong> {space.tenant.phone}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Lease:</strong>{" "}
                                  {new Date(
                                    space.tenant.leaseStartDate
                                  ).toLocaleDateString()}{" "}
                                  -{" "}
                                  {new Date(
                                    space.tenant.leaseEndDate
                                  ).toLocaleDateString()}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Stack
                        spacing={1}
                        direction="row"
                        justifyContent="flex-end"
                      >
                        <Tooltip title="View Details">
                          <IconButton
                            color="info"
                            onClick={() =>
                              navigate(`/rental-spaces/${space.id}`)
                            }
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            onClick={() =>
                              navigate(`/rental-spaces/edit/${space.id}`)
                            }
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(space.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>

                      <Box sx={{ mt: 2, textAlign: "right" }}>
                        <Typography variant="caption" color="textSecondary">
                          Updated:{" "}
                          {new Date(space.updatedAt).toLocaleDateString()}
                        </Typography>
                        <br />
                        <Typography variant="caption" color="textSecondary">
                          By: {space.updatedBy}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
