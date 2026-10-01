import { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  IconButton,
  Tabs,
  Tab,
  FormControlLabel,
  Switch,
  Alert,
  Snackbar,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowUpward,
  ArrowDownward,
  CloudUpload,
  Place as PlaceIcon,
  Store as StoreIcon,
  Wc as RestroomIcon,
  Stairs as StairsIcon,
  LocalParking as ParkingIcon,
  Info as InfoIcon,
  LocalAtm as AtmIcon,
  Warning as EmergencyIcon,
  Elevator as ElevatorIcon,
} from "@mui/icons-material";
import { FloorMap } from "../types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`floor-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const facilityIcons: Record<string, any> = {
  restroom: RestroomIcon,
  elevator: ElevatorIcon,
  escalator: StairsIcon,
  stairs: StairsIcon,
  parking: ParkingIcon,
  info: InfoIcon,
  atm: AtmIcon,
  emergency: EmergencyIcon,
};

export default function MallMap() {
  const [floors, setFloors] = useState<FloorMap[]>([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [openFloorDialog, setOpenFloorDialog] = useState(false);
  const [openStoreDialog, setOpenStoreDialog] = useState(false);
  const [openFacilityDialog, setOpenFacilityDialog] = useState(false);
  const [editingFloor, setEditingFloor] = useState<FloorMap | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const mapImageRef = useRef<HTMLDivElement>(null);

  const [floorForm, setFloorForm] = useState({
    floorNumber: "",
    floorName: "",
    mapImage: "",
    isActive: true,
  });

  const [storeForm, setStoreForm] = useState({
    storeId: "",
    storeName: "",
  });

  const [facilityForm, setFacilityForm] = useState({
    type: "restroom" as FloorMap["facilities"][0]["type"],
    label: "",
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchFloors = async () => {
      // Mall has 6 floors as shown in About page
      const mockFloors: FloorMap[] = [
        {
          id: "floor-1",
          floorNumber: "GF",
          floorName: "Ground Floor",
          mapImage:
            "https://placehold.co/1200x800/e8e8e8/666?text=Ground+Floor+Map",
          isActive: true,
          order: 1,
          stores: [
            {
              id: "s1",
              storeId: "1",
              storeName: "Zara",
              coordinates: { x: 20, y: 30 },
              width: 8,
              height: 6,
            },
            {
              id: "s2",
              storeId: "2",
              storeName: "H&M",
              coordinates: { x: 35, y: 25 },
              width: 10,
              height: 7,
            },
            {
              id: "s9",
              storeId: "9",
              storeName: "Swatch",
              coordinates: { x: 60, y: 40 },
              width: 6,
              height: 5,
            },
            {
              id: "r2",
              storeId: "r2",
              storeName: "McDonald's",
              coordinates: { x: 45, y: 55 },
              width: 8,
              height: 6,
            },
          ],
          facilities: [
            {
              id: "f1",
              type: "restroom",
              label: "Restrooms",
              coordinates: { x: 15, y: 70 },
            },
            {
              id: "f2",
              type: "elevator",
              label: "Elevators",
              coordinates: { x: 50, y: 75 },
            },
            {
              id: "f3",
              type: "info",
              label: "Information Desk",
              coordinates: { x: 80, y: 20 },
            },
          ],
          updatedAt: new Date().toISOString(),
          updatedBy: "Admin User",
        },
        {
          id: "floor-2",
          floorNumber: "1F",
          floorName: "First Floor",
          mapImage:
            "https://placehold.co/1200x800/d8d8d8/555?text=First+Floor+Map",
          isActive: true,
          order: 2,
          stores: [
            {
              id: "s3",
              storeId: "3",
              storeName: "Apple Store",
              coordinates: { x: 30, y: 35 },
              width: 12,
              height: 8,
            },
            {
              id: "s4",
              storeId: "4",
              storeName: "Sephora",
              coordinates: { x: 55, y: 30 },
              width: 10,
              height: 7,
            },
            {
              id: "s8",
              storeId: "8",
              storeName: "Jarir Bookstore",
              coordinates: { x: 25, y: 60 },
              width: 9,
              height: 6,
            },
            {
              id: "r3",
              storeId: "r3",
              storeName: "Starbucks",
              coordinates: { x: 70, y: 50 },
              width: 7,
              height: 5,
            },
          ],
          facilities: [
            {
              id: "f4",
              type: "restroom",
              label: "Restrooms",
              coordinates: { x: 18, y: 72 },
            },
            {
              id: "f5",
              type: "elevator",
              label: "Elevators",
              coordinates: { x: 52, y: 77 },
            },
          ],
          updatedAt: new Date().toISOString(),
          updatedBy: "Admin User",
        },
        {
          id: "floor-3",
          floorNumber: "2F",
          floorName: "Second Floor - Food Court",
          mapImage:
            "https://placehold.co/1200x800/c8c8c8/444?text=Second+Floor+Map",
          isActive: true,
          order: 3,
          stores: [
            {
              id: "s5",
              storeId: "5",
              storeName: "Nike",
              coordinates: { x: 25, y: 25 },
              width: 10,
              height: 7,
            },
            {
              id: "s6",
              storeId: "6",
              storeName: "Home Centre",
              coordinates: { x: 50, y: 30 },
              width: 12,
              height: 8,
            },
            {
              id: "r1",
              storeId: "r1",
              storeName: "Pizza Hut",
              coordinates: { x: 20, y: 60 },
              width: 8,
              height: 6,
            },
            {
              id: "r4",
              storeId: "r4",
              storeName: "Subway",
              coordinates: { x: 40, y: 65 },
              width: 7,
              height: 5,
            },
            {
              id: "r5",
              storeId: "r5",
              storeName: "KFC",
              coordinates: { x: 60, y: 62 },
              width: 8,
              height: 6,
            },
            {
              id: "e4",
              storeId: "e4",
              storeName: "Kids Play Area",
              coordinates: { x: 75, y: 30 },
              width: 10,
              height: 8,
            },
          ],
          facilities: [
            {
              id: "f6",
              type: "restroom",
              label: "Restrooms",
              coordinates: { x: 15, y: 80 },
            },
            {
              id: "f7",
              type: "elevator",
              label: "Elevators",
              coordinates: { x: 85, y: 75 },
            },
          ],
          updatedAt: new Date().toISOString(),
          updatedBy: "Admin User",
        },
        {
          id: "floor-4",
          floorNumber: "3F",
          floorName: "Third Floor - Entertainment",
          mapImage:
            "https://placehold.co/1200x800/b8b8b8/333?text=Third+Floor+Map",
          isActive: true,
          order: 4,
          stores: [
            {
              id: "s7",
              storeId: "7",
              storeName: "Toys R Us",
              coordinates: { x: 30, y: 25 },
              width: 12,
              height: 9,
            },
            {
              id: "e1",
              storeId: "e1",
              storeName: "Cinema Complex",
              coordinates: { x: 20, y: 50 },
              width: 15,
              height: 12,
            },
            {
              id: "e2",
              storeId: "e2",
              storeName: "Family Fun Zone",
              coordinates: { x: 50, y: 45 },
              width: 12,
              height: 10,
            },
            {
              id: "e3",
              storeId: "e3",
              storeName: "Bowling Alley",
              coordinates: { x: 70, y: 50 },
              width: 14,
              height: 11,
            },
            {
              id: "e5",
              storeId: "e5",
              storeName: "Gaming Lounge",
              coordinates: { x: 60, y: 25 },
              width: 10,
              height: 8,
            },
          ],
          facilities: [
            {
              id: "f8",
              type: "restroom",
              label: "Restrooms",
              coordinates: { x: 12, y: 75 },
            },
            {
              id: "f9",
              type: "elevator",
              label: "Elevators",
              coordinates: { x: 88, y: 72 },
            },
          ],
          updatedAt: new Date().toISOString(),
          updatedBy: "Admin User",
        },
        {
          id: "floor-5",
          floorNumber: "4F",
          floorName: "Fourth Floor",
          mapImage:
            "https://placehold.co/1200x800/a8a8a8/222?text=Fourth+Floor+Map",
          isActive: true,
          order: 5,
          stores: [],
          facilities: [
            {
              id: "f10",
              type: "restroom",
              label: "Restrooms",
              coordinates: { x: 20, y: 70 },
            },
            {
              id: "f11",
              type: "elevator",
              label: "Elevators",
              coordinates: { x: 50, y: 75 },
            },
          ],
          updatedAt: new Date().toISOString(),
          updatedBy: "Admin User",
        },
        {
          id: "floor-6",
          floorNumber: "5F",
          floorName: "Fifth Floor",
          mapImage:
            "https://placehold.co/1200x800/989898/111?text=Fifth+Floor+Map",
          isActive: true,
          order: 6,
          stores: [],
          facilities: [
            {
              id: "f12",
              type: "restroom",
              label: "Restrooms",
              coordinates: { x: 25, y: 68 },
            },
            {
              id: "f13",
              type: "elevator",
              label: "Elevators",
              coordinates: { x: 55, y: 73 },
            },
          ],
          updatedAt: new Date().toISOString(),
          updatedBy: "Admin User",
        },
      ];
      setFloors(mockFloors);
    };

    fetchFloors();
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleOpenFloorDialog = (floor?: FloorMap) => {
    if (floor) {
      setEditingFloor(floor);
      setFloorForm({
        floorNumber: floor.floorNumber,
        floorName: floor.floorName,
        mapImage: floor.mapImage,
        isActive: floor.isActive,
      });
      setImagePreview(floor.mapImage);
    } else {
      setEditingFloor(null);
      setFloorForm({
        floorNumber: "",
        floorName: "",
        mapImage: "",
        isActive: true,
      });
      setImagePreview("");
    }
    setOpenFloorDialog(true);
  };

  const handleCloseFloorDialog = () => {
    setOpenFloorDialog(false);
    setEditingFloor(null);
    setFloorForm({
      floorNumber: "",
      floorName: "",
      mapImage: "",
      isActive: true,
    });
    setImagePreview("");
  };

  const handleSaveFloor = () => {
    // TODO: Replace with actual API call
    if (editingFloor) {
      setFloors(
        floors.map((f) =>
          f.id === editingFloor.id
            ? {
                ...f,
                ...floorForm,
                updatedAt: new Date().toISOString(),
              }
            : f
        )
      );
      setSnackbar({ open: true, message: "Floor updated successfully" });
    } else {
      const newFloor: FloorMap = {
        id: `floor-${Date.now()}`,
        ...floorForm,
        order: floors.length + 1,
        stores: [],
        facilities: [],
        updatedAt: new Date().toISOString(),
        updatedBy: "Admin User",
      };
      setFloors([...floors, newFloor]);
      setSnackbar({ open: true, message: "Floor added successfully" });
    }
    handleCloseFloorDialog();
  };

  const handleDeleteFloor = (floorId: string) => {
    if (window.confirm("Are you sure you want to delete this floor map?")) {
      setFloors(floors.filter((f) => f.id !== floorId));
      setSnackbar({ open: true, message: "Floor deleted successfully" });
      if (selectedTab >= floors.length - 1) {
        setSelectedTab(Math.max(0, floors.length - 2));
      }
    }
  };

  const handleReorderFloor = (floorId: string, direction: "up" | "down") => {
    const index = floors.findIndex((f) => f.id === floorId);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === floors.length - 1)
    ) {
      return;
    }

    const newFloors = [...floors];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newFloors[index], newFloors[swapIndex]] = [
      newFloors[swapIndex],
      newFloors[index],
    ];

    // Update order numbers
    newFloors.forEach((floor, idx) => {
      floor.order = idx + 1;
    });

    setFloors(newFloors);
    setSnackbar({ open: true, message: "Floor order updated" });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFloorForm({ ...floorForm, mapImage: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setClickPosition({ x, y });
  };

  const handleAddStore = () => {
    if (!clickPosition) {
      alert("Please click on the map to place the store");
      return;
    }
    setStoreForm({ storeId: "", storeName: "" });
    setOpenStoreDialog(true);
  };

  const handleAddFacility = () => {
    if (!clickPosition) {
      alert("Please click on the map to place the facility");
      return;
    }
    setFacilityForm({ type: "restroom", label: "" });
    setOpenFacilityDialog(true);
  };

  const handleSaveStore = () => {
    if (!clickPosition) return;

    const currentFloor = floors[selectedTab];
    const newStore = {
      id: `s${Date.now()}`,
      storeId: storeForm.storeId,
      storeName: storeForm.storeName,
      coordinates: clickPosition,
      width: 8,
      height: 6,
    };

    setFloors(
      floors.map((f) =>
        f.id === currentFloor.id ? { ...f, stores: [...f.stores, newStore] } : f
      )
    );

    setOpenStoreDialog(false);
    setClickPosition(null);
    setSnackbar({ open: true, message: "Store added to map" });
  };

  const handleSaveFacility = () => {
    if (!clickPosition) return;

    const currentFloor = floors[selectedTab];
    const newFacility = {
      id: `f${Date.now()}`,
      type: facilityForm.type,
      label: facilityForm.label,
      coordinates: clickPosition,
    };

    setFloors(
      floors.map((f) =>
        f.id === currentFloor.id
          ? { ...f, facilities: [...f.facilities, newFacility] }
          : f
      )
    );

    setOpenFacilityDialog(false);
    setClickPosition(null);
    setSnackbar({ open: true, message: "Facility added to map" });
  };

  const handleDeleteStore = (floorId: string, storeId: string) => {
    setFloors(
      floors.map((f) =>
        f.id === floorId
          ? { ...f, stores: f.stores.filter((s) => s.id !== storeId) }
          : f
      )
    );
    setSnackbar({ open: true, message: "Store removed from map" });
  };

  const handleDeleteFacility = (floorId: string, facilityId: string) => {
    setFloors(
      floors.map((f) =>
        f.id === floorId
          ? {
              ...f,
              facilities: f.facilities.filter((fac) => fac.id !== facilityId),
            }
          : f
      )
    );
    setSnackbar({ open: true, message: "Facility removed from map" });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Mall Map Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenFloorDialog()}
        >
          Add Floor
        </Button>
      </Box>

      {floors.length === 0 ? (
        <Alert severity="info">
          No floor maps yet. Click "Add Floor" to create your first floor map.
        </Alert>
      ) : (
        <>
          <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 2 }}>
            {floors.map((floor) => (
              <Tab
                key={floor.id}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {floor.floorName}
                    {!floor.isActive && (
                      <Chip label="Inactive" size="small" color="warning" />
                    )}
                  </Box>
                }
              />
            ))}
          </Tabs>

          {floors.map((floor, index) => (
            <TabPanel key={floor.id} value={selectedTab} index={index}>
              <Grid container spacing={3}>
                {/* Floor Controls */}
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="h6">
                            {floor.floorName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Floor {floor.floorNumber} • {floor.stores.length}{" "}
                            stores • {floor.facilities.length} facilities
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Tooltip title="Move Up">
                            <span>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleReorderFloor(floor.id, "up")
                                }
                                disabled={index === 0}
                              >
                                <ArrowUpward />
                              </IconButton>
                            </span>
                          </Tooltip>
                          <Tooltip title="Move Down">
                            <span>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleReorderFloor(floor.id, "down")
                                }
                                disabled={index === floors.length - 1}
                              >
                                <ArrowDownward />
                              </IconButton>
                            </span>
                          </Tooltip>
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenFloorDialog(floor)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteFloor(floor.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Interactive Map */}
                <Grid item xs={12} md={8}>
                  <Card>
                    <CardContent>
                      <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<StoreIcon />}
                          onClick={handleAddStore}
                          disabled={!clickPosition}
                        >
                          Add Store at Position
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<PlaceIcon />}
                          onClick={handleAddFacility}
                          disabled={!clickPosition}
                        >
                          Add Facility at Position
                        </Button>
                        {clickPosition && (
                          <Chip
                            label={`Selected: ${clickPosition.x.toFixed(
                              1
                            )}%, ${clickPosition.y.toFixed(1)}%`}
                            onDelete={() => setClickPosition(null)}
                            color="primary"
                            size="small"
                          />
                        )}
                      </Box>

                      <Paper
                        ref={mapImageRef}
                        onClick={handleMapClick}
                        sx={{
                          position: "relative",
                          width: "100%",
                          paddingTop: "66.67%", // 3:2 aspect ratio
                          backgroundImage: `url(${floor.mapImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          cursor: "crosshair",
                          border: "2px solid",
                          borderColor: "divider",
                        }}
                      >
                        {/* Store markers */}
                        {floor.stores.map((store) => (
                          <Tooltip key={store.id} title={store.storeName}>
                            <Box
                              sx={{
                                position: "absolute",
                                left: `${store.coordinates.x}%`,
                                top: `${store.coordinates.y}%`,
                                width: `${store.width || 8}%`,
                                height: `${store.height || 6}%`,
                                backgroundColor: "primary.main",
                                opacity: 0.7,
                                border: "2px solid white",
                                borderRadius: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontSize: "0.7rem",
                                fontWeight: "bold",
                                textAlign: "center",
                                padding: "2px",
                                cursor: "pointer",
                                transform: "translate(-50%, -50%)",
                                "&:hover": {
                                  opacity: 0.9,
                                  zIndex: 10,
                                },
                              }}
                            >
                              <StoreIcon sx={{ fontSize: 16 }} />
                            </Box>
                          </Tooltip>
                        ))}

                        {/* Facility markers */}
                        {floor.facilities.map((facility) => {
                          const FacilityIcon = facilityIcons[facility.type];
                          return (
                            <Tooltip key={facility.id} title={facility.label}>
                              <Box
                                sx={{
                                  position: "absolute",
                                  left: `${facility.coordinates.x}%`,
                                  top: `${facility.coordinates.y}%`,
                                  transform: "translate(-50%, -50%)",
                                  backgroundColor: "secondary.main",
                                  borderRadius: "50%",
                                  width: 40,
                                  height: 40,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "white",
                                  border: "2px solid white",
                                  cursor: "pointer",
                                  "&:hover": {
                                    opacity: 0.8,
                                    zIndex: 10,
                                  },
                                }}
                              >
                                <FacilityIcon sx={{ fontSize: 20 }} />
                              </Box>
                            </Tooltip>
                          );
                        })}

                        {/* Click position indicator */}
                        {clickPosition && (
                          <Box
                            sx={{
                              position: "absolute",
                              left: `${clickPosition.x}%`,
                              top: `${clickPosition.y}%`,
                              transform: "translate(-50%, -50%)",
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              backgroundColor: "warning.main",
                              border: "3px solid white",
                              animation: "pulse 1s infinite",
                              "@keyframes pulse": {
                                "0%": { opacity: 1 },
                                "50%": { opacity: 0.5 },
                                "100%": { opacity: 1 },
                              },
                            }}
                          />
                        )}
                      </Paper>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 1, display: "block" }}
                      >
                        Click on the map to select a position, then use the
                        buttons above to add stores or facilities
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Stores & Facilities List */}
                <Grid item xs={12} md={4}>
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Stores ({floor.stores.length})
                      </Typography>
                      <List dense>
                        {floor.stores.length === 0 ? (
                          <Typography variant="body2" color="text.secondary">
                            No stores placed yet
                          </Typography>
                        ) : (
                          floor.stores.map((store) => (
                            <ListItem key={store.id}>
                              <ListItemText
                                primary={store.storeName}
                                secondary={`Position: ${store.coordinates.x.toFixed(
                                  0
                                )}%, ${store.coordinates.y.toFixed(0)}%`}
                              />
                              <ListItemSecondaryAction>
                                <IconButton
                                  edge="end"
                                  size="small"
                                  onClick={() =>
                                    handleDeleteStore(floor.id, store.id)
                                  }
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))
                        )}
                      </List>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Facilities ({floor.facilities.length})
                      </Typography>
                      <List dense>
                        {floor.facilities.length === 0 ? (
                          <Typography variant="body2" color="text.secondary">
                            No facilities placed yet
                          </Typography>
                        ) : (
                          floor.facilities.map((facility) => {
                            const FacilityIcon = facilityIcons[facility.type];
                            return (
                              <ListItem key={facility.id}>
                                <ListItemIcon>
                                  <FacilityIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary={facility.label}
                                  secondary={facility.type}
                                />
                                <ListItemSecondaryAction>
                                  <IconButton
                                    edge="end"
                                    size="small"
                                    onClick={() =>
                                      handleDeleteFacility(
                                        floor.id,
                                        facility.id
                                      )
                                    }
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                            );
                          })
                        )}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          ))}
        </>
      )}

      {/* Add/Edit Floor Dialog */}
      <Dialog
        open={openFloorDialog}
        onClose={handleCloseFloorDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingFloor ? "Edit Floor" : "Add New Floor"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Floor Number"
                value={floorForm.floorNumber}
                onChange={(e) =>
                  setFloorForm({ ...floorForm, floorNumber: e.target.value })
                }
                placeholder="e.g., GF, 1F, 2F"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={floorForm.isActive}
                    onChange={(e) =>
                      setFloorForm({ ...floorForm, isActive: e.target.checked })
                    }
                  />
                }
                label="Active"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Floor Name"
                value={floorForm.floorName}
                onChange={(e) =>
                  setFloorForm({ ...floorForm, floorName: e.target.value })
                }
                placeholder="e.g., Ground Floor, First Floor"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUpload />}
                fullWidth
              >
                Upload Map Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
              {imagePreview && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxHeight: 300,
                      objectFit: "contain",
                    }}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFloorDialog}>Cancel</Button>
          <Button
            onClick={handleSaveFloor}
            variant="contained"
            disabled={
              !floorForm.floorNumber ||
              !floorForm.floorName ||
              !floorForm.mapImage
            }
          >
            {editingFloor ? "Update" : "Add"} Floor
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Store Dialog */}
      <Dialog
        open={openStoreDialog}
        onClose={() => setOpenStoreDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Store to Map</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Store ID"
                value={storeForm.storeId}
                onChange={(e) =>
                  setStoreForm({ ...storeForm, storeId: e.target.value })
                }
                placeholder="Reference to existing store"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Store Name"
                value={storeForm.storeName}
                onChange={(e) =>
                  setStoreForm({ ...storeForm, storeName: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStoreDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSaveStore}
            variant="contained"
            disabled={!storeForm.storeName}
          >
            Add Store
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Facility Dialog */}
      <Dialog
        open={openFacilityDialog}
        onClose={() => setOpenFacilityDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Facility to Map</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Facility Type</InputLabel>
                <Select
                  value={facilityForm.type}
                  onChange={(e) =>
                    setFacilityForm({
                      ...facilityForm,
                      type: e.target.value as FloorMap["facilities"][0]["type"],
                    })
                  }
                  label="Facility Type"
                >
                  <MenuItem value="restroom">Restroom</MenuItem>
                  <MenuItem value="elevator">Elevator</MenuItem>
                  <MenuItem value="escalator">Escalator</MenuItem>
                  <MenuItem value="stairs">Stairs</MenuItem>
                  <MenuItem value="parking">Parking</MenuItem>
                  <MenuItem value="info">Information</MenuItem>
                  <MenuItem value="atm">ATM</MenuItem>
                  <MenuItem value="emergency">Emergency Exit</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Label"
                value={facilityForm.label}
                onChange={(e) =>
                  setFacilityForm({ ...facilityForm, label: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFacilityDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSaveFacility}
            variant="contained"
            disabled={!facilityForm.label}
          >
            Add Facility
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
}
