import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { firstName, lastName, apartmentNumber, tower, phoneNumber } = await request.json();

    if (!firstName || !lastName || !apartmentNumber || !tower) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate apartment number format (NN.NNN)
    const apartmentRegex = /^\d{2}\.\d{3}$/;
    if (!apartmentRegex.test(apartmentNumber)) {
      return NextResponse.json(
        { error: "Apartment number must be in format NN.NNN (e.g., 12.345)" },
        { status: 400 }
      );
    }

    // Check if apartment number is already taken by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        apartmentNumber: apartmentNumber,
        tower: tower,
        NOT: {
          email: session.user.email
        }
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "This apartment number is already registered to another user" },
        { status: 400 }
      );
    }

    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    console.log(`[USER] Profile update attempt for: ${session.user.email} from IP: ${clientIP}`);

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email
      },
      data: {
        firstName,
        lastName,
        apartmentNumber,
        tower,
        phoneNumber: phoneNumber || null,
        updatedAt: new Date()
      }
    });

    console.log(`[USER] Profile updated successfully for: ${session.user.email} (${firstName} ${lastName}, Apt: ${apartmentNumber}) from IP: ${clientIP}`);

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        name: `${firstName} ${lastName}`,
        apartmentNumber,
        tower
      }
    });

  } catch (error) {
    console.error("[USER] Profile update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
