import axios from 'axios';

(async function(){
  try{
    const res = await axios.post('http://localhost:5000/api/signup',{username:'script_user',email:'script_user@test.local',password:'secret123',role:'parents'},{timeout:5000});
    console.log('STATUS',res.status);
    console.log('DATA',res.data);
  }catch(e){
    console.error('AXIOS ERROR MESSAGE:', e.message);
    if(e.response){
      console.error('RESPONSE STATUS:', e.response.status);
      console.error('RESPONSE DATA:');
      console.error(e.response.data);
    } else if (e.request) {
      console.error('NO RESPONSE RECEIVED, REQUEST WAS MADE');
      console.error(e.request);
    } else {
      console.error('REQUEST SETUP ERROR', e);
    }
  }
})();
