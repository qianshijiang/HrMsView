import Vue from 'vue'
Vue.filter("formatDate", formatDate);
Vue.prototype.formatDate = formatDate;
function formatDate(value) {
  var date = new Date(value);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day;
}
Vue.filter("formatDateTime", function formatDateTime(value) {
  var date = new Date(value);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  let secounds = date.getSeconds();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }if(hours<10){
    hours = "0" + hours;
  }
  if(minutes<10){
    minutes = "0" + minutes;
  }if(secounds<10){
    secounds = "0" + secounds;
  }
  return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + secounds;
});

