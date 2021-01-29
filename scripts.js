

window.onload = function () {
  // SETTINGS BUTTON
  let user = {
    username:"Guest", 
    userDescription:"\"I'm a winner\"",
  };

  let usernameElement = document.getElementById("username-element");
  let userDescriptionElement = document.getElementById("user-description-element");
  let userImgElement = document.getElementById("user-img");

  let usernameInput = document.getElementById("username-input");
  let userDescriptionInput = document.getElementById("user-description-input");
  
  userImgElement.style.background = "url(assets/images/user-image.jpg)"
  userImgElement.style.backgroundSize = "contain"
  
  function updateUser(){
    usernameElement.textContent = user.username;
    userDescriptionElement.textContent = user.userDescription;
  }

  updateUser();

  
  let settingBtn = document.getElementById("setting-btn");
  let editInfo = document.getElementById("edit-info");
  let closeBtn = document.getElementById("close-btn");

  let userInfoBtn = document.getElementById("user-info");

  // GETTING USER INFO 
  userInfoBtn.onclick = function(){
    console.log(usernameElement.value);
    user.username = usernameInput.value;
    user.userDescription = userDescriptionInput.value;
    updateUser();
    
    toggleSideBar();
  }
  
	



  // SIDE BAR
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
