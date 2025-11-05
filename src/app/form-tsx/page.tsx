"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";    

export default function FormTSX() {
    const router = useRouter();

    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        nama: "",
        email: "",
        password: "",
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = { nama: "", email: "", password: "" };
        let isValid = true;

        if (!nama.trim()) {
            newErrors.nama = "Nama wajib diisi.";
            isValid = false;
        }

        else if (!/^[A-Za-z\s]+$/.test(nama)) {
            newErrors.nama = "Nama tidak boleh mengandung angka.";
            isValid = false;
        }

        if (!email.trim()) {
            newErrors.email = "Email wajib diisi.";
            isValid = false;
        }
        else if (!email.includes("@")) {
            newErrors.email = "Alamat email harus mengandung '@'.";
            isValid = false;
        }

        if (!password.trim()) {
            newErrors.password = "Password wajib diisi.";
            isValid = false;
        }

        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/.test(password))
        {
            newErrors.password = "Password harus mengandung huruf besar, huruf kecil, angka, dan simbol.";
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            // Simpan data ke localStorage
            const data = { nama, email, password };
            localStorage.setItem("hasilRegistrasi", JSON.stringify(data));

            // Redirect ke halaman hasil registrasi
            router.push("/HasilRegistrasi");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-100 to-blue-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
                <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
                    Form Registrasi (TSX)
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    <div>
                        <label className="block text-gray-700 mb-1">Nama Lengkap</label>
                        <input
                            type="text"
                            placeholder="Masukkan nama lengkap"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400
                            ${
                                errors.nama
                                ? "border-red-500 bg-red-50 focus:ring-red-300"
                                : "border-gray-300 focus:ring-purple-400"
                            }`}
                            required
                        />
                        {errors.nama && (
                            <p className="text-red-500 text-sm mt-1">{errors.nama}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Masukkan email aktif"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400
                                ${
                                errors.email
                                    ? "border-red-500 bg-red-50 focus:ring-red-300"
                                : "border-gray-300 focus:ring-purple-400"
                                
                                }`}
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Masukkan password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400
                            ${ 
                                errors.password
                                ? "border-red-500 bg-red-50 focus:ring-red-300"
                                : "border-gray-300 focus:ring-purple-400"
                            }`}
                            required
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition"
                    >
                        Daftar Sekarang
                    </button>
                </form>
            </div>
        </div>
    );
}
