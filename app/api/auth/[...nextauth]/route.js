// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; // For password hashing

import user from "@/models/user";
import moment from "moment";
import AdminLogin from "@/model2/AdminLogin";
import Center from "@/model2/Center";
export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "admin",
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const User = await AdminLogin.findOne({ email: credentials?.email });
          if (!User) {
            throw new Error("User not found!");
          }

          if (credentials.password !== User.bcryptPassword) {
            throw new Error("Incorrect password!");
          }
          var centers = []
          if (User.role == "admin") {
            var newCenters = await Center.find({ publishedAt: { $ne: null } }).select("centre city state")
            centers = newCenters
          }
          else if (User.role == "adminuser" && Array.isArray(User.iscenter) && User.iscenter.length > 0) {
            var newCenters = await Center.find({ _id: { $in: User.iscenter } }).select("centre city state")
            centers = newCenters
          }
          else {
            throw new Error("Not authorized!");
          }
          return {
            id: User._id,
            name: User.name,
            email: User.email,
            role: User.role,
            phone: User.phone,
            centers: centers
          };
        } catch (err) {
          throw new Error(err.message);
        }
      },
    }),
    CredentialsProvider({
      id: "user",
      name: "User Login",
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        try {
          const User = await user.findOne({ phone: credentials?.phone });
          if (!User) {
            throw new Error("User not found!");
          }
          if (!User?.otp || !User?.otpExpire || credentials.otp != User.otp) {
            throw new Error("Invalid OTP!");
          }
          if (!moment().isBefore(moment(User?.otpExpire))) {
            throw new Error("OTP expired!");
          }

          return {
            id: User._id,
            name: User.name,
            email: User.email,
            role: User.role,
            phone: User.phone,
          };
        } catch (err) {
          throw new Error(err.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true, // Use encryption for additional security
    maxAge: 10 * 24 * 60 * 60, // JWT expiration time (24 hours)
  },
  callbacks: {
    async jwt({ token, user: User }) {
      if (User) {
        token.id = User.id;
        token.email = User.email;
        token.name = User.name;
        token.role = User.role;
        token.phone = User.phone;
        token.centers = User?.centers ?? []
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          role: token.role,
          phone: token.phone,
          centers: token?.centers
        };
      }
      return session;
    },
  },
};

// Export named handlers for HTTP methods
export async function GET(req, res) {
  return NextAuth(req, res, authOptions);
}

export async function POST(req, res) {
  return NextAuth(req, res, authOptions);
}
