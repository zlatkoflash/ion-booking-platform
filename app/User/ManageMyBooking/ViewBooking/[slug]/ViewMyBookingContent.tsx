'use client';

import { useAuth } from "@/app/User/AuthProvider";
import { UserLoginForm } from "@/app/User/content/LoginForm";
import { BookingSingleItemProvider } from "./BookingProvider";
import Link from "next/link";
import { ArrowLeft, Calendar, CheckCircle, Download, Mail, MapPin, Users } from "lucide-react";
import BokunBookingEditor from "./BookingEditor";

export default function ViewMyBookingContent({ bookingId }: { bookingId: string }) {


  const { user } = useAuth();

  if (!user) {
    return <UserLoginForm />;
  }

  console.log("user:", user);

  return (
    <BokunBookingEditor />
  );
}