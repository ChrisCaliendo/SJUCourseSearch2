
const appState = {
    username : "Player",
    current_model : {}
}

let sort_type = ""
api = "https://fourthproject.herokuapp.com/api";


document.addEventListener('DOMContentLoaded', function() {

  //By default all courses are displayed
  render_view("#searchAll", "#search_method");

  document.querySelector("#search_button").onclick = function() {

      let search_data = "";

      textInput = document.querySelector("#textInput");
      if (textInput != null) {
          search_data = search_data + "/" + textInput.value;
      }

      radioInput = document.querySelector("#radioInput");
      if (radioInput != null) {
          levelOption = document.querySelector('input[name="levelOption"]:checked').value;
          search_data = search_data + "/" + levelOption;
      }

      displayCourses(sort_type, search_data);
      return false;
  }
});

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#search_method_selector').onclick = function() {
  setTimeout(
    document.querySelector('input[name="search_method_option"]:checked').onclick = function() {
      sort_type = document.querySelector('input[name="search_method_option"]:checked').value

      switch(sort_type) {
        case "all":
          render_view("#searchAll", "#search_method");
          break;
        case "course_code":
          render_view("#codeSearch", "#search_method");
          break;
        case "title":
          render_view("#titleSearch", "#search_method");
          break;
        case "instructor":
          render_view("#instructorSearch", "#search_method");
          break;
        case "level":
          render_view("#levelSearch", "#search_method");
          break;
        case "name_and_level":
          render_view("#combinedSearch", "#search_method");
          break;
        default:
          render_view("#searchAll", "#search_method");
      }
    }, 100)}
});


const render_view = (viewId, viewPort) => {
    var source = document.querySelector(viewId).innerHTML;
    var template = Handlebars.compile(source);
    document.querySelector(viewPort).innerHTML = template(appState.current_model);
}

async function displayCourses(type, data){
    switch(type) {
        case "all":
            appState.current_model = await fetchData(api+"/all");
          break;
        case "course_code":
            appState.current_model = await fetchData(api+"/by_course_code"+data);
          break;
        case "title":
            appState.current_model = await fetchData(api+"/by_title"+data);
          break;
        case "instructor":
            appState.current_model = await fetchData(api+"/by_instructor"+data);
          break;
        case "level":
            appState.current_model = await fetchData(api+"/by_level"+data);
          break;
          case "name_and_level":
            appState.current_model = await fetchData(api+"/combined_query"+data);
          break;
        default:
            appState.current_model = await fetchData(api+"/all");
    }
    render_view("#result", "#userView");
}

async function fetchData(link){
    const response = await fetch(link);
    const data = await response.json();
    console.log(data);
    return data;
}


