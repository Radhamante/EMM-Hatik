const firebaseConfig = {
    apiKey: "AIzaSyBbmu3PyQ-zItx5WHFGiCp1iv13gA-Qlw4",
    authDomain: "lab-hatik.firebaseapp.com",
    databaseURL: "https://lab-hatik.firebaseio.com",
    projectId: "lab-hatik",
    storageBucket: "lab-hatik.appspot.com",
    messagingSenderId: "460265411655",
    appId: "1:460265411655:web:ec7b550bc238c52bf40d62"
};
firebase.initializeApp(firebaseConfig);

const fb = firebase.firestore();

const listeTournée = document.querySelector(".listeTournée")

fb.collection("concert").onSnapshot(querySnapshot =>{
    let liste = ""
    querySnapshot.forEach(doc => {
        let date = doc.data().date.split("-").reverse()
        date = `${date[0]}/${date[1]}<br>${date[2]}`
        liste += `
        <div class="oneEvent">
            <span class="date">${date}</span>
            <div class="lieu">
                <span class="ville">${doc.data().ville}</span>
                <span class="batiment">${doc.data().batiment}</span>
            </div>
            <span class="pays">${doc.data().pays}</span>
            <img class="sup lazy-load" info="${doc.id}" src="../../assets/Page\ Admininstration/trash-alt-regular.svg" alt="">
        </div>
        `
    })
    listeTournée.innerHTML = liste
    const sup = document.querySelectorAll(".sup")
    sup.forEach( el => {
        el.addEventListener("click" , e =>{
            fb.collection("concert").doc(e.target.attributes.info.value).delete()
        })
    })
})

const test = () => {
    const date = document.querySelector(".inputDate").value;
    const ville = document.querySelector(".inputVille").value;
    const batiment = document.querySelector(".inputBatiment").value;
    const pays = document.querySelector(".inputPays").value;

    fb.collection("concert").add({date : date,ville : ville, batiment : batiment, pays: pays})
    .catch((error)=>{
        alert("Veuillez vous connecter")
        console.log(error)
    })
}

const deco = () => {
    if (confirm("Déconnecter ?")) {
        firebase.auth().signOut();
        document.location.pathname='/admin'
    }
}

let sup = document.querySelectorAll(".sup")

console.log(sup)

