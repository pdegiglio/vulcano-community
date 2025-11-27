import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const clientIP = req.headers.get('x-forwarded-for') || 
                   req.headers.get('x-real-ip') || 
                   'unknown';
  
  try {
    const { firstName, lastName, email, password, apartmentNumber, tower, phoneNumber } = await req.json();

    console.log(`[REGISTRATION] New registration attempt for: ${email} (${firstName} ${lastName}, Apt: ${apartmentNumber}, Tower: ${tower}) from IP: ${clientIP}`);

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !apartmentNumber || !tower) {
      console.log(`[REGISTRATION] Registration failed - missing required fields for: ${email} from IP: ${clientIP}`);
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Validate apartment number format (NN.NNN)
    const apartmentRegex = /^\d{2}\.\d{3}$/;
    if (!apartmentRegex.test(apartmentNumber)) {
      console.log(`[REGISTRATION] Registration failed - invalid apartment format: ${apartmentNumber} for: ${email} from IP: ${clientIP}`);
      return NextResponse.json(
        { error: "Apartment number must be in format NN.NNN (e.g., 12.345)" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { apartmentNumber: apartmentNumber }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === email) {
        console.log(`[REGISTRATION] Registration failed - email already exists: ${email} from IP: ${clientIP}`);
        return NextResponse.json(
          { error: "A user with this email already exists" },
          { status: 409 }
        );
      }
      if (existingUser.apartmentNumber === apartmentNumber) {
        console.log(`[REGISTRATION] Registration failed - apartment already registered: ${apartmentNumber} from IP: ${clientIP}`);
        return NextResponse.json(
          { error: "This apartment number is already registered" },
          { status: 409 }
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        apartmentNumber,
        tower,
        phoneNumber: phoneNumber || null,
        role: "RESIDENT",
      },
    });

    console.log(`[REGISTRATION] SUCCESS: User created - ${email} (${firstName} ${lastName}, Apt: ${apartmentNumber}, Tower: ${tower}) from IP: ${clientIP}`);

    // Return success (don't include password)
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(
      { message: "User created successfully", user: userWithoutPassword },
      { status: 201 }
    );

  } catch (error) {
    console.error(`[REGISTRATION] ERROR: Registration failed from IP: ${clientIP}:`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}