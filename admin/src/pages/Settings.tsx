import { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Grid,
  Tabs,
  Tab,
  Alert,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
} from "@mui/material";
import {
  Save as SaveIcon,
  Business as BusinessIcon,
  Schedule as ScheduleIcon,
  Share as ShareIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { MallSettings } from "../types";

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
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Settings() {
  const [tabValue, setTabValue] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  // Mock settings data
  const [settings, setSettings] = useState<MallSettings>({
    id: "1",
    mallName: "Alamer Mall",
    tagline: "Your Premier Shopping Destination",
    description:
      "Alamer Mall is the leading shopping destination featuring over 200 stores, restaurants, entertainment venues, and more.",
    contact: {
      phone: "+966 11 234 5678",
      email: "info@alamericmall.com",
      address: "King Fahd Road, Riyadh, Saudi Arabia",
    },
    operatingHours: {
      sunday: { open: "10:00", close: "23:00" },
      monday: { open: "10:00", close: "23:00" },
      tuesday: { open: "10:00", close: "23:00" },
      wednesday: { open: "10:00", close: "23:00" },
      thursday: { open: "10:00", close: "00:00" },
      friday: { open: "14:00", close: "00:00" },
      saturday: { open: "10:00", close: "00:00" },
    },
    socialMedia: {
      facebook: "https://facebook.com/alamericmall",
      instagram: "https://instagram.com/alamericmall",
      twitter: "https://twitter.com/alamericmall",
      youtube: "https://youtube.com/alamericmall",
      tiktok: "https://tiktok.com/@alamericmall",
    },
    footerText: "© 2025 Alamer Mall. All rights reserved.",
    emergencyMessage: {
      isActive: false,
      message: "",
      type: "info",
    },
    updatedAt: new Date().toISOString(),
    updatedBy: "Admin",
  });

  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const handleSave = () => {
    // TODO: API call to save settings
    console.log("Saving settings:", settings);
    setSuccessMessage("Settings saved successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mall Settings
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
          <Tab
            icon={<BusinessIcon />}
            label="General Info"
            iconPosition="start"
          />
          <Tab
            icon={<ScheduleIcon />}
            label="Operating Hours"
            iconPosition="start"
          />
          <Tab icon={<ShareIcon />} label="Social Media" iconPosition="start" />
          <Tab
            icon={<InfoIcon />}
            label="Emergency Message"
            iconPosition="start"
          />
        </Tabs>

        {/* General Info Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Mall Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mall Name"
                value={settings.mallName}
                onChange={(e) =>
                  setSettings({ ...settings, mallName: e.target.value })
                }
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tagline"
                value={settings.tagline}
                onChange={(e) =>
                  setSettings({ ...settings, tagline: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={settings.description}
                onChange={(e) =>
                  setSettings({ ...settings, description: e.target.value })
                }
                multiline
                rows={3}
              />
            </Grid>

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
                value={settings.contact.phone}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contact: { ...settings.contact, phone: e.target.value },
                  })
                }
                required
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={settings.contact.email}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contact: { ...settings.contact, email: e.target.value },
                  })
                }
                required
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Address"
                value={settings.contact.address}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contact: { ...settings.contact, address: e.target.value },
                  })
                }
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Footer
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Footer Text"
                value={settings.footerText}
                onChange={(e) =>
                  setSettings({ ...settings, footerText: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Operating Hours Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Weekly Operating Hours
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Set the mall's operating hours for each day of the week
              </Typography>
            </Grid>

            {daysOfWeek.map((day) => (
              <Grid item xs={12} key={day}>
                <Card variant="outlined">
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        sx={{
                          minWidth: 120,
                          textTransform: "capitalize",
                          fontWeight: 500,
                        }}
                      >
                        {day}
                      </Typography>
                      <TextField
                        type="time"
                        label="Opening Time"
                        value={settings.operatingHours[day]?.open || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            operatingHours: {
                              ...settings.operatingHours,
                              [day]: {
                                ...settings.operatingHours[day],
                                open: e.target.value,
                                close:
                                  settings.operatingHours[day]?.close || "",
                              },
                            },
                          })
                        }
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: 150 }}
                        disabled={settings.operatingHours[day]?.closed}
                      />
                      <TextField
                        type="time"
                        label="Closing Time"
                        value={settings.operatingHours[day]?.close || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            operatingHours: {
                              ...settings.operatingHours,
                              [day]: {
                                ...settings.operatingHours[day],
                                open: settings.operatingHours[day]?.open || "",
                                close: e.target.value,
                              },
                            },
                          })
                        }
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: 150 }}
                        disabled={settings.operatingHours[day]?.closed}
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={!settings.operatingHours[day]?.closed}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                operatingHours: {
                                  ...settings.operatingHours,
                                  [day]: {
                                    ...settings.operatingHours[day],
                                    open:
                                      settings.operatingHours[day]?.open || "",
                                    close:
                                      settings.operatingHours[day]?.close || "",
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Social Media Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Social Media Links
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Add your mall's social media profiles
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Facebook"
                value={settings.socialMedia.facebook || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialMedia: {
                      ...settings.socialMedia,
                      facebook: e.target.value,
                    },
                  })
                }
                placeholder="https://facebook.com/yourpage"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Instagram"
                value={settings.socialMedia.instagram || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialMedia: {
                      ...settings.socialMedia,
                      instagram: e.target.value,
                    },
                  })
                }
                placeholder="https://instagram.com/yourpage"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Twitter / X"
                value={settings.socialMedia.twitter || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialMedia: {
                      ...settings.socialMedia,
                      twitter: e.target.value,
                    },
                  })
                }
                placeholder="https://twitter.com/yourpage"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="YouTube"
                value={settings.socialMedia.youtube || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialMedia: {
                      ...settings.socialMedia,
                      youtube: e.target.value,
                    },
                  })
                }
                placeholder="https://youtube.com/yourchannel"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="TikTok"
                value={settings.socialMedia.tiktok || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialMedia: {
                      ...settings.socialMedia,
                      tiktok: e.target.value,
                    },
                  })
                }
                placeholder="https://tiktok.com/@yourpage"
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Emergency Message Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Emergency Announcement
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Display an important message at the top of your website
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emergencyMessage?.isActive || false}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        emergencyMessage: {
                          ...settings.emergencyMessage,
                          isActive: e.target.checked,
                          message: settings.emergencyMessage?.message || "",
                          type: settings.emergencyMessage?.type || "info",
                        },
                      })
                    }
                  />
                }
                label="Enable Emergency Message"
              />
            </Grid>

            {settings.emergencyMessage?.isActive && (
              <>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Message Type</InputLabel>
                    <Select
                      value={settings.emergencyMessage.type}
                      label="Message Type"
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          emergencyMessage: {
                            ...settings.emergencyMessage!,
                            type: e.target.value as
                              | "info"
                              | "warning"
                              | "critical",
                          },
                        })
                      }
                    >
                      <MenuItem value="info">Info</MenuItem>
                      <MenuItem value="warning">Warning</MenuItem>
                      <MenuItem value="critical">Critical</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    value={settings.emergencyMessage.message}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        emergencyMessage: {
                          ...settings.emergencyMessage!,
                          message: e.target.value,
                        },
                      })
                    }
                    multiline
                    rows={3}
                    placeholder="Enter your emergency message here..."
                    required={settings.emergencyMessage.isActive}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Alert
                    severity={
                      settings.emergencyMessage.type === "critical"
                        ? "error"
                        : (settings.emergencyMessage.type as
                            | "info"
                            | "warning"
                            | "error")
                    }
                    sx={{ mt: 2 }}
                  >
                    <Typography variant="body2">
                      <strong>Preview:</strong>{" "}
                      {settings.emergencyMessage.message ||
                        "Your message will appear here"}
                    </Typography>
                  </Alert>
                </Grid>
              </>
            )}
          </Grid>
        </TabPanel>

        {/* Save Button */}
        <Box sx={{ p: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Save Settings
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
