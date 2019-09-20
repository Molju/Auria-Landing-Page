let anchors = document.querySelectorAll('.anchor:not(#download)');
let nav = document.querySelector('header nav');
let active_menu_item = undefined;
let header ={
  header: document.querySelector('header'),
  scrolled: false
};

//функция для отслеживания положения на странице и подсвечивания нужного пункта меню
function find_current_active_menu_item(offset) {
  let new_active_id = undefined;
  for(let i=0;i<anchors.length;i++) {
    let item_top = anchors[i].getBoundingClientRect().top;
    if(item_top >= 0 && item_top <= offset) {
      new_active_id = anchors[i].id;
      break;
    }
  }
  if(new_active_id !== undefined) {
    if(active_menu_item !== undefined) {
      active_menu_item.classList.toggle('active');
    }
    active_menu_item = document.querySelector(`.nav-item[href="#${new_active_id}"]`);
    active_menu_item.classList.toggle('active');
  }
}
window.onload = () => {
  //загрузка слайдера
  $(".slider").twentytwenty({});
  //определяем текущий активный пункт меню
  find_current_active_menu_item(150);
};
window.onscroll = event => {
  //подсвечивание пунктов меню при прокрутке
  find_current_active_menu_item(150);
  //добавление фона header при прокрутке
  if(pageYOffset >= 10 && header.scrolled == false) {
    header.header.classList.toggle('scrolled');
    header.scrolled = true;
  }
  else if(pageYOffset < 10 && header.scrolled == true) {
    header.header.classList.toggle('scrolled');
    header.scrolled = false;
  }
};

//плавная прокрутка к якорю
$("a.nav-item,a[href='#download']").click(function() {
      $("html, body").animate({
         scrollTop: $($(this).attr("href")).offset().top + "px"
      }, {
         duration: 500,
         easing: "swing"
      });
      //закрывает бургер меню, если в нем нажали на ссылку
      nav.classList.remove('active');
   });
//открытие/закрытие бургера
for(let elem of document.querySelectorAll('.burger-icon,nav .close-button')) {
  elem.onclick = () => nav.classList.toggle('active');
}
