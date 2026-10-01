import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  FormControlLabel,
  Avatar,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  AdminPanelSettings as AdminIcon,
  ManageAccounts as ManageIcon,
  Support as SupportIcon,
  Edit as EditorIcon,
} from "@mui/icons-material";
import { User, UserRole, Permission } from "../../types";
import { rolePermissions } from "../../config/permissions";

export default function UsersList() {
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [selectedUserPermissions, setSelectedUserPermissions] = useState<
    Permission[]
  >([]);

  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    email: "",
    role: "editor",
    permissions: [],
    isActive: true,
  });

  // Mock data
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      email: "admin@alamericmall.com",
      name: "Super Admin",
      role: "super_admin",
      permissions: rolePermissions.super_admin,
      createdAt: "2025-01-01T00:00:00Z",
      lastLogin: "2025-11-23T08:30:00Z",
      isActive: true,
    },
    {
      id: "2",
      email: "content@alamericmall.com",
      name: "Content Manager",
      role: "content_manager",
      permissions: rolePermissions.content_manager,
      createdAt: "2025-01-15T00:00:00Z",
      lastLogin: "2025-11-22T14:20:00Z",
      isActive: true,
    },
    {
      id: "3",
      email: "inquiry@alamericmall.com",
      name: "Inquiry Manager",
      role: "inquiry_manager",
      permissions: rolePermissions.inquiry_manager,
      createdAt: "2025-02-01T00:00:00Z",
      lastLogin: "2025-11-21T10:15:00Z",
      isActive: true,
    },
    {
      id: "4",
      email: "editor@alamericmall.com",
      name: "Content Editor",
      role: "editor",
      permissions: rolePermissions.editor,
      createdAt: "2025-03-10T00:00:00Z",
      lastLogin: "2025-11-20T16:45:00Z",
      isActive: false,
    },
  ]);

  const roles: UserRole[] = [
    "super_admin",
    "content_manager",
    "inquiry_manager",
    "editor",
  ];

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => filterRole === "all" || user.role === filterRole)
    .filter((user) => {
      if (filterStatus === "active") return user.isActive;
      if (filterStatus === "inactive") return !user.isActive;
      return true;
    });

  const getRoleLabel = (role: UserRole): string => {
    const labels: Record<UserRole, string> = {
      super_admin: "Super Admin",
      content_manager: "Content Manager",
      inquiry_manager: "Inquiry Manager",
      editor: "Editor",
    };
    return labels[role];
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "super_admin":
        return <AdminIcon />;
      case "content_manager":
        return <ManageIcon />;
      case "inquiry_manager":
        return <SupportIcon />;
      case "editor":
        return <EditorIcon />;
    }
  };

  const getRoleColor = (
    role: UserRole
  ): "default" | "primary" | "secondary" | "info" => {
    const colors: Record<
      UserRole,
      "default" | "primary" | "secondary" | "info"
    > = {
      super_admin: "primary",
      content_manager: "secondary",
      inquiry_manager: "info",
      editor: "default",
    };
    return colors[role];
  };

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
        isActive: user.isActive,
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        role: "editor",
        permissions: rolePermissions.editor,
        isActive: true,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      role: "editor",
      permissions: [],
      isActive: true,
    });
  };

  const handleRoleChange = (role: UserRole) => {
    setFormData({
      ...formData,
      role,
      permissions: rolePermissions[role],
    });
  };

  const handleSave = () => {
    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                ...formData,
                permissions: rolePermissions[formData.role!],
              }
            : u
        )
      );
      setSuccessMessage("User updated successfully!");
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        email: formData.email!,
        name: formData.name!,
        role: formData.role!,
        permissions: rolePermissions[formData.role!],
        createdAt: new Date().toISOString(),
        isActive: formData.isActive!,
      };
      setUsers([...users, newUser]);
      setSuccessMessage("User created successfully!");
    }
    setTimeout(() => setSuccessMessage(""), 3000);
    handleCloseDialog();
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete user "${name}"?`)) {
      setUsers(users.filter((u) => u.id !== id));
      setSuccessMessage("User deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleToggleActive = (id: string) => {
    setUsers(
      users.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
    setSuccessMessage("User status updated!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleViewPermissions = (user: User) => {
    setSelectedUserPermissions(user.permissions);
    setPermissionsDialogOpen(true);
  };

  const formatDate = (date?: string) => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // const allPermissions: Permission[] = [
  //   "home_page.edit",
  //   "stores.view",
  //   "stores.create",
  //   "stores.edit",
  //   "stores.delete",
  //   "events.view",
  //   "events.create",
  //   "events.edit",
  //   "events.delete",
  //   "events.feature",
  //   "gallery.view",
  //   "gallery.upload",
  //   "gallery.delete",
  //   "gallery.set_home",
  //   "inquiries.view",
  //   "inquiries.respond",
  //   "inquiries.delete",
  //   "users.view",
  //   "users.create",
  //   "users.edit",
  //   "users.delete",
  //   "settings.view",
  //   "settings.edit",
  // ];

  const groupPermissions = (permissions: Permission[]) => {
    const groups: Record<string, Permission[]> = {};
    permissions.forEach((perm) => {
      const [module] = perm.split(".");
      if (!groups[module]) groups[module] = [];
      groups[module].push(perm);
    });
    return groups;
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
        <Typography variant="h4">Users Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add New User
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
            placeholder="Search by name or email..."
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
            <InputLabel>Role</InputLabel>
            <Select
              value={filterRole}
              label="Role"
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <MenuItem value="all">All Roles</MenuItem>
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {getRoleLabel(role)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              label="Status"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Card>

      {/* Users Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar>{user.name[0]}</Avatar>
                    <Box>
                      <Typography variant="body1">{user.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getRoleIcon(user.role)}
                    label={getRoleLabel(user.role)}
                    color={getRoleColor(user.role)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={user.isActive}
                        onChange={() => handleToggleActive(user.id)}
                        size="small"
                      />
                    }
                    label={user.isActive ? "Active" : "Inactive"}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatDate(user.lastLogin)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => handleViewPermissions(user)}
                  >
                    View ({user.permissions.length})
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(user)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(user.id, user.name)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredUsers.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No users found
          </Typography>
        </Box>
      )}

      {/* User Form Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingUser ? "Edit User" : "Add New User"}
          <IconButton
            onClick={handleCloseDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                label="Role"
                onChange={(e) => handleRoleChange(e.target.value as UserRole)}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {getRoleLabel(role)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Role permissions will be automatically assigned
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formData.role && rolePermissions[formData.role].length}{" "}
                permissions
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                />
              }
              label="Active"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!formData.name || !formData.email || !formData.role}
          >
            {editingUser ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Permissions Dialog */}
      <Dialog
        open={permissionsDialogOpen}
        onClose={() => setPermissionsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          User Permissions
          <IconButton
            onClick={() => setPermissionsDialogOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {Object.entries(groupPermissions(selectedUserPermissions)).map(
            ([module, perms]) => (
              <Box key={module} sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ textTransform: "capitalize", mb: 1 }}
                >
                  {module.replace("_", " ")}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {perms.map((perm) => (
                    <Chip
                      key={perm}
                      label={perm.split(".")[1]}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Stack>
              </Box>
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPermissionsDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
