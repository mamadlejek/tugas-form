"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HasilRegistrasi() {
    const router = useRouter();
    const [data, setData] = useState<{ nama: string; email: string; password: string } | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem("hasilRegistrasi");
        if (storedData) {
            setTimeout(() => {
                setData(JSON.parse(storedData));
            }, 0);
        } else {
            setTimeout(() => {
                router.push("/");
            }, 0);
        }
    }, [router]);

    if (!data) return null;

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-100 to-blue-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px] text-center">
                <h2 className="text-2xl font-bold text-purple-700 mb-6">Hasil Registrasi</h2>

                <div className="text-left space-y-2 mb-6">
                    <p><strong>Nama Lengkap</strong><br />{data.nama}</p>
                    <p><strong>Email</strong><br />{data.email}</p>
                    <p><strong>Password</strong><br />{data.password}</p>
                </div>

                <button
                    onClick={() => router.push("/EditData")}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition"
                >
                    Edit Data
                </button>

                <button
                    onClick={() => {
                        localStorage.removeItem("hasilRegistrasi");
                        router.push("/");
                    }}
                    className="w-full mt-3 border border-gray-300 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                    Kembali ke Form Awal
                </button>
            </div>
        </div>
    );
}
