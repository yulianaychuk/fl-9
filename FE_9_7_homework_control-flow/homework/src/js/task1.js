const userName = prompt('Login:');

if (userName === 'User'){
    const pass = prompt('Password:');

    if (pass === 'SuperUser'){
    alert(new Date().getHours() < 20 ? 'Good evening!' : 'Good day!');
    }else if(!pass){
    alert('Canceled.');
    }else{
    alert('Wrong password');
    }
}else {

    if (!userName){
        alert('Canceled.');
    }else if(userName.length < 4){
        alert(`I don't know any users having name length less than 4 symbols`);
    }else{
        alert(`I don’t know you`);    
    }
}