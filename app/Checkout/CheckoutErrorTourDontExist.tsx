import Link from "next/link";

export default function CheckoutErrorTourDontExist() {
  return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Tour Not Found</h1>
      <Link href={"/Tours"}
        // onClick={() => window.location.href = '/'}
        className="text-blue-600 hover:text-blue-700 cursor-pointer"
      >
        Back to Tours
      </Link>
    </div>
  </div>;
}