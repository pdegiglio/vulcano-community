import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          console.log(`[AUTH] Login attempt failed - missing credentials from IP: ${req?.headers?.['x-forwarded-for'] || req?.headers?.['x-real-ip'] || 'unknown'}`);
          return null;
        }

        const clientIP = req?.headers?.['x-forwarded-for'] || req?.headers?.['x-real-ip'] || 'unknown';
        
        console.log(`[AUTH] Login attempt for email: ${credentials.email} from IP: ${clientIP}`);

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user.isActive) {
          console.log(`[AUTH] Login failed - user not found or inactive: ${credentials.email} from IP: ${clientIP}`);
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          console.log(`[AUTH] Login failed - invalid password for: ${credentials.email} from IP: ${clientIP}`);
          return null;
        }

        console.log(`[AUTH] Login successful for: ${credentials.email} (${user.firstName} ${user.lastName}, Apt: ${user.apartmentNumber}) from IP: ${clientIP}`);

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          apartmentNumber: user.apartmentNumber,
          tower: user.tower,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        token.role = user.role;
        token.apartmentNumber = user.apartmentNumber;
        token.tower = user.tower;
        
        if (account?.provider === "credentials") {
          console.log(`[AUTH] JWT created for user: ${user.email} (${user.name})`);
        }
      }
      
      // Handle session updates from update() calls
      if (trigger === "update" && session) {
        token.name = session.name || token.name;
        token.apartmentNumber = session.apartmentNumber || token.apartmentNumber;
        token.tower = session.tower || token.tower;
        console.log(`[AUTH] JWT updated via session update: ${token.email} (${token.name}, Apt: ${token.apartmentNumber})`);
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
        session.user.apartmentNumber = token.apartmentNumber as string;
        session.user.tower = token.tower as string;
        
        console.log(`[AUTH] Session accessed by: ${session.user.email} (${session.user.name}, Apt: ${session.user.apartmentNumber})`);
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials" && user) {
        console.log(`[AUTH] Sign-in callback successful for: ${user.email} (${user.name})`);
      }
      return true;
    }
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`[AUTH] EVENT: User signed in - ${user?.email} (${user?.name})`);
    },
    async signOut({ session, token }) {
      const userInfo = session?.user || token;
      console.log(`[AUTH] EVENT: User signed out - ${userInfo?.email || 'unknown'}`);
    },
    async session({ session, token }) {
      console.log(`[AUTH] EVENT: Session checked for - ${session.user?.email || token?.email || 'unknown'}`);
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
};