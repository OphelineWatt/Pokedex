import API from "./api";

export const createTeam = (data) => API.post('/teams',data ,{
        headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const addPokemonToTeam = (idTeams, data) => API.post(`/teams/${idTeams}/pokemon`,data,{
            headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const chooseTeams = () => API.get(`/chooseTeams`,{
            headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const userTeams = () => API.get(`/userTeams`,{
            headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});
