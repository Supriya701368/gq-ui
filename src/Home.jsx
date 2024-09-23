import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_STUDENTS } from './graphql/queries/GET_STUDENTS';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale);

const Home = () => {
    const [getStudents, { loading, error, data }] = useLazyQuery(GET_STUDENTS);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (data) {
            // Group users by the first letter of their names
            const letterCounts = {};
            data.getStudents.forEach(({ name }) => {
                const firstLetter = name[0].toUpperCase();
                letterCounts[firstLetter] = (letterCounts[firstLetter] || 0) + 1;
            });

            // Prepare data for the chart
            const labels = Object.keys(letterCounts).sort();
            const counts = labels.map((letter) => letterCounts[letter]);

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Number of Users',
                        data: counts,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [data]);

    const handleClick = () => {
        getStudents();
    };

    return (
        <div>
            <button className='btn btn-primary mb-3 mt-3' onClick={handleClick}>
                Get Users
            </button>

            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}

            {chartData && (
                <div style={{ width: '600px', height: '400px', margin: '0 auto' }}>
                    <Bar
                        data={chartData}
                        options={{
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Home;
 