import {createContext, useContext, useState, useEffect} from 'react';

const JobContext = createContext();

function JobProvider({children}){
    const [user, setUser] = useState(null);

    return (
        <JobContext.Provider value={{user, setUser}}>
            {children}
        </JobContext.Provider>
    )
}

function useJob(){
    return useContext(JobContext);
}

export default JobProvider;
export {useJob};
