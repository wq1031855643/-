window.onresize = resize;
function resize() {
    var winW = $(window).width();
    if (winW < 1190) {
        $('.z_header').addClass('z_header2').removeClass('z_header')
        $('.z_wrap_login').addClass('z_wrap_login2').removeClass('z_wrap_login')
    }
    if (winW >= 1190) {
        $('.z_heaMove').addClass('z_header').removeClass('z_header2')
        $('.z_wrap_move').addClass('z_wrap_login').removeClass('z_wrap_login2')
    }
}



{/* <ul>
  <li data-val="+86"><span class="num">+86</span>中国大陆</li>
  <li data-val="+1"><span class="num">+1</span>美国</li>
  <li data-val="+852"><span class="num">+852</span>香港</li>
  <li data-val="+81"><span class="num">+81</span>日本</li>
  <li data-val="+886"><span class="num">+886</span>台湾</li>
  <li data-val="+44"><span class="num">+44</span>英国</li>
  <li data-val="+82"><span class="num">+82</span>韩国</li>
  <li data-val="+33"><span class="num">+33</span>法国</li>
  <li data-val="+7"><span class="num">+7</span>俄罗斯</li>
  <li data-val="+39"><span class="num">+39</span>意大利</li>
  <li data-val="+65"><span class="num">+65</span>新加坡</li>
  <li data-val="+63"><span class="num">+63</span>菲律宾</li>
  <li data-val="+60"><span class="num">+60</span>马来西亚</li>
  <li data-val="+64"><span class="num">+64</span>新西兰</li>
  <li data-val="+34"><span class="num">+34</span>西班牙</li>
  <li data-val="+95"><span class="num">+95</span>缅甸</li>
  <li data-val="+230"><span class="num">+230</span>毛里求斯</li>
  <li data-val="+263"><span class="num">+263</span>津巴布韦</li>
  <li data-val="+20"><span class="num">+20</span>埃及</li>
  <li data-val="+92"><span class="num">+92</span>巴基斯坦</li>
  <li data-val="+880"><span class="num">+880</span>孟加拉国</li>
</ul> */}