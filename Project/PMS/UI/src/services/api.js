const BASE_URL = 'http://localhost:5000';

export const getPayroll = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/payroll`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch payrolls');
    }

    return res.json();
};

export const createPayroll = async (data) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/payroll`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Failed to create payroll');
    }

    return res.json();
};
