import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_STUDENTS } from './graphql/queries/GET_STUDENTS';

const Students = () => {
    const { loading, data, error } = useQuery(GET_STUDENTS);
    const [searchQuery, setSearchQuery] = useState('');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    // Function to handle search input changes
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter the students based on the search query (name, roll number, or location)
    const filteredStudents = data?.getStudents?.filter((student) => {
        const { name, rno, loc } = student;
        const query = searchQuery.toLowerCase();
        
        return (
            name.toLowerCase().includes(query) || 
            rno.toString().includes(query) || 
            loc.toLowerCase().includes(query)
        );
    });

    return (
        <div className='container'>
            <h5 className='text-center my-3'>Student List</h5>

            {/* Search Bar */}
            <div className="row mb-3">
                <div className="col-sm-6 offset-sm-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search by Name, Roll No, or Location..." 
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {/* Student Table */}
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents?.length > 0 ? (
                        filteredStudents.map(({ _id, name, rno, loc }) => (
                            <tr key={_id}>
                                <td>{_id}</td>
                                <td>{name}</td>
                                <td>{rno}</td>
                                <td>{loc}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No students found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Students;
