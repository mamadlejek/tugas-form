"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditData() {
    const router = useRouter();
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ nama: "", email: "", password: "" });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            const storedData = localStorage.getItem("hasilRegistrasi");
            if (storedData) {
                const parsed = JSON.parse(storedData);
                setNama(parsed.nama || "");
                setEmail(parsed.email || "");
                setPassword(parsed.password || "");
                setIsLoading(false);
            } else {
                router.push("/");
            }
        }, 0);

        return () => clearTimeout(timer);
    }, [router]);

    const handleSave = () => {
        const newErrors = { nama: "", email: "", password: "" };
        let isValid = true;
 
        // Validasi Nama
        if (!nama.trim()) {
            newErrors.nama = "Nama wajib diisi.";
            isValid = false;
        } else if (/\d/.test(nama)) {
            newErrors.nama = "Nama tidak boleh mengandung angka.";
            isValid = false;
        }

        // Validasi Email
        if (!email.trim()) {
            newErrors.email = "Email wajib diisi.";
            isValid = false;
        } else if (!email.includes("@")) {
            newErrors.email = "Alamat email harus mengandung '@'.";
            isValid = false;
        }

        // Validasi Password
        if (!password.trim()) {
            newErrors.password = "Password wajib diisi.";
            isValid = false;
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/.test(password)) {
            newErrors.password = "Password harus kombinasi huruf besar, kecil, angka, dan simbol.";
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            const updatedData = { nama, email, password };
            localStorage.setItem("hasilRegistrasi", JSON.stringify(updatedData));
            alert("Data berhasil diperbarui!");
            router.push("/HasilRegistrasi");
        }
    };

    const handleCancel = () => {
        router.push("/HasilRegistrasi");
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-100 to-blue-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px] text-center">
                <h2 className="text-2xl font-bold text-purple-700 mb-6">Hasil Registrasi</h2>

                <div className="text-left space-y-4 mb-6">
                    <div>
                        <label className="block font-semibold text-gray-700">Nama Lengkap</label>
                        <input
                            type="text"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
                        />
                        {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition"
                >
                    Simpan Perubahan
                </button>

                <button
                    onClick={handleCancel}
                    className="w-full mt-3 border border-gray-300 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                    Batal
                </button>
            </div>
        </div>
    );
}
