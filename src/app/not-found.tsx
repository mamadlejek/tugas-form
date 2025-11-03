"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Halaman404Kustom = () => {

    const router = useRouter();

    useEffect(() => {

        const timer = setTimeout(() => {

            router.push('/');
        }, 5000);

        return () => clearTimeout(timer);

    }, [router]);
    return (
        <div>

            <h1>404 - Page Not Found</h1>

            <p>Tenang, anda akan kembali ke tampilan utama dalam 5 detik.</p>
        </div>
    );
};

export default Halaman404Kustom;