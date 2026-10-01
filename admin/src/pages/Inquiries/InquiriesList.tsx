import { useState } from "react";
import {
  Container,
  Typography,
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  IconButton,
  Badge,
} from "@mui/material";
import {
  Search as SearchIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  AttachMoney as MoneyIcon,
  Reply as ReplyIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon,
  CalendarMonth as CalendarIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import {
  InquiryType,
  Inquiry,
  ContactInquiry,
  RentalInquiry,
  InvestmentInquiry,
  JobApplication,
  InquiryStatus,
} from "../../types";

interface InquiriesListProps {
  type: InquiryType;
}

export default function InquiriesList({ type }: InquiriesListProps) {
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);
  const [responseText, setResponseText] = useState("");

  // Mock data
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      id: "1",
      type: "contact",
      status: "new",
      name: "Ahmed Ali",
      email: "ahmed@example.com",
      phone: "+966 50 123 4567",
      subject: "General Inquiry",
      message: "I would like to know more about your mall facilities.",
      createdAt: "2025-11-20T10:30:00Z",
    } as ContactInquiry,
    {
      id: "2",
      type: "rental",
      status: "read",
      name: "Sara Mohammed",
      email: "sara@business.com",
      phone: "+966 55 234 5678",
      businessType: "Fashion Retail",
      spaceRequirements: "50-70 sqm",
      preferredFloor: "Ground Floor",
      proposedStartDate: "2025-12-01",
      message: "Looking for retail space for a fashion boutique.",
      createdAt: "2025-11-19T14:20:00Z",
    } as RentalInquiry,
    {
      id: "3",
      type: "investment",
      status: "responded",
      name: "Khalid Hassan",
      email: "khalid@invest.com",
      phone: "+966 50 345 6789",
      investmentType: "Partnership",
      budget: "$500,000 - $1,000,000",
      timeline: "6-12 months",
      message: "Interested in investment opportunities at the mall.",
      createdAt: "2025-11-18T09:15:00Z",
      respondedAt: "2025-11-19T11:00:00Z",
      respondedBy: "Admin",
      response: "Thank you for your interest. We will contact you shortly.",
    } as InvestmentInquiry,
    {
      id: "4",
      type: "job_application",
      status: "new",
      name: "Fatima Ahmed",
      email: "fatima@email.com",
      phone: "+966 55 456 7890",
      position: "Customer Service Representative",
      experience: "3 years in retail",
      resumeUrl: "/resumes/fatima-resume.pdf",
      coverLetter: "I am excited to apply for this position...",
      message: "Applying for the customer service position.",
      createdAt: "2025-11-21T16:45:00Z",
    } as JobApplication,
    {
      id: "5",
      type: "contact",
      status: "archived",
      name: "Omar Youssef",
      email: "omar@example.com",
      subject: "Event Inquiry",
      message: "Can I organize a charity event at the mall?",
      createdAt: "2025-11-15T13:30:00Z",
      respondedAt: "2025-11-16T10:00:00Z",
      respondedBy: "Admin",
      response: "Please contact our events team for more information.",
    } as ContactInquiry,
  ]);

  const filteredInquiries = inquiries
    .filter((inq) => inq.type === type)
    .filter(
      (inq) =>
        inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inq.message.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((inq) => filterStatus === "all" || inq.status === filterStatus);

  const getTypeTitle = (type: InquiryType): string => {
    const titles: Record<InquiryType, string> = {
      contact: "Contact",
      rental: "Rental",
      investment: "Investment",
      job_application: "Job Applications",
    };
    return titles[type];
  };

  const getStatusColor = (
    status: InquiryStatus
  ): "default" | "info" | "success" | "warning" => {
    const colors: Record<
      InquiryStatus,
      "default" | "info" | "success" | "warning"
    > = {
      new: "warning",
      read: "info",
      responded: "success",
      archived: "default",
    };
    return colors[status];
  };

  const handleOpenDetails = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setDetailsDialogOpen(true);
    if (inquiry.status === "new") {
      handleUpdateStatus(inquiry.id, "read");
    }
  };

  const handleOpenResponse = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setResponseText(inquiry.response || "");
    setResponseDialogOpen(true);
  };

  const handleUpdateStatus = (id: string, status: InquiryStatus) => {
    setInquiries(
      inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const handleSendResponse = () => {
    if (selectedInquiry) {
      setInquiries(
        inquiries.map((inq) =>
          inq.id === selectedInquiry.id
            ? {
                ...inq,
                status: "responded" as InquiryStatus,
                response: responseText,
                respondedAt: new Date().toISOString(),
                respondedBy: "Admin",
              }
            : inq
        )
      );
      setSuccessMessage("Response sent successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      setResponseDialogOpen(false);
      setSelectedInquiry(null);
      setResponseText("");
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete inquiry from "${name}"?`)) {
      setInquiries(inquiries.filter((inq) => inq.id !== id));
      setSuccessMessage("Inquiry deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderInquirySpecificInfo = (inquiry: Inquiry) => {
    switch (inquiry.type) {
      case "contact":
        return (
          <Typography variant="body2" color="text.secondary">
            <strong>Subject:</strong> {inquiry.subject}
          </Typography>
        );
      case "rental":
        return (
          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              <strong>Business:</strong> {inquiry.businessType}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Space:</strong> {inquiry.spaceRequirements}
            </Typography>
            {inquiry.preferredFloor && (
              <Typography variant="body2" color="text.secondary">
                <strong>Floor:</strong> {inquiry.preferredFloor}
              </Typography>
            )}
          </Stack>
        );
      case "investment":
        return (
          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              <strong>Type:</strong> {inquiry.investmentType}
            </Typography>
            {inquiry.budget && (
              <Typography variant="body2" color="text.secondary">
                <strong>Budget:</strong> {inquiry.budget}
              </Typography>
            )}
          </Stack>
        );
      case "job_application":
        return (
          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              <strong>Position:</strong> {inquiry.position}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Experience:</strong> {inquiry.experience}
            </Typography>
          </Stack>
        );
    }
  };

  const getTypeIcon = (type: InquiryType) => {
    switch (type) {
      case "contact":
        return <EmailIcon />;
      case "rental":
        return <BusinessIcon />;
      case "investment":
        return <MoneyIcon />;
      case "job_application":
        return <WorkIcon />;
    }
  };

  const newCount = filteredInquiries.filter(
    (inq) => inq.status === "new"
  ).length;

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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h4">{getTypeTitle(type)} Inquiries</Typography>
          {newCount > 0 && (
            <Badge badgeContent={newCount} color="warning">
              <Chip label="New" color="warning" size="small" />
            </Badge>
          )}
        </Box>
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
            placeholder="Search by name, email, or message..."
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
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              label="Status"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="read">Read</MenuItem>
              <MenuItem value="responded">Responded</MenuItem>
              <MenuItem value="archived">Archived</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Card>

      {/* Inquiries List */}
      <Grid container spacing={2}>
        {filteredInquiries.map((inquiry) => (
          <Grid item xs={12} key={inquiry.id}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {getTypeIcon(inquiry.type)}
                    <Box>
                      <Typography variant="h6">{inquiry.name}</Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          <EmailIcon
                            fontSize="small"
                            sx={{ verticalAlign: "middle", mr: 0.5 }}
                          />
                          {inquiry.email}
                        </Typography>
                        {inquiry.phone && (
                          <Typography variant="body2" color="text.secondary">
                            <PhoneIcon
                              fontSize="small"
                              sx={{ verticalAlign: "middle", mr: 0.5 }}
                            />
                            {inquiry.phone}
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                  </Box>
                  <Chip
                    label={inquiry.status.toUpperCase()}
                    color={getStatusColor(inquiry.status)}
                    size="small"
                  />
                </Box>

                {renderInquirySpecificInfo(inquiry)}

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 2,
                    mb: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {inquiry.message}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  <CalendarIcon
                    fontSize="small"
                    sx={{ verticalAlign: "middle", mr: 0.5 }}
                  />
                  {formatDate(inquiry.createdAt)}
                </Typography>

                {inquiry.respondedAt && (
                  <Typography
                    variant="caption"
                    color="success.main"
                    sx={{ ml: 2 }}
                  >
                    Responded: {formatDate(inquiry.respondedAt)}
                  </Typography>
                )}

                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                  <Button
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleOpenDetails(inquiry)}
                  >
                    View Details
                  </Button>
                  <Button
                    size="small"
                    startIcon={<ReplyIcon />}
                    onClick={() => handleOpenResponse(inquiry)}
                    disabled={inquiry.status === "archived"}
                  >
                    {inquiry.response ? "View Response" : "Respond"}
                  </Button>
                  {inquiry.status !== "archived" && (
                    <Button
                      size="small"
                      startIcon={<ArchiveIcon />}
                      onClick={() => handleUpdateStatus(inquiry.id, "archived")}
                    >
                      Archive
                    </Button>
                  )}
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(inquiry.id, inquiry.name)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredInquiries.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No {getTypeTitle(type).toLowerCase()} inquiries found
          </Typography>
        </Box>
      )}

      {/* Details Dialog */}
      <Dialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedInquiry && (
          <>
            <DialogTitle>
              Inquiry Details
              <IconButton
                onClick={() => setDetailsDialogOpen(false)}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1">
                    {selectedInquiry.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">
                    {selectedInquiry.email}
                  </Typography>
                </Box>
                {selectedInquiry.phone && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body1">
                      {selectedInquiry.phone}
                    </Typography>
                  </Box>
                )}
                <Divider />
                {selectedInquiry.type === "contact" && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Subject
                    </Typography>
                    <Typography variant="body1">
                      {selectedInquiry.subject}
                    </Typography>
                  </Box>
                )}
                {selectedInquiry.type === "rental" && (
                  <>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Business Type
                      </Typography>
                      <Typography variant="body1">
                        {selectedInquiry.businessType}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Space Requirements
                      </Typography>
                      <Typography variant="body1">
                        {selectedInquiry.spaceRequirements}
                      </Typography>
                    </Box>
                    {selectedInquiry.preferredFloor && (
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Preferred Floor
                        </Typography>
                        <Typography variant="body1">
                          {selectedInquiry.preferredFloor}
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
                {selectedInquiry.type === "investment" && (
                  <>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Investment Type
                      </Typography>
                      <Typography variant="body1">
                        {selectedInquiry.investmentType}
                      </Typography>
                    </Box>
                    {selectedInquiry.budget && (
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Budget
                        </Typography>
                        <Typography variant="body1">
                          {selectedInquiry.budget}
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
                {selectedInquiry.type === "job_application" && (
                  <>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Position
                      </Typography>
                      <Typography variant="body1">
                        {selectedInquiry.position}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Experience
                      </Typography>
                      <Typography variant="body1">
                        {selectedInquiry.experience}
                      </Typography>
                    </Box>
                    {selectedInquiry.resumeUrl && (
                      <Box>
                        <Button
                          variant="outlined"
                          startIcon={<DescriptionIcon />}
                          href={selectedInquiry.resumeUrl}
                          target="_blank"
                        >
                          Download Resume
                        </Button>
                      </Box>
                    )}
                  </>
                )}
                <Divider />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Message
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {selectedInquiry.message}
                  </Typography>
                </Box>
                {selectedInquiry.response && (
                  <>
                    <Divider />
                    <Box>
                      <Typography variant="subtitle2" color="success.main">
                        Response
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ whiteSpace: "pre-wrap" }}
                      >
                        {selectedInquiry.response}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Responded by {selectedInquiry.respondedBy} on{" "}
                        {selectedInquiry.respondedAt &&
                          formatDate(selectedInquiry.respondedAt)}
                      </Typography>
                    </Box>
                  </>
                )}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Response Dialog */}
      <Dialog
        open={responseDialogOpen}
        onClose={() => setResponseDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedInquiry?.response ? "View Response" : "Send Response"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Response Message"
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            sx={{ mt: 2 }}
            disabled={!!selectedInquiry?.response}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResponseDialogOpen(false)}>Cancel</Button>
          {!selectedInquiry?.response && (
            <Button
              onClick={handleSendResponse}
              variant="contained"
              disabled={!responseText.trim()}
            >
              Send Response
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
}
