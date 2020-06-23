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


const login = () =>{
    const email = document.querySelector(".email").value
    const password = document.querySelector(".password").value
    const promis = firebase.auth().signInWithEmailAndPassword(email,password)
    promis.then(()=>{
        console.log("connecté")
        document.location.pathname='admin/gestion'
    })
    promis.catch(e => alert("Erreur de connection : \n" + e.message.split(".")[0]))

}

const deco = () => {
    if (confirm("Déconnecter ?")) {
        firebase.auth().signOut();
        document.location.pathname='/admin'
    }
}