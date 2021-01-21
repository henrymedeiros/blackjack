

window.onload = function () {
  // SETTINGS BUTTON
  let user = {
    username:"Player Name", 
    userDescription:"\"I'm a winner\"",
    userImgPATH:"images/user-image.jpg"
  };

  let usernameElement = document.getElementById("username");
  let userDescriptionElement = document.getElementById("user-description");
  let userImgElement = document.getElementById("user-img");

  usernameElement.innerHTML = user.username;
  userDescriptionElement.innerHTML = user.userDescription;
  userImgElement.src = user.userImgPATH;
  

  let settingBtn = document.getElementById("setting-btn");
  let editInfo = document.getElementById("edit-info");
  let closeBtn = document.getElementById("close-btn");

  let userInfoBtn = document.getElementById("user-info");


  
  function toggleSideBar() {
    editInfo.classList.toggle("show-edit-info");
  }
  settingBtn.onclick = function () {
    toggleSideBar();
  };
  closeBtn.onclick = function () {
    toggleSideBar();
  };

  // HOW TO PLAY BUTTON
  let howToPlayBtn = document.getElementById("how-to-play");
  let bgHowToPlay = document.getElementById("bg-how-to-play");

  function createDarkerBg() {
    bgHowToPlay.classList.toggle("show-bg-how-to-play");
  }
  howToPlayBtn.onclick = function () {
    createDarkerBg();
  };
  bgHowToPlay.onclick = function () {
    createDarkerBg();
  };
};
