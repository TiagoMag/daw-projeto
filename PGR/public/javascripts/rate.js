function rate(val,recursoID,userId) {
    axios.post('http://localhost:7777/recurso/vote', {
        "recursoId": recursoID ,
        "userId":userId,
        "rate": val ,
        "flag":"1"})
    .then(response => { 
    const addedUser = response.data;
    console.log(`POST: user is added`);// append to DOM
    })
    .catch(error => console.error(error));
}