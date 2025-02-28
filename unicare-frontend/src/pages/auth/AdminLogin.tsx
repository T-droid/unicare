import React, { useState } from "react";
import { useDispatch, UseDispatch } from "react-redux";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { AlertCircle } from "lucide-react";
import { setAlert } from "@/state/app";
import axios from "axios";
import { setCurrentUser, setToken } from "@/state/auth";

const AdminSignIn: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error] = useState("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const loginResponse = await axios.post(
        `${import.meta.env.VITE_SERVER_HEAD}/users/login`,
        formData
      );

      if (loginResponse.status !== 200) {
        throw new Error(loginResponse.data.message || "Login failed");
      }
      const loginData = loginResponse.data;
      console.log(loginData);

      dispatch(setAlert({ message: "Login successful", type: "success" }));
      dispatch(setCurrentUser(loginData.data[0]));
      dispatch(setToken(loginData.token));
      window.location.href = "/admin";
    } catch (error: any) {
      dispatch(
        setAlert({
          message: error.response.data.error || error.message,
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
            UniCare Admin Portal
          </h1>
          <p className="text-center text-gray-600">
            Sign in to manage staff and system
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
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
