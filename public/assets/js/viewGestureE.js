const titleTag = document.querySelector("#gesture-page-title");
const titleReplace = document.querySelector("#emer-title");
const imgReplace = document.querySelector("#emer-image");

const urlParams = new URLSearchParams(window.location.search);
const gestureId = urlParams.get('gestureId');

function fetchDataFromTopicID() {
    if (gestureId) {
        const topicsRef = firebase.database().ref(`gestures2/${gestureId}`);
        topicsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            titleReplace.innerHTML = "Sign: " + data.title;
            imgReplace.innerHTML+= `<iframe width="100%" height="100%" src=${data.src} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        });
    }
}

window.addEventListener("DOMContentLoaded", function (ev) {
    console.log("DOMContentLoaded event");
    fetchDataFromTopicID()
});

