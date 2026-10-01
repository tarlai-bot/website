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
  IconButton,
  Stack,
  Chip,
} from "@mui/material";
import {
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Upload as UploadIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { Event } from "../../types";

export default function EventForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = id !== "new";

  const [successMessage, setSuccessMessage] = useState("");
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState<Partial<Event>>({
    title: "",
    description: "",
    longDescription: "",
    startDate: "",
    endDate: "",
    location: "",
    images: [],
    bannerImage: "",
    category: "",
    isFeatured: false,
    isActive: true,
  });

  const categories = [
    "Family",
    "Food",
    "Fashion",
    "Technology",
    "Entertainment",
    "Shopping",
    "Culture",
  ];

  useEffect(() => {
    if (isEdit) {
      // Mock data for editing
      const mockEvent: Event = {
        id: id!,
        title: "Kids Summer Camp 2025",
        description: "Fun activities for children aged 5-12",
        longDescription:
          "Join us for an exciting summer camp with various activities including arts, sports, and educational games. Our experienced staff will ensure a safe and fun environment for all participants.",
        startDate: "2025-06-01",
        endDate: "2025-06-30",
        location: "Mall Atrium",
        images: ["/images/event1.jpg", "/images/event1-2.jpg"],
        bannerImage: "/images/event1-banner.jpg",
        category: "Family",
        isFeatured: true,
        isActive: true,
        createdAt: "2025-01-15T10:00:00Z",
        updatedAt: "2025-01-20T14:30:00Z",
        updatedBy: "Admin",
      };
      setFormData(mockEvent);
      setBannerPreview(mockEvent.bannerImage || null);
      setImagePreviews(mockEvent.images);
    }
  }, [id, isEdit]);

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setBannerPreview(result);
        setFormData({ ...formData, bannerImage: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPreviews: string[] = [];
      const newImages = [...(formData.images || [])];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          newPreviews.push(result);
          newImages.push(result);

          if (newPreviews.length === files.length) {
            setImagePreviews([...imagePreviews, ...newPreviews]);
            setFormData({ ...formData, images: newImages });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = formData.images?.filter((_, i) => i !== index) || [];
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
    setImagePreviews(newPreviews);
  };

  const handleSave = () => {
    // TODO: API call to save event
    console.log("Saving event:", formData);
    setSuccessMessage(
      isEdit ? "Event updated successfully!" : "Event created successfully!"
    );
    setTimeout(() => {
      navigate("/events");
    }, 1500);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/events")}
          sx={{ mb: 2 }}
        >
          Back to Events
        </Button>
        <Typography variant="h4">
          {isEdit ? "Edit Event" : "Add New Event"}
        </Typography>
      </Box>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Banner Image */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Banner Image
            </Typography>
            {bannerPreview && (
              <Card sx={{ mb: 2 }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={bannerPreview}
                  alt="Banner preview"
                  sx={{ objectFit: "cover" }}
                />
              </Card>
            )}
            <Button
              component="label"
              variant="outlined"
              startIcon={<UploadIcon />}
            >
              Upload Banner Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleBannerUpload}
              />
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
              Recommended: 1200x400px
            </Typography>
          </Grid>

          {/* Basic Info */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Event Information
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Event Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Short Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              multiline
              rows={2}
              helperText="Brief description for event cards"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Long Description"
              value={formData.longDescription}
              onChange={(e) =>
                setFormData({ ...formData, longDescription: e.target.value })
              }
              multiline
              rows={4}
              helperText="Detailed description for event page"
            />
          </Grid>

          {/* Date and Location */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Date & Location
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="End Date"
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
              placeholder="e.g., Mall Atrium, Food Court"
            />
          </Grid>

          {/* Gallery Images */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Event Gallery
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<AddIcon />}
            >
              Add Images
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                onChange={handleImagesUpload}
              />
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
              You can select multiple images
            </Typography>
          </Grid>

          {imagePreviews.length > 0 && (
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {imagePreviews.map((preview, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <Card sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="150"
                        image={preview}
                        alt={`Image ${index + 1}`}
                        sx={{ objectFit: "cover" }}
                      />
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRemoveImage(index)}
                        sx={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          bgcolor: "background.paper",
                          "&:hover": { bgcolor: "error.light", color: "white" },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      {index === 0 && (
                        <Chip
                          label="Main"
                          size="small"
                          color="primary"
                          sx={{
                            position: "absolute",
                            bottom: 8,
                            left: 8,
                          }}
                        />
                      )}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}

          {/* Settings */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Settings
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                  />
                }
                label="Featured Event (display on home page)"
              />
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
            </Stack>
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={() => navigate("/events")}>
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={
                  !formData.title ||
                  !formData.description ||
                  !formData.startDate ||
                  !formData.endDate ||
                  !formData.location ||
                  !formData.category
                }
              >
                {isEdit ? "Update Event" : "Create Event"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
