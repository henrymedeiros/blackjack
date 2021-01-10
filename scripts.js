// BUTTONS BEHAVIOR

window.onload = function () {
  // END BET BUTTONS


  // SETTINGS BUTTON
  let settingBtn = document.getElementById("setting-btn");
  let editInfo = document.getElementById("edit-info");
  let closeBtn = document.getElementById("close-btn");

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
