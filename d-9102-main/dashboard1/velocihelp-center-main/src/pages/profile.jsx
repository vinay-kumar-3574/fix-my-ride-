import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  User,
  Car,
  MapPin,
  Phone,
  Mail,
  Edit,
  Shield,
  Activity,
  Award,
  Settings,
} from "lucide-react";

// ✅ Auto-save with debounce
const debouncedSave = debounce((data) => {
  const token = localStorage.getItem("token");
  if (!token) return console.error("No token found");

  fetch("http://localhost:8000/api/auto-update-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token, // ✅ Add this
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => console.log("Auto-saved:", data))
    .catch((error) => console.error("Auto-save error:", error));
}, 1000);


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [editableData, setEditableData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    fetch(`http://localhost:8000/api/profile?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setEditableData(data);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedData = { ...editableData, [id]: value };
    setEditableData(updatedData);

    // ✅ Call auto-save with email (used for lookup)
    debouncedSave({ ...updatedData, email: editableData.email });
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");
    if (!token) return console.error("No token found");
  
    fetch("http://localhost:8000/api/auto-update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token, // ✅ Add this
      },
      body: JSON.stringify(editableData),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        alert("Profile updated successfully!");
      })
      .catch((error) => console.error("Update error:", error));
  };

  if (!userData)
    return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 p-6 lg:p-10">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="group inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-primary/80 active:scale-95 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Dashboard
          </Link>

          <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <Card className="lg:col-span-4">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4 pb-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="text-lg">JS</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1 text-center">
                  <h2 className="text-xl font-semibold">{userData.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    Premium Member
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" /> Verified
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Award className="h-3 w-3" /> 0 Years
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{userData.contactNumber}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{userData.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span>0 service requests completed</span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Car className="mr-2 h-4 w-4" />
                  Manage Vehicles
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-8 space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="membership">Membership</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5 text-primary" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={editableData.name || ""}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={editableData.email || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactNumber">Phone Number</Label>
                      <Input
                        id="contactNumber"
                        value={editableData.contactNumber || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Address</Label>
                      <Input
                        id="location"
                        value={editableData.location || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="membership" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-primary" />
                      Membership Details
                    </CardTitle>
                    <CardDescription>Your current membership info</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium">Premium Plan</h3>
                        <p className="text-sm text-muted-foreground">Unlimited roadside assistance</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => navigate("/dashboard/pricing")}>View All Benefits</Button>
                    <Button>Upgrade Plan</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="mr-2 h-5 w-5 text-primary" />
                      Communication Preferences
                    </CardTitle>
                    <CardDescription>Manage how we contact you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Label htmlFor="bio">Bio/About</Label>
                    <Textarea
                      id="bio"
                      value={editableData.bio || ""}
                      onChange={handleChange}
                      placeholder="Tell us a bit about yourself"
                      className="min-h-[100px]"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSave}>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
