// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; // For password hashing

import Login from "@/model2/Login";
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
          const User = await AdminLogin.findOne({ email: credentials?.email }).populate({ path: "currentCenter" });
          if (!User) {
            throw new Error("User not found!");
          }

          if (credentials.password !== User.bcryptPassword) {
            throw new Error("Incorrect password!");
          }

          var getCentersFilter = {}
          var currentCenter = User?.currentCenter
          if (Array.isArray(User?.iscenter) && (User?.iscenter?.includes?.("*") || User.role == "admin")) {
            getCentersFilter = { publishedAt: { $ne: null } }
          }
          else if (Array.isArray(User?.iscenter) && User.iscenter.length > 0) {
            getCentersFilter = { _id: { $in: User.iscenter }, publishedAt: { $ne: null } }
          }
          else {
            throw new Error("Centers are not assigned to user. Not Allowed to login!");
          }
          var centers = await Center.find(getCentersFilter).select("centre city state")
          if (centers.some(item => item?.id == User?.currentCenter?.id) && User?.currentCenter) {
            currentCenter = User?.currentCenter
          }
          else {
            currentCenter = centers[0]
            User.currentCenter = currentCenter?.id
            await User.save();
          }
          return {
            id: User.id,
            name: User.name,
            email: User.email,
            role: User.role,
            phone: User.phone,
            centers: centers,
            currentCenter: centers[0],
            image: User?.image
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
          const User = await Login.findOne({ phone: credentials?.phone });
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
            id: User.id,
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
    async jwt({ token, user: User, trigger, session }) {
      if (trigger === "update" && session) {
        token = { ...token, ...session }
        return token;
      };
      if (User) {
        token.id = User.id;
        token.email = User.email;
        token.name = User.name;
        token.role = User.role;
        token.phone = User.phone;
        token.centers = User?.centers ?? [],
          token.currentCenter = User?.currentCenter,
          token.image = User?.image
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
          centers: token?.centers,
          currentCenter: token?.currentCenter,
          image: token?.image
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
