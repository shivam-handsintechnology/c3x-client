import { useState, useEffect } from 'react';
const useDataFetch = (mutationHook, payload, initialFilterDate) => {
    const [filteredData, setFilteredData] = useState([]);
    const [errors, setErrors] = useState({ loading: false, error: false, message: '' });
    const [mutate] = mutationHook();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setErrors({ loading: true, error: false });
                const res = await mutate(payload).unwrap();

                // //console.log({ res });

                setErrors({ loading: false, error: false });

                if (res.data.AwbList) {
                    setFilteredData(res.data.AwbList);
                } else {
                    setFilteredData([]);
                }
            } catch (error) {
                console.error(error);
                setErrors({
                    loading: false,
                    error: true,
                    message: error.data ? error.data.message : 'An error occurred',
                });
                setFilteredData([]);
            }
        };

        fetchData();
        // You might want to add dependencies to the useEffect if needed
    }, [...initialFilterDate, mutate]);

    return { filteredData, errors };
};

export default useDataFetch;
