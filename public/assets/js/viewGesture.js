const titleTag = document.querySelector("#gesture-page-title");
const titleReplace = document.querySelector("#letter-title");
const imgReplace = document.querySelector("#letter-image");

const urlParams = new URLSearchParams(window.location.search);
const gestureId = urlParams.get('gestureId');
window.onload = (event) => {
    console.log("window loaded")
    // Use this to retain user state between html pages
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        console.log('Logged in: ' + user.displayName);
        const googleUserId = user.uid;
        setUpUI(user);
        
        document.querySelector("#name").innerHTML = user.displayName;
      console.log("name stuff")
      document.querySelector("#email").innerHTML = user.email;
        } else {
            setUpUI();
        // If not logged in, navigate back to login page.
        //   
        };
    });
};
function fetchDataFromTopicID() {
    if (gestureId) {
        const topicsRef = firebase.database().ref(`gestures/${gestureId}`);
        topicsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            titleReplace.innerHTML = "Letter: " + data.title;
            imgReplace.innerHTML+= `<img src=${data.src} class="img-fluid" alt=""></img>`
            // renderModules(data.modules)
            
        });
    }
}

window.addEventListener("DOMContentLoaded", function (ev) {
    console.log("DOMContentLoaded event");
    fetchDataFromTopicID()
});

function saveTopic(btn) {
    var useriddd = "";
    const notesRef2 = firebase.database().ref(`users/`);
    notesRef2.on("value", snapshot => {
        console.log("notesref in users called")
        const data2 = snapshot.val();
        for (const noteItem in data2) {
            console.log("started");
            const note = data2[noteItem];
            console.log(noteItem);
            if (document.querySelector("#name").innerHTML === note.name) {
                found = true;
                useriddd=noteItem;
                console.log("found");
                break;
            }
        }
    });
    console.log("hello" +useriddd)
    const notesRef3 = firebase.database().ref(`gestures/`);

    notesRef3.on("value", snapshot => {
        console.log("savetopics value called")
        const data2 = snapshot.val();
        const note = data2[btn.id];
        console.log(btn.id)
        console.log(note)
        console.log("bob" + useriddd);
        if(useriddd!=undefined){
            firebase.database().ref(`users/${useriddd}/completedGestures/`).push({
                namey: note.title,
                image: note.src
            
            })
        }
        
    });
    
    
}

const logout = () =>{
    console.log("logout method called")
    firebase.auth().signOut().then(() => {
        window.location('index.html')
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
    });
};