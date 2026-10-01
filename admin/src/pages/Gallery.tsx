import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
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
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControlLabel,
} from "@mui/material";
import {
  Upload as UploadIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Home as HomeIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { GalleryImage } from "../types";
import { galleryData } from "../data/gallery";

export default function Gallery() {
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadPreviews, setUploadPreviews] = useState<
    Array<{
      file: File;
      preview: string;
      category: string;
      displayOnHomePage: boolean;
    }>
  >([]);

  // Use mall website gallery data
  const [images, setImages] = useState<GalleryImage[]>(galleryData);

  const categories: Array<GalleryImage["category"]> = [
    "parking",
    "hypermarket",
    "fountain",
    "shops",
    "smarvy",
    "restaurants",
    "events",
    "mall",
    "stores",
    "dining",
    "entertainment",
  ];

  /*const oldImages = [
    {
      id: "1",
      src: "/images/gallery1.jpg",
      alt: "Mall interior",
      title: "Spacious Shopping Area",
      category: "mall",
      displayOnHomePage: true,
      uploadedAt: "2025-01-15T10:00:00Z",
      uploadedBy: "Admin",
      fileSize: 1024000,
      dimensions: { width: 1920, height: 1080 },
    },
    {
      id: "2",
      src: "/images/gallery2.jpg",
      alt: "Food court",
      title: "Modern Food Court",
      category: "dining",
      displayOnHomePage: true,
      uploadedAt: "2025-02-10T14:30:00Z",
      uploadedBy: "Admin",
      fileSize: 1536000,
      dimensions: { width: 1920, height: 1080 },
    },
    {
      id: "3",
      src: "/images/gallery3.jpg",
      alt: "Store front",
      title: "Premium Retail Stores",
      category: "stores",
      displayOnHomePage: false,
      uploadedAt: "2025-03-05T09:15:00Z",
      uploadedBy: "Admin",
      fileSize: 2048000,
      dimensions: { width: 1920, height: 1080 },
    },
    {
      id: "4",
      src: "/images/gallery4.jpg",
      alt: "Event",
      title: "Summer Festival 2024",
      category: "events",
      displayOnHomePage: true,
      uploadedAt: "2025-04-20T16:45:00Z",
      uploadedBy: "Admin",
      fileSize: 1792000,
      dimensions: { width: 1920, height: 1080 },
    },
    {
      id: "5",
      src: "/images/gallery5.jpg",
      alt: "Entertainment zone",
      title: "Family Entertainment Center",
      category: "entertainment",
      displayOnHomePage: false,
      uploadedAt: "2025-05-12T11:20:00Z",
      uploadedBy: "Admin",
      fileSize: 1664000,
      dimensions: { width: 1920, height: 1080 },
    },
    {
      id: "6",
      src: "/images/gallery6.jpg",
      alt: "Mall exterior",
      title: "Grand Entrance",
      category: "mall",
      displayOnHomePage: true,
      uploadedAt: "2025-06-08T08:00:00Z",
      uploadedBy: "Admin",
      fileSize: 2304000,
      dimensions: { width: 1920, height: 1080 },
    },
  ];*/

  // const oldCategories: Array<GalleryImage["category"]> = [
  //   "events",
  //   "mall",
  //   "stores",
  //   "dining",
  //   "entertainment",
  // ];

  const filteredImages = images
    .filter(
      (img) =>
        img.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.alt.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (img) => filterCategory === "all" || img.category === filterCategory
    );

  const handleToggleSelect = (id: string) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedImages(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedImages.size === filteredImages.length) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(filteredImages.map((img) => img.id)));
    }
  };

  const handleToggleHomePage = (id: string) => {
    setImages(
      images.map((img) =>
        img.id === id
          ? { ...img, displayOnHomePage: !img.displayOnHomePage }
          : img
      )
    );
    setSuccessMessage("Gallery display updated!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleDelete = (id: string, title?: string) => {
    if (
      confirm(`Are you sure you want to delete "${title || "this image"}"?`)
    ) {
      setImages(images.filter((img) => img.id !== id));
      setSelectedImages((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      setSuccessMessage("Image deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleBulkDelete = () => {
    if (
      confirm(
        `Are you sure you want to delete ${selectedImages.size} selected image(s)?`
      )
    ) {
      setImages(images.filter((img) => !selectedImages.has(img.id)));
      setSelectedImages(new Set());
      setSuccessMessage(
        `${selectedImages.size} image(s) deleted successfully!`
      );
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleBulkToggleHomePage = (display: boolean) => {
    setImages(
      images.map((img) =>
        selectedImages.has(img.id)
          ? { ...img, displayOnHomePage: display }
          : img
      )
    );
    setSuccessMessage(
      `${selectedImages.size} image(s) ${
        display ? "added to" : "removed from"
      } home page!`
    );
    setTimeout(() => setSuccessMessage(""), 3000);
    setSelectedImages(new Set());
  };

  const handleFilesSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPreviews = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        category: "mall" as GalleryImage["category"],
        displayOnHomePage: false,
      }));
      setUploadPreviews(newPreviews);
      setUploadDialogOpen(true);
    }
  };

  const handleUpload = () => {
    // TODO: API call to upload images
    const newImages: GalleryImage[] = uploadPreviews.map((preview, index) => ({
      id: Date.now().toString() + index,
      src: preview.preview,
      alt: preview.file.name,
      title: preview.file.name,
      category: preview.category as GalleryImage["category"],
      displayOnHomePage: preview.displayOnHomePage,
      uploadedAt: new Date().toISOString(),
      uploadedBy: "Admin",
      fileSize: preview.file.size,
      dimensions: { width: 1920, height: 1080 },
    }));

    setImages([...newImages, ...images]);
    setSuccessMessage(
      `${uploadPreviews.length} image(s) uploaded successfully!`
    );
    setTimeout(() => setSuccessMessage(""), 3000);
    handleCloseUploadDialog();
  };

  const handleCloseUploadDialog = () => {
    setUploadDialogOpen(false);
    setUploadPreviews([]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
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
        <Typography variant="h4">Gallery Management</Typography>
        <Button
          component="label"
          variant="contained"
          startIcon={<UploadIcon />}
        >
          Upload Images
          <input
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={handleFilesSelect}
          />
        </Button>
      </Box>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {/* Filters and Bulk Actions */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ mb: 2 }}
        >
          <TextField
            fullWidth
            placeholder="Search by title or description..."
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
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={filterCategory}
              label="Category"
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {selectedImages.size > 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
              bgcolor: "primary.light",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" sx={{ color: "primary.contrastText" }}>
              {selectedImages.size} selected
            </Typography>
            <Button
              size="small"
              variant="contained"
              onClick={() => handleBulkToggleHomePage(true)}
            >
              Add to Home
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => handleBulkToggleHomePage(false)}
            >
              Remove from Home
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={handleBulkDelete}
            >
              Delete Selected
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setSelectedImages(new Set())}
              sx={{
                color: "primary.contrastText",
                borderColor: "primary.contrastText",
              }}
            >
              Clear Selection
            </Button>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button size="small" onClick={handleSelectAll}>
            {selectedImages.size === filteredImages.length
              ? "Deselect All"
              : "Select All"}
          </Button>
          <Typography variant="body2" color="text.secondary">
            {filteredImages.length} image(s) •{" "}
            {images.filter((img) => img.displayOnHomePage).length} on home page
          </Typography>
        </Box>
      </Card>

      {/* Image Grid */}
      <Grid container spacing={2}>
        {filteredImages.map((image) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
            <Card
              sx={{
                position: "relative",
                border: selectedImages.has(image.id)
                  ? "2px solid"
                  : "2px solid transparent",
                borderColor: "primary.main",
              }}
            >
              <Checkbox
                checked={selectedImages.has(image.id)}
                onChange={() => handleToggleSelect(image.id)}
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  bgcolor: "background.paper",
                  borderRadius: 1,
                  zIndex: 1,
                }}
              />
              {image.displayOnHomePage && (
                <Chip
                  icon={<HomeIcon fontSize="small" />}
                  label="Home"
                  size="small"
                  color="primary"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                  }}
                />
              )}
              <CardMedia
                component="img"
                height="200"
                image={image.src || "/placeholder.jpg"}
                alt={image.alt}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="subtitle2" gutterBottom noWrap>
                  {image.title || image.alt}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip
                    label={image.category}
                    size="small"
                    variant="outlined"
                  />
                </Stack>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  {image.dimensions.width} × {image.dimensions.height}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  {formatFileSize(image.fileSize)}
                </Typography>
              </CardContent>
              <CardActions>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={image.displayOnHomePage}
                      onChange={() => handleToggleHomePage(image.id)}
                      size="small"
                    />
                  }
                  label="Home"
                  sx={{ fontSize: "0.875rem" }}
                />
                <Box sx={{ flexGrow: 1 }} />
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDelete(image.id, image.title)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredImages.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No images found
          </Typography>
          <Button
            component="label"
            variant="contained"
            startIcon={<UploadIcon />}
            sx={{ mt: 2 }}
          >
            Upload First Images
            <input
              type="file"
              hidden
              accept="image/*"
              multiple
              onChange={handleFilesSelect}
            />
          </Button>
        </Box>
      )}

      {/* Upload Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={handleCloseUploadDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Upload Images
          <IconButton
            onClick={handleCloseUploadDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Configure settings for {uploadPreviews.length} image(s)
          </Typography>
          <Grid container spacing={2}>
            {uploadPreviews.map((preview, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ display: "flex" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 150, objectFit: "cover" }}
                    image={preview.preview}
                    alt={preview.file.name}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      p: 2,
                    }}
                  >
                    <Typography variant="subtitle2" gutterBottom>
                      {preview.file.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      gutterBottom
                    >
                      {formatFileSize(preview.file.size)}
                    </Typography>
                    <FormControl size="small" sx={{ mt: 1, mb: 1 }}>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={preview.category}
                        label="Category"
                        onChange={(e) => {
                          const newPreviews = [...uploadPreviews];
                          newPreviews[index].category = e.target
                            .value as GalleryImage["category"];
                          setUploadPreviews(newPreviews);
                        }}
                      >
                        {categories.map((cat) => (
                          <MenuItem key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={preview.displayOnHomePage}
                          onChange={(e) => {
                            const newPreviews = [...uploadPreviews];
                            newPreviews[index].displayOnHomePage =
                              e.target.checked;
                            setUploadPreviews(newPreviews);
                          }}
                        />
                      }
                      label="Display on Home Page"
                    />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUploadDialog}>Cancel</Button>
          <Button onClick={handleUpload} variant="contained">
            Upload {uploadPreviews.length} Image(s)
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
