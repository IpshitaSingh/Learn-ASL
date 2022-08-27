console.log("gestures.js is connected")

window.onload = (event) => {
    console.log("window loaded part 2")
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      const googleUserId = user.uid;
      setUpUI(user);
      document.querySelector("#name").innerHTML = user.displayName;
      console.log("name stuff")
      document.querySelector("#imagestuff").innerHTML= `<img alt="..." width="130" class="rounded mb-2 img-thumbnail" src=${user.photoURL}></img>`
      document.querySelector("#email").innerHTML = user.email;
    } else {
        setUpUI();
      // If not logged in, navigate back to login page.
    //   
    };
  });
};
//bottom is login/logout stuff
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
loggedInLinks.forEach(item=>item.style.display = 'block');
loggedOutLinks.forEach(item=>item.style.display = 'none');
const setUpUI = (user) =>{
    if(user){
        loggedInLinks.forEach(item=>item.style.display = 'block');
        loggedOutLinks.forEach(item=>item.style.display = 'none');
    }
    else{
        loggedOutLinks.forEach(item=>item.style.display = 'block');
        loggedInLinks.forEach(item=>item.style.display = 'none');
    }
}
