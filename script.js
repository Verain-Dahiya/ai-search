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
}
async function openAI() {

  let q = document.getElementById("searchInput").value;

  let chat = document.getElementById("chatBox");

  if(q.trim() === ""){
    chat.innerHTML = "Type something first";
    return;
  }

  chat.innerHTML = "Thinking...";

  try {

    let response = await fetch(
      "https://api.affiliateplus.xyz/api/chatbot?message="
      + encodeURIComponent(q)
      + "&botname=AI&owner=You"
    );

    let data = await response.json();

    chat.innerHTML =
      "<div style='padding:20px;border-radius:20px;background:#222;color:white;'>"
      + data.message +
      "</div>";

  } catch(err) {

    chat.innerHTML =
      "<div style='color:red;'>AI server error or internet issue</div>";

  }
}
