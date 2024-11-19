import React, { useState, useEffect } from 'react';

// Define interfaces for user and nested objects
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        city: string;
    };
    phone: string;
    website: string;
    company: {
        name: string;
    };
}

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const UserList: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Function for fetching users from the API
    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
            setIsLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            setIsLoading(false);
        }
    };

    // Call fetchUsers when the component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSelectUser = (user: User) => {
        setSelectedUser(user);
    };

    // Render the component
    return (
        <div className="p-4">
            {isLoading && <div className="text-center">Loading...</div>}
            
            {error && (
                <div className="text-red-500 text-center mb-4">
                    {error}
                </div>
            )}
            
            {!isLoading && !error && (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Username</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">City</th>
                            <th className="border p-2">Phone</th>
                            <th className="border p-2">Website</th>
                            <th className="border p-2">Company Name</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr 
                                key={user.id} 
                                className={`hover:bg-gray-100 ${selectedUser?.id === user.id ? 'bg-blue-100' : ''}`}
                            >
                                <td className="border p-2">{user.id}</td>
                                <td className="border p-2">{user.name}</td>
                                <td className="border p-2">{user.username}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">{user.address.city}</td>
                                <td className="border p-2">{user.phone}</td>
                                <td className="border p-2">{user.website}</td>
                                <td className="border p-2">{user.company.name}</td>
                                <td className="border p-2">
                                    <button 
                                        onClick={() => handleSelectUser(user)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    >
                                        Select
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedUser && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <h2 className="text-xl font-bold mb-2">Selected User Details</h2>
                    <p><strong>Name:</strong> {selectedUser.name}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Phone:</strong> {selectedUser.phone}</p>
                </div>
            )}
        </div>
    );
};

export default UserList;
