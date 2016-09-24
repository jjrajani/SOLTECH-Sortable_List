import $ from 'jquery';

$(document).ready(function () {
  console.log('ready')
  var list = [];

  //// Profile Generator
  $.ajax({
    url: 'https://demo1227708.mockable.io/people',
    dataType:'json'
  }).then( res => {
      let people = $('#people')
      res.sort(sortBy('age'));
      list = res;
      res.forEach(function (person) {
        person = make(person);
        people.append(person);
      })
  })


  //// Sort Functions
  var sortBy = function (property) {
    var sortOrder = 1;
    // console.log(property)
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
        // console.log('here',property)
    }
    property.charAt(0).toLowerCase();
    return function (a,b) {
      console.log(a[property])
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
    
  }

  $('.submit').on('click', function (event) {
    event.preventDefault();
    let form = $('form.sort');
    // console.log(form);
    let filter = getFilter(form[0][2].value.toLowerCase());
    let order = form[0][1].checked ? filter = "-" + filter : filter = filter;
    // console.log('order', order)
    // console.log(list)
    list = list.sort(sortBy(order));
    // console.log(list)
    reMakeList(list);
  })

  //Filter name fix
  var getFilter = function (name) {
    if (name === 'first name') {
      name = 'firstName'
    } else if (name === 'last name') {
      name = 'lastName'
    }
    return name;
  }

  // Append Functions
  var make = function (person) {
    if (person.age < 21 ) {
        let HTML = `<li class="person under-age">
                      <p>${person.firstName} ${person.lastName}</p>
                      <p>Age: ${person.age}</p>
                    </li>`
                    return HTML
      } else {
        let HTML = `<li class="person">
                      <p>${person.firstName} ${person.lastName}</p>
                      <p>Age: ${person.age}</p>
                    </li>`
                    return HTML
      }
  }
  var reMakeList = function (list) {
    let people = $('#people');
    people.empty();
    list.forEach(function (person) {
      people.append(make(person));
    })
  }

})