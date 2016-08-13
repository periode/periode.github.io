var info;


document.addEventListener('DOMContentLoaded', init);


function init(){
  info = document.getElementById("info-content");
  console.log(info);
}

function toggleInfo(){
  // info.style.display = "block";
  if(info.style.opacity == 0)
    info.style.opacity = 1;
  else
    info.style.opacity = 0;
}
