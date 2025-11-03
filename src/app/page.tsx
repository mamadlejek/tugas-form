"use client";

import Link from "next/link";

export default function Home() {

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-6">
            <h1 className="text-3xl font-bold">pilih tipe form</h1>

            <div className="space-x-6">
                
                <Link href="/form-tsx">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">form .tsx</button>
                </Link>

                <Link href="/form-jsx">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">form .jsx</button>
                </Link>

            </div>
        </div>
    );
}
