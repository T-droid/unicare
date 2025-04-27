import React, { useState } from "react";
import { useDispatch, UseDispatch } from "react-redux";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { setAlert } from "@/state/app";
import { setCurrentUser, setToken } from "@/state/auth";
import axiosInstance from "@/middleware/axiosInstance";

const AdminSignIn: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const loginResponse = await axiosInstance.post(`/users/login`, formData, {
        withCredentials: true,
      });

      if (loginResponse.status !== 200) {
        throw new Error(loginResponse.data.message || "Login failed");
      }
      const loginData = loginResponse.data;

      dispatch(setAlert({ message: "Login successful", type: "success" }));
      dispatch(setCurrentUser(loginData.data));
      dispatch(setToken(loginData.token));
      window.location.href = `/${loginData.data.role}`;
    } catch (error: any) {
      console.log(error);

      dispatch(
        setAlert({
          message: error.response.data.error || error.message || "Login failed",
          type: `${error.response.status === 404 ? "warning" : "error"}`,
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Welcome to UniCare Portal
          </h1>
          <p className="text-center text-gray-600">
            Sign in to access your account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="johndoe@example.com"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={`${passwordVisible ? "text" : "password"}`}
                name="password"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                onClick={() => setPasswordVisible(!passwordVisible)}
                type="button"
                className="float-right absolute right-2 top-1/2"
              >
                {passwordVisible ? (
                  <EyeOff className="w-6 h-6 text-gray-500" />
                ) : (
                  <Eye className="w-6 h-6 text-gray-500" />
                )}
              </button>
            </div>
            {error && (
              <div className="flex items-center text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
            <div className="flex justify-end">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
              <a
                href="/auth/register"
                className="text-blue-600 hover:underline"
              >
                <span className="ml-2">|</span>
                <span className="ml-2">Create an account</span>
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSignIn;
