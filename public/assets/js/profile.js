var count = 0;
window.onload = (event) => {
    console.log("window loadeds")
    // Use this to retain user state between html pages.
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        console.log('Logged in: ' + user.displayName);
        const googleUserId = user.uid;
        setUpUI(user);
       
        document.querySelector("#name").innerHTML = user.displayName;
      console.log("name stuff")
      document.querySelector("#imagestuff").innerHTML= `<img alt="..." width="130" class="rounded mb-2 img-thumbnail" src=${user.photoURL}></img>`
      document.querySelector("#email").innerHTML = user.email;
       accessProfile(user.displayName);
       fetchProgress(user.displayName);
        } else {
            setUpUI();
        // If not logged in, navigate back to login page.
        //   
        };
    });
};
const logout = () =>{
    console.log("logout method called")
    firebase.auth().signOut().then(() => {
        window.location('index.html')
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
    });
};

function accessProfile(userName) {
    console.log("Access profile")
    var useriddd = "";
    const notesRef2 = firebase.database().ref(`users/`);
    notesRef2.on("value", snapshot => {
        console.log("notesref in users called")
        const data2 = snapshot.val();
        for (const noteItem in data2) {
            console.log("started");
            const note = data2[noteItem];
            console.log(noteItem);
            if (userName === note.name) {
                found = true;
                useriddd=noteItem;
                console.log("found");
                showstuff(useriddd);
                break;
                
            }
        }
    });
    
    
};
function showstuff(useriddd){
    console.log("hello" + useriddd)
    const notesRef3 = firebase.database().ref(`users/${useriddd}/completedGestures/`);

    notesRef3.on("value", snapshot => {
        console.log("savetopics value called")
        const data2 = snapshot.val();
        let cards = "";
        for (const noteItem in data2) {
            const note = data2[noteItem];
            // console.log(note.title)
            cards += `<div class="col-lg-6 mb-2 pr-lg-1"><img src="${note.image}" alt="" class="img-fluid rounded shadow-sm"></div>`
        }
        document.querySelector("#gestures").innerHTML = cards;
        
    });
}
function fetchProgress(userName){
    console.log("Access profile")
    var useriddd = "";
    const notesRef2 = firebase.database().ref(`users/`);
    notesRef2.on("value", snapshot => {
        console.log("notesref in users called")
        const data2 = snapshot.val();
        for (const noteItem in data2) {
            console.log("started");
            const note = data2[noteItem];
            console.log(noteItem);
            if (userName === note.name) {
                found = true;
                useriddd=noteItem;
                console.log("found");
                showstuff2(useriddd);
                break;
                
            }
        }
    });
}
function showstuff2(useriddd){

    console.log("hello" + useriddd)
    const notesRef3 = firebase.database().ref(`users/${useriddd}/completedGestures/`);

    notesRef3.on("value", snapshot => {
        console.log("savetopics 234234 value called")
        const data2 = snapshot.val();
        let cards = "";
        for (const noteItem in data2) {
            count++;
        }
        console.log(Math.round(count/44*100));

        document.querySelector("#bar").innerHTML = `<div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="${Math.round(count/44*100)}" aria-valuemin="0" aria-valuemax="100" style="width:${Math.round(count/44*100)}%">
                            ${Math.round(count/44*100)}%
                        </div>`;
        
    });
}

editButton.addEventListener("click", function() {
  console.log("edit button is being clicked")
  about.readOnly = false;
  about.style.backgroundColor = "#dddbdb";
} );

saveButton.addEventListener("click", function() {
  console.log("save button is being clicked")
  about.readOnly = true;
  about.style.backgroundColor = "white";
  const input = document.querySelector("#about").value;
} )