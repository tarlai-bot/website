import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Card,
  CardMedia,
  Alert,
  Divider,
} from "@mui/material";
import {
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";
import { Store, StoreType } from "../../types";

export default function StoreForm() {
  const navigate = useNavigate();
  const { id, type } = useParams<{ id: string; type: string }>();
  const isEdit = id !== "new";

  const [successMessage, setSuccessMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Store>>({
    type: (type as StoreType) || "store",
    name: "",
    category: "",
    floor: "",
    image: "",
    logo: "",
    description: "",
    openingHours: {
      sunday: { open: "10:00", close: "22:00" },
      monday: { open: "10:00", close: "22:00" },
      tuesday: { open: "10:00", close: "22:00" },
      wednesday: { open: "10:00", close: "22:00" },
      thursday: { open: "10:00", close: "22:00" },
      friday: { open: "14:00", close: "23:00" },
      saturday: { open: "10:00", close: "23:00" },
    },
    contact: {
      phone: "",
      email: "",
      website: "",
    },
    isActive: true,
  });

  useEffect(() => {
    if (isEdit) {
      // Mock data for editing
      const mockStore: Store = {
        id: id!,
        type: "store",
        name: "Fashion Boutique",
        category: "Fashion",
        floor: "Ground Floor",
        image: "/images/store1.jpg",
        logo: "/images/logo1.jpg",
        description: "Premium fashion and accessories",
        openingHours: {
          sunday: { open: "10:00", close: "22:00" },
          monday: { open: "10:00", close: "22:00" },
          tuesday: { open: "10:00", close: "22:00" },
          wednesday: { open: "10:00", close: "22:00" },
          thursday: { open: "10:00", close: "22:00" },
          friday: { open: "14:00", close: "23:00" },
          saturday: { open: "10:00", close: "23:00" },
        },
        contact: {
          phone: "+966 50 123 4567",
          email: "contact@fashionboutique.com",
          website: "https://fashionboutique.com",
        },
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        updatedBy: "Admin",
      };
      setFormData(mockStore);
      setImagePreview(mockStore.image);
      setLogoPreview(mockStore.logo || null);
    }
  }, [id, isEdit]);

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

  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "logo"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === "image") {
          setImagePreview(result);
          setFormData({ ...formData, image: result });
        } else {
          setLogoPreview(result);
          setFormData({ ...formData, logo: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // TODO: API call to save store
    console.log("Saving store:", formData);
    setSuccessMessage(
      isEdit ? "Store updated successfully!" : "Store created successfully!"
    );
    setTimeout(() => {
      navigate(-1);
    }, 1500);
  };

  const getTypeTitle = (type: StoreType): string => {
    const titles: Record<StoreType, string> = {
      store: "Store",
      restaurant: "Restaurant",
      entertainment: "Entertainment",
      hypermarket: "Hypermarket",
    };
    return titles[type];
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4">
          {isEdit ? "Edit" : "Add New"}{" "}
          {formData.type ? getTypeTitle(formData.type) : "Store"}
        </Typography>
      </Box>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Images Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Main Image
            </Typography>
            {imagePreview && (
              <Card sx={{ mb: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={imagePreview}
                  alt="Store preview"
                  sx={{ objectFit: "cover" }}
                />
              </Card>
            )}
            <Button
              component="label"
              variant="outlined"
              startIcon={<UploadIcon />}
              fullWidth
            >
              Upload Main Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "image")}
              />
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Logo (Optional)
            </Typography>
            {logoPreview && (
              <Card sx={{ mb: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={logoPreview}
                  alt="Logo preview"
                  sx={{ objectFit: "contain", bgcolor: "grey.100" }}
                />
              </Card>
            )}
            <Button
              component="label"
              variant="outlined"
              startIcon={<UploadIcon />}
              fullWidth
            >
              Upload Logo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "logo")}
              />
            </Button>
          </Grid>

          {/* Basic Info */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                {formData.type &&
                  categories[formData.type].map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth required>
              <InputLabel>Floor</InputLabel>
              <Select
                value={formData.floor}
                label="Floor"
                onChange={(e) =>
                  setFormData({ ...formData, floor: e.target.value })
                }
              >
                {floors.map((floor) => (
                  <MenuItem key={floor} value={floor}>
                    {floor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              multiline
              rows={3}
            />
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Phone"
              value={formData.contact?.phone || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: { ...formData.contact, phone: e.target.value },
                })
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.contact?.email || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: { ...formData.contact, email: e.target.value },
                })
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Website"
              value={formData.contact?.website || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: { ...formData.contact, website: e.target.value },
                })
              }
            />
          </Grid>

          {/* Opening Hours */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Opening Hours
            </Typography>
          </Grid>

          {daysOfWeek.map((day) => (
            <Grid item xs={12} key={day}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography sx={{ minWidth: 100, textTransform: "capitalize" }}>
                  {day}
                </Typography>
                <TextField
                  type="time"
                  label="Open"
                  value={formData.openingHours?.[day]?.open || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      openingHours: {
                        ...formData.openingHours,
                        [day]: {
                          ...formData.openingHours?.[day],
                          open: e.target.value,
                          close: formData.openingHours?.[day]?.close || "",
                        },
                      },
                    })
                  }
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: 150 }}
                />
                <TextField
                  type="time"
                  label="Close"
                  value={formData.openingHours?.[day]?.close || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      openingHours: {
                        ...formData.openingHours,
                        [day]: {
                          ...formData.openingHours?.[day],
                          open: formData.openingHours?.[day]?.open || "",
                          close: e.target.value,
                        },
                      },
                    })
                  }
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: 150 }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={!formData.openingHours?.[day]?.closed}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          openingHours: {
                            ...formData.openingHours,
                            [day]: {
                              ...formData.openingHours?.[day],
                              open: formData.openingHours?.[day]?.open || "",
                              close: formData.openingHours?.[day]?.close || "",
                              closed: !e.target.checked,
                            },
                          },
                        })
                      }
                    />
                  }
                  label="Open"
                />
              </Box>
            </Grid>
          ))}

          {/* Active Status */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                />
              }
              label="Active (visible on website)"
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={
                  !formData.name || !formData.category || !formData.floor
                }
              >
                {isEdit ? "Update" : "Create"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
