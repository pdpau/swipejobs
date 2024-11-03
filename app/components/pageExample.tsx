"use client";
import Image from "next/image";

import { supabase } from '../../lib/supabaseClient';
import { useState } from 'react';


export default function Home() {
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);

        // Consulta para obtener todos los datos de la tabla 'users'
        const { data, error } = await supabase
            .from('users')  // Reemplaza 'users' por el nombre de tu tabla si es diferente
            .select('*');

        setLoading(false);

        if (error) {
            console.error('Error fetching users:', error);
        } else {
            // console.log('Users:', data); // Muestra los datos en la consola
        }
    };
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Supabase Users</h1>
            <button onClick={fetchUsers} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Users'}
            </button>
        </div>
    );
}
