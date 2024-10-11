$(function(){
      var circleType = null;
      var currentRadius = 250;
      function updateText() {
          var tt = $("#cake_letter").val().replace(/\n/g, "<br>");
          if (tt != ''){
             $("#texts").html(tt);
          }
      }

      function setPosition(position) {
          $(".round").removeClass().addClass("round " + position);
      }

      function applyCircle(radius, direction = 1) {
          if (circleType) circleType.destroy(); // 기존 CircleType 제거
          updateText();
          circleType = new CircleType(document.getElementById('texts'));
          circleType.radius(radius).dir(direction);
      }

      function resetCircle() {
          if (circleType) {
              circleType.destroy(); // CircleType 효과 제거
              circleType = null;
          }
      }
      
      function t_size(size){
         var textElement = document.getElementById('texts');
         var currentSize = parseInt(window.getComputedStyle(textElement).fontSize);      
         
         if (size === 'up') {
            currentSize = Math.min(currentSize + 1, 60);
         } else if (size === 'down') {
            currentSize = Math.max(currentSize - 1, 12);
         }

         textElement.style.fontSize = currentSize + 'px'; // Update font size
         var currentSizePt = (currentSize * 72 / 96).toFixed(3);
         $(".textsize").text(currentSizePt+'pt');
      }

      function adjustRadius(value) {
          currentRadius = Math.max(100, Math.min(currentRadius + value, 500)); // Limit between 100 and 500
          applyCircle(currentRadius, currentDirection); // Apply circle with current direction
      }

      $(document).ready(function(){    
         $("#t_input, #t_top, #t_mid, #t_bottom, #t_left, #t_right, #t_over, #t_under, #t_reset, #border_toggle, #radius_up, #radius_down, #t_up, #t_down").on("click", function(event) {
            event.preventDefault();  // Prevent default button action
         });
         $("#t_input").on("click", updateText);

         $("#t_top").on("click", function() {
             setPosition("top");
         });
         $("#t_mid").on("click", function() {
             setPosition(""); // 기본 위치로 설정
         });
         $("#t_bottom").on("click", function() {
             setPosition("bottom");
         });

         $("#t_left").on("click", function() {
             setPosition("left");
         });

         $("#t_right").on("click", function() {
             setPosition("right");
         });

         $("#t_over").on("click", function() {
             //applyCircle(250,1);
             currentDirection = 1; // Upwards
             applyCircle(currentRadius, currentDirection);
         });

         $("#t_under").on("click", function() {
             //applyCircle(250, -1);
             currentDirection = -1; // Downwards
             applyCircle(currentRadius, currentDirection);
         });
         $("#t_up").on("click", function() {
             t_size("up");
         });
         $("#t_down").on("click", function() {
             t_size("down");
         });
         $("#t_reset").on("click", resetCircle);

         $("#border_toggle").on("click",function(){
            $(".round").toggleClass("off");
         });

         $("#radius_up").on("click", function() {
             adjustRadius(10); // Increase radius by 10
         });

         $("#radius_down").on("click", function() {
             adjustRadius(-10); // Decrease radius by 10
         });

         $('input[name="cake"]').change(function() {
            // 선택된 라디오 버튼의 값을 가져옴
            var selectedValue = $('input[name="cake"]:checked').val();

            // 선택된 값에 따라 다른 동작 실행
            if (selectedValue === '1') {
               $(".round").css({"width" : "378px","height" : "378px"});
            } else if (selectedValue === '2') {
               $(".round").css({"width" : "453px","height" : "453px"});               
            } else if (selectedValue === '3') {
               $(".round").css({"width" : "567px","height" : "567px"});               
            } else if (selectedValue === '4') {
               $(".round").css({"width" : "680px","height" : "680px"});               
            }
         });
      });
});