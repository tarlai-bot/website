import { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  Grid,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Switch,
  FormControlLabel,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Upload as UploadIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Add as AddIcon,
  Edit as EditIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
} from "@mui/icons-material";
import type { HeroSection, BannerSection, Event, GalleryImage } from "../types";

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
      id={`home-tabpanel-${index}`}
      aria-labelledby={`home-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function HomePage() {
  const [tabValue, setTabValue] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  // Mock hero data
  const [hero, setHero] = useState<HeroSection>({
    id: "1",
    title: "Welcome to Alamer Mall",
    subtitle: "Your Premier Shopping Destination",
    backgroundImage: "/images/hero-bg.jpg",
    primaryCTA: {
      text: "Explore Stores",
      link: "/stores",
    },
    secondaryCTA: {
      text: "View Events",
      link: "/events",
    },
    isActive: true,
    updatedAt: new Date().toISOString(),
    updatedBy: "Admin",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    hero.backgroundImage
  );

  // Banner sections state
  const [banners, setBanners] = useState<BannerSection[]>([
    {
      id: "1",
      title: "Summer Sale 2025",
      description: "Up to 70% off on selected items",
      image: "/images/banner1.jpg",
      link: "/stores",
      buttonText: "Shop Now",
      order: 1,
      isActive: true,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "New Restaurant Opening",
      description: "Experience authentic Mediterranean cuisine",
      image: "/images/banner2.jpg",
      link: "/dining",
      buttonText: "View Menu",
      order: 2,
      isActive: true,
      updatedAt: new Date().toISOString(),
    },
  ]);

  const [bannerDialogOpen, setBannerDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerSection | null>(
    null
  );
  const [bannerFormData, setBannerFormData] = useState<Partial<BannerSection>>(
    {}
  );
  const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(
    null
  );

  // Mock events data
  const [allEvents, setAllEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Kids Summer Camp 2025",
      description: "Fun activities for children aged 5-12",
      startDate: "2025-06-01",
      endDate: "2025-06-30",
      location: "Mall Atrium",
      images: ["/images/event1.jpg"],
      category: "Family",
      isFeatured: true,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: "Admin",
    },
    {
      id: "2",
      title: "Food Festival",
      description: "Taste dishes from around the world",
      startDate: "2025-07-15",
      endDate: "2025-07-17",
      location: "Food Court",
      images: ["/images/event2.jpg"],
      category: "Food",
      isFeatured: false,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: "Admin",
    },
    {
      id: "3",
      title: "Fashion Week",
      description: "Latest trends from top brands",
      startDate: "2025-08-01",
      endDate: "2025-08-07",
      location: "Central Plaza",
      images: ["/images/event3.jpg"],
      category: "Fashion",
      isFeatured: true,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: "Admin",
    },
  ]);

  // Mock gallery data
  const [allGalleryImages, setAllGalleryImages] = useState<GalleryImage[]>([
    {
      id: "1",
      src: "/images/gallery1.jpg",
      alt: "Mall interior",
      title: "Spacious Shopping Area",
      category: "mall",
      displayOnHomePage: true,
      uploadedAt: new Date().toISOString(),
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
      uploadedAt: new Date().toISOString(),
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
      uploadedAt: new Date().toISOString(),
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
      uploadedAt: new Date().toISOString(),
      uploadedBy: "Admin",
      fileSize: 1792000,
      dimensions: { width: 1920, height: 1080 },
    },
  ]);

  const [galleryFilter, setGalleryFilter] = useState<string>("all");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveHero = () => {
    // TODO: API call to save hero section
    console.log("Saving hero:", hero);
    setSuccessMessage("Hero section saved successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Banner handlers
  const handleOpenBannerDialog = (banner?: BannerSection) => {
    if (banner) {
      setEditingBanner(banner);
      setBannerFormData(banner);
      setBannerImagePreview(banner.image);
    } else {
      setEditingBanner(null);
      setBannerFormData({
        title: "",
        description: "",
        image: "",
        link: "",
        buttonText: "",
        order: banners.length + 1,
        isActive: true,
      });
      setBannerImagePreview(null);
    }
    setBannerDialogOpen(true);
  };

  const handleCloseBannerDialog = () => {
    setBannerDialogOpen(false);
    setEditingBanner(null);
    setBannerFormData({});
    setBannerImagePreview(null);
  };

  const handleBannerImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImagePreview(reader.result as string);
        setBannerFormData({
          ...bannerFormData,
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBanner = () => {
    if (editingBanner) {
      setBanners(
        banners.map((b) =>
          b.id === editingBanner.id
            ? { ...b, ...bannerFormData, updatedAt: new Date().toISOString() }
            : b
        )
      );
      setSuccessMessage("Banner updated successfully!");
    } else {
      const newBanner: BannerSection = {
        id: Date.now().toString(),
        title: bannerFormData.title || "",
        description: bannerFormData.description || "",
        image: bannerFormData.image || "",
        link: bannerFormData.link,
        buttonText: bannerFormData.buttonText,
        order: bannerFormData.order || banners.length + 1,
        isActive: bannerFormData.isActive ?? true,
        updatedAt: new Date().toISOString(),
      };
      setBanners([...banners, newBanner]);
      setSuccessMessage("Banner added successfully!");
    }
    setTimeout(() => setSuccessMessage(""), 3000);
    handleCloseBannerDialog();
  };

  const handleDeleteBanner = (id: string) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      setBanners(banners.filter((b) => b.id !== id));
      setSuccessMessage("Banner deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleMoveBanner = (index: number, direction: "up" | "down") => {
    const newBanners = [...banners];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newBanners.length) {
      [newBanners[index], newBanners[targetIndex]] = [
        newBanners[targetIndex],
        newBanners[index],
      ];
      newBanners.forEach((b, i) => (b.order = i + 1));
      setBanners(newBanners);
    }
  };

  // Event handlers
  const handleToggleFeaturedEvent = (eventId: string) => {
    setAllEvents(
      allEvents.map((e) =>
        e.id === eventId ? { ...e, isFeatured: !e.isFeatured } : e
      )
    );
    setSuccessMessage("Featured events updated!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Gallery handlers
  const handleToggleGalleryHomePage = (imageId: string) => {
    setAllGalleryImages(
      allGalleryImages.map((img) =>
        img.id === imageId
          ? { ...img, displayOnHomePage: !img.displayOnHomePage }
          : img
      )
    );
    setSuccessMessage("Gallery display updated!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const filteredGalleryImages =
    galleryFilter === "all"
      ? allGalleryImages
      : allGalleryImages.filter((img) => img.category === galleryFilter);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Home Page Management
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Paper sx={{ mt: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Hero Section" />
          <Tab label="Banner Sections" />
          <Tab label="Featured Events" />
          <Tab label="Gallery Photos" />
        </Tabs>

        {/* Hero Section Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={imagePreview || "/placeholder.jpg"}
                  alt="Hero background"
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<UploadIcon />}
                    fullWidth
                  >
                    Upload Background Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Button>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: "block" }}
                  >
                    Recommended: 1920x1080px, max 2MB
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Hero Title"
                  value={hero.title}
                  onChange={(e) => setHero({ ...hero, title: e.target.value })}
                  required
                />

                <TextField
                  fullWidth
                  label="Subtitle"
                  value={hero.subtitle}
                  onChange={(e) =>
                    setHero({ ...hero, subtitle: e.target.value })
                  }
                  multiline
                  rows={2}
                />

                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  Primary Button
                </Typography>
                <TextField
                  fullWidth
                  label="Button Text"
                  value={hero.primaryCTA?.text || ""}
                  onChange={(e) =>
                    setHero({
                      ...hero,
                      primaryCTA: {
                        text: e.target.value,
                        link: hero.primaryCTA?.link || "",
                      },
                    })
                  }
                />
                <TextField
                  fullWidth
                  label="Button Link"
                  value={hero.primaryCTA?.link || ""}
                  onChange={(e) =>
                    setHero({
                      ...hero,
                      primaryCTA: {
                        text: hero.primaryCTA?.text || "",
                        link: e.target.value,
                      },
                    })
                  }
                />

                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  Secondary Button (Optional)
                </Typography>
                <TextField
                  fullWidth
                  label="Button Text"
                  value={hero.secondaryCTA?.text || ""}
                  onChange={(e) =>
                    setHero({
                      ...hero,
                      secondaryCTA: {
                        text: e.target.value,
                        link: hero.secondaryCTA?.link || "",
                      },
                    })
                  }
                />
                <TextField
                  fullWidth
                  label="Button Link"
                  value={hero.secondaryCTA?.link || ""}
                  onChange={(e) =>
                    setHero({
                      ...hero,
                      secondaryCTA: {
                        text: hero.secondaryCTA?.text || "",
                        link: e.target.value,
                      },
                    })
                  }
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={hero.isActive}
                      onChange={(e) =>
                        setHero({ ...hero, isActive: e.target.checked })
                      }
                    />
                  }
                  label="Active"
                />

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveHero}
                  fullWidth
                >
                  Save Hero Section
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Banner Sections Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenBannerDialog()}
            >
              Add New Banner
            </Button>
          </Box>

          <Grid container spacing={3}>
            {banners
              .sort((a, b) => a.order - b.order)
              .map((banner, index) => (
                <Grid item xs={12} md={6} key={banner.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={banner.image || "/placeholder.jpg"}
                      alt={banner.title}
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
                        <Typography variant="h6">{banner.title}</Typography>
                        <Chip
                          label={banner.isActive ? "Active" : "Inactive"}
                          color={banner.isActive ? "success" : "default"}
                          size="small"
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {banner.description}
                      </Typography>
                      {banner.link && (
                        <Typography variant="caption" color="primary">
                          Link: {banner.link}
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions>
                      <IconButton
                        size="small"
                        onClick={() => handleMoveBanner(index, "up")}
                        disabled={index === 0}
                      >
                        <ArrowUpIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleMoveBanner(index, "down")}
                        disabled={index === banners.length - 1}
                      >
                        <ArrowDownIcon />
                      </IconButton>
                      <Box sx={{ flexGrow: 1 }} />
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleOpenBannerDialog(banner)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteBanner(banner.id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>

          {/* Banner Dialog */}
          <Dialog
            open={bannerDialogOpen}
            onClose={handleCloseBannerDialog}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              {editingBanner ? "Edit Banner" : "Add New Banner"}
            </DialogTitle>
            <DialogContent>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
              >
                {bannerImagePreview && (
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={bannerImagePreview}
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
                    onChange={handleBannerImageUpload}
                  />
                </Button>

                <TextField
                  fullWidth
                  label="Title"
                  value={bannerFormData.title || ""}
                  onChange={(e) =>
                    setBannerFormData({
                      ...bannerFormData,
                      title: e.target.value,
                    })
                  }
                  required
                />

                <TextField
                  fullWidth
                  label="Description"
                  value={bannerFormData.description || ""}
                  onChange={(e) =>
                    setBannerFormData({
                      ...bannerFormData,
                      description: e.target.value,
                    })
                  }
                  multiline
                  rows={2}
                />

                <TextField
                  fullWidth
                  label="Link (Optional)"
                  value={bannerFormData.link || ""}
                  onChange={(e) =>
                    setBannerFormData({
                      ...bannerFormData,
                      link: e.target.value,
                    })
                  }
                />

                <TextField
                  fullWidth
                  label="Button Text (Optional)"
                  value={bannerFormData.buttonText || ""}
                  onChange={(e) =>
                    setBannerFormData({
                      ...bannerFormData,
                      buttonText: e.target.value,
                    })
                  }
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={bannerFormData.isActive ?? true}
                      onChange={(e) =>
                        setBannerFormData({
                          ...bannerFormData,
                          isActive: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Active"
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseBannerDialog}>Cancel</Button>
              <Button
                onClick={handleSaveBanner}
                variant="contained"
                disabled={!bannerFormData.title || !bannerFormData.image}
              >
                {editingBanner ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </Dialog>
        </TabPanel>

        {/* Featured Events Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Select which events should be featured on the home page
          </Typography>

          <List>
            {allEvents.map((event) => (
              <Card key={event.id} sx={{ mb: 2 }}>
                <ListItem
                  secondaryAction={
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={event.isFeatured}
                          onChange={() => handleToggleFeaturedEvent(event.id)}
                        />
                      }
                      label="Featured"
                    />
                  }
                >
                  <ListItemIcon>
                    <CardMedia
                      component="img"
                      sx={{
                        width: 100,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 1,
                      }}
                      image={event.images[0] || "/placeholder.jpg"}
                      alt={event.title}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {event.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(event.startDate).toLocaleDateString()} -{" "}
                          {new Date(event.endDate).toLocaleDateString()}
                        </Typography>
                      </>
                    }
                    sx={{ ml: 2 }}
                  />
                </ListItem>
              </Card>
            ))}
          </List>

          {allEvents.filter((e) => e.isFeatured).length === 0 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              No events are currently featured on the home page
            </Alert>
          )}

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="primary">
              {allEvents.filter((e) => e.isFeatured).length} event(s) featured
            </Typography>
          </Box>
        </TabPanel>

        {/* Gallery Photos Tab */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Select photos to display on the home page gallery
            </Typography>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Filter by Category</InputLabel>
              <Select
                value={galleryFilter}
                label="Filter by Category"
                onChange={(e) => setGalleryFilter(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="mall">Mall</MenuItem>
                <MenuItem value="stores">Stores</MenuItem>
                <MenuItem value="dining">Dining</MenuItem>
                <MenuItem value="entertainment">Entertainment</MenuItem>
                <MenuItem value="events">Events</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Grid container spacing={2}>
            {filteredGalleryImages.map((image) => (
              <Grid item xs={12} sm={6} md={4} key={image.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={image.src || "/placeholder.jpg"}
                    alt={image.alt}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom>
                      {image.title || image.alt}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                      <Chip label={image.category} size="small" />
                      {image.displayOnHomePage && (
                        <Chip
                          label="On Home Page"
                          size="small"
                          color="primary"
                        />
                      )}
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      {image.dimensions.width} × {image.dimensions.height}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={image.displayOnHomePage}
                          onChange={() => handleToggleGalleryHomePage(image.id)}
                        />
                      }
                      label="Display on Home"
                    />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="primary">
              {allGalleryImages.filter((img) => img.displayOnHomePage).length}{" "}
              photo(s) displayed on home page
            </Typography>
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  );
}
