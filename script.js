function doSearch(){
  let q=document.getElementById("searchInput").value;

  window.location.href=
  "https://www.google.com/search?q="+encodeURIComponent(q);
}

function imageSearch(){
  let q=document.getElementById("searchInput").value;

  window.location.href=
  "https://www.google.com/images?q="+encodeURIComponent(q);
}

function toggleDark(){
  document.body.classList.toggle("dark");
}

function login(){
  let user=prompt("Enter Username");

  if(user){
    alert("Welcome "+user);
    localStorage.setItem("user",user);
  }
}

function voiceSearch(){

  let speech=
  new webkitSpeechRecognition();

  speech.lang="en-US";

  speech.onresult=function(event){

    document.getElementById("searchInput").value=
    event.results[0][0].transcript;
  };

  speech.start();
}

async function openAI(){

  let q=document.getElementById("searchInput").value;

  let chat=document.getElementById("chatBox");

  chat.innerHTML="Thinking...";

  try{

    let res=await fetch(
    "https://api.affiliateplus.xyz/api/chatbot?message="+q+"&owner=You&botname=AI"
    );

    let data=await res.json();

    chat.innerHTML=
    "<h3>AI:</h3>"+data.message;

  }catch(e){

    chat.innerHTML="Error loading AI";
  }
}

