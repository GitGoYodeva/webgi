async function initViewer(viewer, container, webgiurl, webgicontainer){
  // Adding <webgi-model>
  const webgimodel = '<div id="webgi-canvas-container" style="height:${canvasHeight}px;"><webgi-viewer id="webgi-viewer" src="'+webgiurl+'" style="z-index: 1; width:100%; height:100%;display: block;"></webgi-viewer></div>'
 // Adding controls
  const control = document.createElement("div");
  control.classList.add("webgi-widget_container");
  control.innerHTML = `
  <style>
\t.webgi-widget_control .webgi-widget_button{
  padding: 0px;
  height: 44px;
  width: 44px;
  background: transparent;
  position: relative;
  border-color: transparent;
  cursor: pointer;
  border: unset;
}
.webgi-widget_control .webgi-widget_controls {
  display: flex;
  flex-direction: column;
  background: #fff;
  /* opacity: 0; */
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 999;
  transition: opacity 0.1s linear;
  border-color: rgba(18, 18, 18, 0.04);
  background: #fff;
}
.webgi-widget_control .icon {
  width: 16px;
  height: 16px;
  display: block;
  color: #0009;
  margin: auto;
}
.webgi-widget_control .webgi-widget_button:nth-child(1):after, 
.webgi-widget_control .webgi-widget_button:nth-child(2):after {
  position: absolute;
  content: "";
  border-bottom: 1px solid rgb(0 0 0 / 8%);
  width: 28px;
  bottom: 0px;
  right: 8px;
}
#webgi-canvas-container{
  position: relative;
}
#webgi-widget_bar {
  width: 1%;
  height: 10px;
  background-color: gray;
}
</style>
\t\t\t<div class="webgi-widget_control" >
<button  class="webgi-widget_button">
<svg class="webgi-widget_icon"><use xlink:path="#threed-icon-button-control" xlink:href="#threed-icon-button-control"></use></svg>
</button>
<div class="webgi-widget_controls">
<button id="webgi-widget_zoomIn"  class="webgi-widget_button">
\t<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-plus" fill="none" viewBox="0 0 10 10">
\t  <path fill-rule="evenodd" clip-rule="evenodd" d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z" fill="currentColor"/>
\t</svg>
</button>
<button id="webgi-widget_zoomOut" class="webgi-widget_button">
\t<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-minus" fill="none" viewBox="0 0 10 2">
\t  <path fill-rule="evenodd" clip-rule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z" fill="currentColor" />
\t</svg>
</button>
<button id="webgi-widget_fullscreenEnter" class="webgi-widget_button">
  \t<svg class="icon webgi-widget_icon" xmlns="http://www.w3.org/2000/svg" version="1.0" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
  \t  <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
  \t\t<path d="M650 4784 c-110 -29 -214 -126 -256 -237 -18 -49 -19 -83 -19 -697 l0 -645 23 -37 c31 -49 99 -82 154 -75 48 6 84 30 116 77 l22 33 0 617 c0 516 2 619 14 636 14 18 36 19 699 24 677 5 686 5 714 26 99 74 87 221 -23 274 -39 19 -62 20 -715 19 -556 0 -684 -3 -729 -15z"/>
  \t\t<path d="M4504 2106 c-77 -47 -74 -19 -74 -705 l0 -612 -25 -24 -24 -25 -669 0 -669 0 -34 -23 c-49 -32 -83 -105 -74 -157 8 -46 43 -93 89 -118 28 -15 89 -17 675 -20 369 -1 673 1 712 7 176 24 300 141 329 312 7 43 10 262 8 669 -3 552 -5 608 -20 637 -43 78 -148 106 -224 59z"/>
  \t  </g>
  \t</svg>
    </button>
    <button id="webgi-widget_fullscreenExit" style="display:none" class="webgi-widget_button">
\t<svg class="icon webgi-widget_icon" xmlns="http://www.w3.org/2000/svg" version="1.0" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
\t  <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
\t\t<path d="M3310 5048 c-33 -17 -51 -35 -68 -68 l-22 -45 2 -827 c3 -821 3 -827 24 -855 11 -15 36 -38 54 -50 l33 -23 837 0 837 0 33 23 c48 32 72 69 77 119 7 58 -23 118 -74 149 l-38 24 -732 3 -733 3 -2 732 -3 732 -24 34 c-26 36 -90 70 -131 71 -14 0 -46 -10 -70 -22z"/>
\t\t<path d="M80 1918 c-48 -33 -72 -70 -77 -120 -7 -58 23 -118 74 -149 l38 -24 732 -3 733 -3 2 -734 c3 -723 3 -734 24 -762 30 -42 101 -75 146 -70 55 7 104 42 127 91 21 43 21 49 19 869 -3 820 -3 826 -24 854 -11 15 -36 38 -54 51 l-33 22 -837 0 -837 0 -33 -22z"/>
\t  </g>
\t</svg>
</button>
</div>
\t\t\t  </div>
  
  `;
  webgicontainer.appendChild(webgimodel);
  container.appendChild(control);
  var fullscreenEnter = document.getElementById("webgi-widget_fullscreenEnter")
  var fullscreenExit = document.getElementById("webgi-widget_fullscreenExit")

  // Entering full-screen API
   fullscreenEnter.onclick = () => {
      viewer.getPlugin(FullScreenPlugin).enter(container);
//               canvas.parentElement.classList.add("fullscreen-canvas")
      fullscreenExit.style.display = "block"
      fullscreenEnter.style.display = "none"
    };
// Exit full-screen API
    fullscreenExit.onclick = () => {
      viewer.getPlugin(FullScreenPlugin).exit();
//               canvas.parentElement.classList.remove("fullscreen-canvas")
      fullscreenExit.style.display = "none"
      fullscreenEnter.style.display = "block"
    };
    // Escape Key press
       if (document.addEventListener){
      document.addEventListener("fullscreenchange", exitHandler, false);
      document.addEventListener("mozfullscreenchange", exitHandler, false);
      document.addEventListener("MSFullscreenChange", exitHandler, false);
      document.addEventListener("webkitfullscreenchange", exitHandler, false);
    }
    function exitHandler(){
      if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement){
//                 canvas.parentElement.classList.remove("fullscreen-canvas")
        fullscreenExit.style.display = "none"
        fullscreenEnter.style.display = "block"
      }
    }
       //             Zoom In
       document.getElementById("webgi-widget_zoomIn").onclick = () => {
          viewer.scene.activeCamera.controls.zoomIn(1);
        };
        //             Zoom Out
        document.getElementById("webgi-widget_zoomOut").onclick = () => {
          viewer.scene.activeCamera.controls.zoomOut(1);
        };




        const ProgressBar = document.getElementById("webgi-widget_progressbar");
        ProgressBar.style.display = "block";
        const elem = document.getElementById("webgi-widget_bar");
        elem.style.display = "block";

        function progressbar() {
          var i = 0;
          if (i == 0) {
            i = 1;
            var width = 1;
            var id = setInterval(frame, 10);
            function frame() {
              if (width >= 100) {
                clearInterval(id);
                i = 0;
              } else {
                width++;
                elem.style.width = width + "%";
              }
            }
          }
        }
        progressbar();
        setTimeout(function(){
          ProgressBar.style.display = "none";
        }, 1500);
  }

  

  function initIcon(wrapper){
    const icons = '<div id="webgi-widget_progressbar" style="display:none"><div id="progressState"></div><div id="webgi-widget_bar"></div></div><div class="model-initicon"><span class="media__poster-button" id="initCanvas"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-3d-model" fill="none" viewBox="0 0 18 21"><path d="M7.67998 20.629L1.28002 16.723C0.886205 16.4784 0.561675 16.1368 0.337572 15.731C0.113468 15.3251 -0.00274623 14.8686 -1.39464e-05 14.405V6.59497C-0.00238367 6.13167 0.113819 5.6755 0.33751 5.26978C0.561202 4.86405 0.884959 4.52227 1.278 4.27698L7.67796 0.377014C8.07524 0.131403 8.53292 0.000877102 8.99999 9.73346e-08C9.46678 -0.000129605 9.92446 0.129369 10.322 0.374024V0.374024L16.722 4.27399C17.1163 4.51985 17.4409 4.86287 17.6647 5.27014C17.8885 5.67742 18.0039 6.13529 18 6.59998V14.409C18.0026 14.8725 17.8864 15.3289 17.6625 15.7347C17.4386 16.1405 17.1145 16.4821 16.721 16.727L10.321 20.633C9.92264 20.8742 9.46565 21.0012 8.99999 21C8.53428 20.9998 8.07761 20.8714 7.67998 20.629V20.629ZM8.72398 2.078L2.32396 5.97803C2.22303 6.04453 2.14066 6.13551 2.08452 6.24255C2.02838 6.34959 2.00031 6.46919 2.00298 6.59003V14.4C2.00026 14.5205 2.02818 14.6396 2.08415 14.7463C2.14013 14.853 2.22233 14.9438 2.32298 15.01L7.99999 18.48V10.919C8.00113 10.5997 8.08851 10.2867 8.25292 10.0129C8.41732 9.73922 8.65267 9.51501 8.93401 9.36401L15.446 5.841L9.28001 2.08002C9.19614 2.02738 9.09901 1.99962 8.99999 2C8.90251 1.99972 8.8069 2.02674 8.72398 2.078V2.078Z" fill="currentColor"/></svg></span></div>';
    wrapper.insertAdjacentHTML('afterbegin', icons);

    
  }

  window.setupViewer = (viewerel, container)=>{
      if(!viewerel.viewer){
          viewerel.addEventListener('initialized', ()=>{
              initViewer(viewerel.viewer, container);
          })
      }else{
          initViewer(viewerel.viewer, container);
      }
  }

  window.setupIcon = (wrapperel)=>{
          initIcon(wrapperel);
  }
  console.log('dfdfdf')
